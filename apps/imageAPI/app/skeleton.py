import os

# ensure this directory exists and is writable
mpl_config_dir = os.path.join(os.getcwd(), '.mplconfig')
os.makedirs(mpl_config_dir, exist_ok=True)

os.environ['MPLCONFIGDIR'] = mpl_config_dir

import matplotlib
matplotlib.use('Agg')        # use non‐interactive backend

from skimage import color, morphology, filters, transform
import numpy as np
from itertools import combinations
from dataclasses import dataclass
import networkx as nx
import cv2, csv, math
from collections import deque

def annotate_nodes(skeleton_img):
    """
    Annotates a skeleton image by detecting endpoints and branch points
    
    Endpoints: White pixels with exactly one white neighbor.
    Branch points: White pixels with three or more white neighbors.
    
    Parameters:
        skeleton_img (numpy.ndarray): A binary skeleton image with pixel values 0 or 255.
    
    Returns:
        annotated_img (numpy.ndarray): A BGR image with endpoints (green), branch points (red),
                                       and sharp turns (blue) annotated.
        endpoint_coords (numpy.ndarray): Array of pixel coordinates (row, col) for endpoints.
        branch_coords (numpy.ndarray): Array of pixel coordinates (row, col) for branch points.
    """
    # Assumes skeleton_img is an 8-bit image with values 0 and 255
    binary = skeleton_img.copy()
    rows, cols = binary.shape

    # Create masks for endpoints, branch points, and sharp turns
    endpoints     = np.zeros(binary.shape, dtype=np.uint8)
    branch_points = np.zeros(binary.shape, dtype=np.uint8)

    # Iterate over each pixel (skipping border pixels)
    for i in range(1, rows - 1):
        for j in range(1, cols - 1):
            if binary[i, j] == 255:
                # Extract the 3x3 neighborhood
                window = binary[i - 1:i + 2, j - 1:j + 2]
                # Count white neighbors (excluding the center pixel)
                white_neighbors = cv2.countNonZero(window) - 1

                # Endpoint: Only one neighbor
                if white_neighbors == 1:
                    endpoints[i, j] = 255
                     # Branch point: Three or more neighbors
                elif white_neighbors >= 3:
                    branch_points[i, j] = 255


    # Convert the binary skeleton to a BGR color image for annotation.
    annotated_img = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)

    # Retrieve coordinates for endpoints, branch points, and sharp turns.
    endpoint_coords   = np.transpose(np.nonzero(endpoints))
    branch_coords     = np.transpose(np.nonzero(branch_points))


    # Annotate endpoints with green dots (BGR: (0, 255, 0))
    for coord in endpoint_coords:
        y, x = coord
        cv2.circle(annotated_img, (x, y), radius=3, color=(0, 255, 0), thickness=-1)

    return annotated_img, endpoint_coords, branch_coords

def nodes_to_csv(newNodes, csv_filename, building, floor, source_points, target_points, offset =0):
    """
    Transforms node coordinates (from newNodes) to world coordinates using a homography 
    transform and writes them to CSV.

    Parameters:
      newNodes (list[node]): List of node objects with attributes id, name, x, y.
      csv_filename (str): Name of the CSV file.
      building (str): Building identifier.
      floor (str): Floor identifier.
      source_points (np.ndarray): 2D array of source points used for estimating homography.
      target_points (np.ndarray): 2D array of corresponding target (world) coordinates.
    """


    # Create an (N, 2) array of coordinates from newNodes.
    # Note: The nodes are stored as (x, y) where x is typically the column and y is the row.
    node_coords = np.array([[node.x, node.y] for node in newNodes])
    
    # Transform to world coordinates.
    # (If needed, flip source_points to account for coordinate ordering)
    world_coords, _ = calculateHomography(np.flip(source_points, axis=0), target_points, node_coords)

    # Open the CSV file for writing/appending.
    mode = "a" if os.path.exists(csv_filename) else "w"
    with open(csv_filename, mode, newline='') as csvfile:
        writer = csv.writer(csvfile)
        # Write header if file is being created.
        if mode == "w":
            writer.writerow(["id", "building", "floor", "name", "x", "y", "type"])
        # Loop through each node and its transformed coordinate.
        id = offset
        for i, node in enumerate(newNodes):
            x, y = world_coords[i]
            writer.writerow([id, building, floor, "", x, y, "Hall"])
            id = 1 + id
            

    print(f"Node coordinates saved to {csv_filename}")



def edges_to_csv(edges, csv_filename, id_offset = 0):
    """
    Stores a list of edges into a CSV file.
    Each edge is written with the source node's ID, target node's ID, and weight.
    
    Args:
        edges (list): List of edge objects.
        csv_filename (str): The output CSV filename.
    """
    mode = "a" if os.path.exists(csv_filename) else "w"
    with open(csv_filename, mode, newline='') as csvfile:
        writer = csv.writer(csvfile)
        if mode == "w":
            writer.writerow(["source_id", "target_id", "weight"])
        for e in edges:
            writer.writerow([id_offset + e.source.id, id_offset + e.target.id, e.weight])
    print(f"Edge data saved to {csv_filename}")
    

def perp_dis(points, start, end):
    """
    Compute perpendicular distances from an array of points to the line defined by start and end.

    Args:
        points (np.ndarray): Array of shape (N, 2) containing points (x, y).
        start (np.ndarray): Starting point of the line (x, y).
        end (np.ndarray): Ending point of the line (x, y).

    Returns:
        np.ndarray: A 1D array of distances for each point.
    """
    # Convert start and end to float arrays for precision
    start = np.asarray(start, dtype=float)
    end = np.asarray(end, dtype=float)
    
    # Calculate the line vector from start to end
    line_vec = end - start
    norm_line = np.hypot(line_vec[0], line_vec[1])
    
    # Avoid division by zero if start and end are the same
    if norm_line == 0:
        return np.linalg.norm(points - start, axis=1)
    
    # Compute the difference vectors from the start point to each point in 'points'
    diff = points - start  # Shape: (N, 2)
    
    # Compute the cross product (in 2D, this is a scalar per point) for each point:
    # |(x - A_x)*(B_y - A_y) - (y - A_y)*(B_x - A_x)|
    cross_prod = np.abs(diff[:, 0] * line_vec[1] - diff[:, 1] * line_vec[0])
    
    # Compute distances using the vectorized formula
    distances = cross_prod / norm_line
    
    return distances

def rdp(points, start, end, epsilon):
    """
    Simplify a polyline using the Ramer-Douglas-Peucker algorithm.
    
    Args:
        points (np.ndarray): An array of points of shape (N, 2).
        epsilon (float): The distance tolerance. Points with a perpendicular distance
                         less than epsilon from the baseline are removed.
    
    Returns:
        np.ndarray: The simplified set of points.
    """
    # Find the point with the maximum perpendicular distance from the baseline (start to end)
    start, end = points[0], points[-1]
    distances =  perp_dis(points, start, end)
    
    # Find the index of the point with the maximum distance
    index = np.argmax(distances)
    max_distance = distances[index]
    
    # If the maximum distance is greater than epsilon, recursively simplify
    if max_distance > epsilon:
        # Recursive call on two segments: from start to index and index to end.
        first_segment = rdp(points[:index+1], points[0], points[index+1],  epsilon)
        second_segment = rdp(points[index:], points[index], points[-1], epsilon)
        
        # Combine the results, avoiding duplication of the pivot point
        return np.vstack((first_segment[:-1], second_segment))
    else:
        # If max distance is less than epsilon, discard intermediate points.
        return np.array([start, end])


def compressGraph(img):
    # path = np.array(img)
    return np.argwhere(img == 1)

def remove_neighboring(original_points, simplified_points, neighbor_threshold):
    """
    Remove points from original_points that are within neighbor_threshold
    distance of any point in simplified_points using a vectorized approach.
    
    Args:
        original_points (np.ndarray): Original array of points, shape (N, 2).
        simplified_points (np.ndarray): Simplified set of points, shape (M, 2).
        neighbor_threshold (float): Distance threshold for considering a point as neighbor.
        
    Returns:
        np.ndarray: Filtered array of original points with neighboring points removed.
    """
    # If no simplified points are provided, return the original list.
    if simplified_points.size == 0:
        return original_points
    
    # Compute the pairwise Euclidean distances between original points and simplified points
    # resulting shape: (N, M)
    diff = original_points[:, None, :] - simplified_points[None, :, :]
    distances = np.linalg.norm(diff, axis=2)
    
    # For each original point, find the minimum distance to any simplified point.
    min_distances = np.min(distances, axis=1)
    
    # Create a mask: keep only points that are not neighbors (min distance >= threshold)
    keep_mask = min_distances >= neighbor_threshold
    return original_points[keep_mask]


def findBestNodes(endpoints, points, ep, disTol):
    # Instead of growing a numpy array in a loop,
    # use a Python list to collect the results.
    nodes_list = []

    # Compute all unordered pairs of endpoint indices
    for i, j in combinations(range(endpoints.shape[0]), 2):
        start = endpoints[i]
        end = endpoints[j]
        # Call your rdp function on the current pair.
        # It is assumed that rdp returns a NumPy array of points.
        simplified_points = rdp(points, start, end, ep)
        nodes_list.append(simplified_points)
        points = remove_neighboring(points, simplified_points, disTol)
        if(points.shape[0] == 0):
            break    
    nodes_list.append(endpoints)
    # Combine all resulting nodes at once:
    if nodes_list:
        nodes_combined = np.vstack(nodes_list)
    else:
        nodes_combined = np.array([])


    # Deduplicate nodes using numpy.unique (assuming numeric types)
    # We assume nodes are 2D points, so we remove duplicate rows
    if nodes_combined.size > 0:
        nodes = np.unique(nodes_combined, axis=0)
    else:
        nodes = nodes_combined
        
    return nodes

def declutter(nodes, tolerance):
    """
    Removes nodes that are within a given tolerance distance of each other,
    keeping only one representative node from each clump.
    
    Parameters:
        nodes (list or array of tuples): Each tuple is (x, y) coordinate.
        tolerance (float): Maximum distance between nodes to consider them clumped.
        
    Returns:
        pruned_nodes (list): List of pruned node coordinates (x, y).
    """
    pruned_nodes = []
    for node in nodes:
        if not any(np.linalg.norm(np.array(node) - np.array(other)) < tolerance for other in pruned_nodes):
            pruned_nodes.append(node)
    return np.array(pruned_nodes)


def largest_skeleton(skeleton):
    """
    Given a binary skeleton image, this function keeps only the largest
    continuous skeleton (largest connected component).
    
    Parameters:
        skeleton (numpy.ndarray): A binary skeleton image where foreground pixels 
                                  have a value of 255 and background is 0.
    
    Returns:
        largest_component (numpy.ndarray): A binary image with only the largest
                                             connected component retained.
    """
    # Make sure the skeleton image is in 8-bit format: values 0 or 255.
    if skeleton.dtype != np.uint8:
        skeleton = (skeleton.astype(np.uint8)) * 255

    # Compute connected components with stats.
    # connectivity=8 to consider diagonal connections as well.
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(skeleton, connectivity=8)

    # No components found (other than the background).
    if num_labels <= 1:
        return skeleton.copy()

    # stats array: index 0 is the background.
    # Find the label with the largest area (ignore background label 0).
    # The area for each component is stored in stats[:, cv2.CC_STAT_AREA].
    # We ignore the background (stats[0, ...]).
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])

    # Create an output mask with the largest component.
    largest_component = np.zeros_like(skeleton)
    largest_component[labels == largest_label] = 255
    threshold_value = filters.threshold_otsu(largest_component)
    largest_component = largest_component > threshold_value 

    return largest_component



@dataclass
class node:
    id: int 
    name: str
    y: int
    x: int

@dataclass
class edge:
    source: node
    target: node
    weight: float
    
def storeNodes(coords):
    nodes = []
    i = 0
    for coord in coords:
        y, x = coord
        nodes.append(node(i, str(i), y, x))  # x = col, y = row
        i += 1
    return nodes

def skeleton_graph(skel):
    """
    Build a graph from skeleton
    
    Args:
        skel (np.ndarray): A binary skeleton image.
        
    Returns:
        nx.Graph: Graph
    """
    rows, cols = skel.shape
    G = nx.Graph()
    
    for i in range(rows):
        for j in range(cols):
            if skel[i, j]:
                G.add_node((i, j))
                # Connect with all 8-connected neighbors
                for di in [-1, 0, 1]:
                    for dj in [-1, 0, 1]:
                        if di == 0 and dj == 0:
                            continue
                        ni, nj = i + di, j + dj
                        if 0 <= ni < rows and 0 <= nj < cols and skel[ni, nj]:
                            G.add_edge((i, j), (ni, nj))
    return G



def find_edges(G, critical_nodes, tform):
    """
    multi-source BFS on graph to find edges

    Args:
        G (nx.Graph)
        critical_nodes (list[node]): attributes ['x' and 'y']

    Returns:
        List[edge]: List of edges
    """
    # Build a mapping from the critical node coordinate to its node object.
    seed_to_node = {(n.y, n.x): n for n in critical_nodes}

    # --- Multi-Source BFS ---
    label = {}   # maps each graph node (tuple) to the seed (tuple) that reached it first
    dist = {}    # distance (BFS-level) from the seed
    q = deque()
    # Initialize all critical nodes as seeds.
    for n in critical_nodes:
        coord = (n.y, n.x)
        label[coord] = coord
        dist[coord] = 0
        q.append(coord)

    # Standard multi-source BFS
    while q:
        u = q.popleft()
        for v in G[u]:
            if v not in label:
                label[v] = label[u]  # propagate the seed label from u
                dist[v] = dist[u] + 1
                q.append(v)

    # --- Extract edges between different Voronoi regions ---
    edge_dict = {}  # Will hold unique pairs of seeds mapped to the computed weight.
    # Iterate over all edges in G (each as (u, v))
    for u, v in G.edges():
        seed_u = label.get(u)
        seed_v = label.get(v)
        if seed_u is None or seed_v is None:
            continue  # Should not happen if G is fully reached.
        if seed_u != seed_v:
            # Create an unordered key for the pair of seeds
            key = tuple(sorted([seed_u, seed_v]))
            # Compute Euclidean distance between the two critical nodes.
            node_u = seed_to_node[seed_u]
            node_v = seed_to_node[seed_v]
            
            # convert to world coordinates
            lat1, lon1 = tform([node_u.x, node_u.y])[0]
            lat2, lon2 = tform([node_v.x, node_v.y])[0]
        
            
            weight = haversine_distance(lat1, lon1, lat2, lon2)
            # If the pair already exists, keep the minimum weight
            if key in edge_dict:
                edge_dict[key] = min(edge_dict[key], weight)
            else:
                edge_dict[key] = weight

    # --- Convert the dictionary of edges into a list of edge objects ---
    edges_list = [
        edge(source=seed_to_node[k[0]], target=seed_to_node[k[1]], weight=w)
        for k, w in edge_dict.items()
    ]
    return edges_list



def haversine_distance(lat1_deg, lon1_deg, lat2_deg, lon2_deg):
    """
    Distance between 2 world points

    Parameters
    ----------
    lon1_deg, lat1_deg : float
        Longitude and latitude in degrees.
    lon2_deg, lat2_deg : float
        Longitude and latitude in degrees.

    Returns
    -------
    float
        Distance in metres along the Earth's surface.
    """
    EARTH_RADIUS_M = 6_371_000  # mean Earth radius in metres
    
    lon1 = math.radians(lon1_deg)
    lat1 = math.radians(lat1_deg)
    lon2 = math.radians(lon2_deg)
    lat2 = math.radians(lat2_deg)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    sin_dlat = math.sin(dlat / 2.0)
    sin_dlon = math.sin(dlon / 2.0)

    a = sin_dlat * sin_dlat + math.cos(lat1) * math.cos(lat2) * sin_dlon * sin_dlon
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))

    return EARTH_RADIUS_M * c

def generate_nodes_edges(image_path, source_points, target_points):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    kernel = np.ones((5, 5), np.uint8)
    image = cv2.erode(image, kernel)

    if len(image.shape) == 3:
        image_gray = color.rgb2gray(image)
    else:
        image_gray = image

    # ------ Skeletonize image --------
    threshold_value = filters.threshold_otsu(image_gray)
    binary_image = image_gray > threshold_value  
    skeleton = morphology.skeletonize(binary_image)
    skeleton = largest_skeleton(skeleton)
    
    G = collapse_colinear(skeleton_graph(skeleton), 45)
    nodes = declutter(G.nodes, 10)
    newNodes = storeNodes(nodes)
    
    _, tform = calculateHomography(np.flip(source_points), target_points, nodes)
    edges = find_edges(G, newNodes, tform)

    print("Total nodes: ", nodes.shape)



    togetherImg = binary_image ^ skeleton
    nodeImage = (skeleton.astype(np.uint8)) * 255

    for point in nodes:
            y, x = point
            cv2.circle(nodeImage, (x, y), radius=3, color=(255, 255, 0), thickness=-1)
    
    return nodes, newNodes, edges, togetherImg, nodeImage


def calculateHomography(sourcePoints, targetPoints, allPoints):
    tform = transform.estimate_transform('projective', sourcePoints, targetPoints)
    return tform(allPoints), tform

def collapse_colinear(G, angle_tol_deg=5):
    """
    Iteratively remove every degree-2 pixel whose two incident edges form
    an interior angle smaller than `angle_tol_deg`.

    Parameters
    ----------
    G : nx.Graph            # pixel graph
    angle_tol_deg : float   # degrees, e.g. 5°

    Returns
    -------
    nx.Graph                # modified in place and also returned
    """
    angle_tol = np.deg2rad(angle_tol_deg)

    changed = True
    while changed:                          # keep collapsing until nothing changes
        changed = False
        for n in list(G.nodes):             # static snapshot of current nodes
            if n not in G:                  # might have been removed earlier
                continue
            if G.degree[n] != 2:
                continue

            u, v = list(G.neighbors(n))     # exactly two neighbours
            a = np.array(u) - np.array(n)   # n → u
            b = np.array(v) - np.array(n)   # n → v

            # interior angle at n  (0 when perfectly straight)
            cosang = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
            cosang = np.clip(cosang, -1.0, 1.0)          # numerical safety
            angle  = np.pi - np.arccos(cosang)

            if angle < angle_tol:           # almost colinear → merge
                w = (G.edges[n, u].get("weight", 1)
                     + G.edges[n, v].get("weight", 1))
                G.add_edge(u, v, weight=w)
                G.remove_node(n)
                changed = True              # we’ll need another sweep
    return G


def generate_new_map(file, source_points, target_points, building, floor, offset):
    image_path = file

    nodes, newNodes, edges, _, _ = generate_nodes_edges(image_path, source_points, target_points)
    # worldPoints, tform = calculateHomography(np.flip(source_points), target_points, nodes)
    nodes_to_csv(newNodes, "nodes.csv", building, floor, source_points, target_points, offset)
    edges_to_csv(edges, "edges.csv", offset)








import os

# ensure this directory exists and is writable
mpl_config_dir = os.path.join(os.getcwd(), '.mplconfig')
os.makedirs(mpl_config_dir, exist_ok=True)

os.environ['MPLCONFIGDIR'] = mpl_config_dir

import matplotlib
matplotlib.use('Agg')        # use non‐interactive backend

from skimage import color, morphology, filters, transform
import numpy as np
from itertools import combinations
from dataclasses import dataclass
import networkx as nx
import os, cv2, csv, math
from collections import deque

def annotate_nodes(skeleton_img):
    """
    Annotates a skeleton image by detecting endpoints and branch points
    
    Endpoints: White pixels with exactly one white neighbor.
    Branch points: White pixels with three or more white neighbors.
    
    Parameters:
        skeleton_img (numpy.ndarray): A binary skeleton image with pixel values 0 or 255.
    
    Returns:
        annotated_img (numpy.ndarray): A BGR image with endpoints (green), branch points (red),
                                       and sharp turns (blue) annotated.
        endpoint_coords (numpy.ndarray): Array of pixel coordinates (row, col) for endpoints.
        branch_coords (numpy.ndarray): Array of pixel coordinates (row, col) for branch points.
    """
    # Assumes skeleton_img is an 8-bit image with values 0 and 255
    binary = skeleton_img.copy()
    rows, cols = binary.shape

    # Create masks for endpoints, branch points, and sharp turns
    endpoints     = np.zeros(binary.shape, dtype=np.uint8)
    branch_points = np.zeros(binary.shape, dtype=np.uint8)

    # Iterate over each pixel (skipping border pixels)
    for i in range(1, rows - 1):
        for j in range(1, cols - 1):
            if binary[i, j] == 255:
                # Extract the 3x3 neighborhood
                window = binary[i - 1:i + 2, j - 1:j + 2]
                # Count white neighbors (excluding the center pixel)
                white_neighbors = cv2.countNonZero(window) - 1

                # Endpoint: Only one neighbor
                if white_neighbors == 1:
                    endpoints[i, j] = 255
                     # Branch point: Three or more neighbors
                elif white_neighbors >= 3:
                    branch_points[i, j] = 255


    # Convert the binary skeleton to a BGR color image for annotation.
    annotated_img = cv2.cvtColor(binary, cv2.COLOR_GRAY2BGR)

    # Retrieve coordinates for endpoints, branch points, and sharp turns.
    endpoint_coords   = np.transpose(np.nonzero(endpoints))
    branch_coords     = np.transpose(np.nonzero(branch_points))


    # Annotate endpoints with green dots (BGR: (0, 255, 0))
    for coord in endpoint_coords:
        y, x = coord
        cv2.circle(annotated_img, (x, y), radius=3, color=(0, 255, 0), thickness=-1)

    return annotated_img, endpoint_coords, branch_coords

def nodes_to_csv(newNodes, csv_filename, building, floor, source_points, target_points, offset =0):
    """
    Transforms node coordinates (from newNodes) to world coordinates using a homography 
    transform and writes them to CSV.

    Parameters:
      newNodes (list[node]): List of node objects with attributes id, name, x, y.
      csv_filename (str): Name of the CSV file.
      building (str): Building identifier.
      floor (str): Floor identifier.
      source_points (np.ndarray): 2D array of source points used for estimating homography.
      target_points (np.ndarray): 2D array of corresponding target (world) coordinates.
    """
    import numpy as np
    import os, csv

    # Create an (N, 2) array of coordinates from newNodes.
    # Note: The nodes are stored as (x, y) where x is typically the column and y is the row.
    node_coords = np.array([[node.x, node.y] for node in newNodes])
    
    # Transform to world coordinates.
    # (If needed, flip source_points to account for coordinate ordering)
    world_coords, _ = calculateHomography(np.flip(source_points, axis=0), target_points, node_coords)

    # Open the CSV file for writing/appending.
    mode = "a" if os.path.exists(csv_filename) else "w"
    with open(csv_filename, mode, newline='') as csvfile:
        writer = csv.writer(csvfile)
        # Write header if file is being created.
        if mode == "w":
            writer.writerow(["id", "building", "floor", "name", "x", "y", "type"])
        # Loop through each node and its transformed coordinate.
        id = offset
        for i, node in enumerate(newNodes):
            x, y = world_coords[i]
            writer.writerow([id, building, floor, "", x, y, "Hall"])
            id = 1 + id
            

    print(f"Node coordinates saved to {csv_filename}")



def edges_to_csv(edges, csv_filename, id_offset = 0):
    """
    Stores a list of edges into a CSV file.
    Each edge is written with the source node's ID, target node's ID, and weight.
    
    Args:
        edges (list): List of edge objects.
        csv_filename (str): The output CSV filename.
    """
    mode = "a" if os.path.exists(csv_filename) else "w"
    with open(csv_filename, mode, newline='') as csvfile:
        writer = csv.writer(csvfile)
        if mode == "w":
            writer.writerow(["source_id", "target_id", "weight"])
        for e in edges:
            writer.writerow([id_offset + e.source.id, id_offset + e.target.id, e.weight])
    print(f"Edge data saved to {csv_filename}")
    

def perp_dis(points, start, end):
    """
    Compute perpendicular distances from an array of points to the line defined by start and end.

    Args:
        points (np.ndarray): Array of shape (N, 2) containing points (x, y).
        start (np.ndarray): Starting point of the line (x, y).
        end (np.ndarray): Ending point of the line (x, y).

    Returns:
        np.ndarray: A 1D array of distances for each point.
    """
    # Convert start and end to float arrays for precision
    start = np.asarray(start, dtype=float)
    end = np.asarray(end, dtype=float)
    
    # Calculate the line vector from start to end
    line_vec = end - start
    norm_line = np.hypot(line_vec[0], line_vec[1])
    
    # Avoid division by zero if start and end are the same
    if norm_line == 0:
        return np.linalg.norm(points - start, axis=1)
    
    # Compute the difference vectors from the start point to each point in 'points'
    diff = points - start  # Shape: (N, 2)
    
    # Compute the cross product (in 2D, this is a scalar per point) for each point:
    # |(x - A_x)*(B_y - A_y) - (y - A_y)*(B_x - A_x)|
    cross_prod = np.abs(diff[:, 0] * line_vec[1] - diff[:, 1] * line_vec[0])
    
    # Compute distances using the vectorized formula
    distances = cross_prod / norm_line
    
    return distances

def rdp(points, start, end, epsilon):
    """
    Simplify a polyline using the Ramer-Douglas-Peucker algorithm.
    
    Args:
        points (np.ndarray): An array of points of shape (N, 2).
        epsilon (float): The distance tolerance. Points with a perpendicular distance
                         less than epsilon from the baseline are removed.
    
    Returns:
        np.ndarray: The simplified set of points.
    """
    # Find the point with the maximum perpendicular distance from the baseline (start to end)
    start, end = points[0], points[-1]
    distances =  perp_dis(points, start, end)
    
    # Find the index of the point with the maximum distance
    index = np.argmax(distances)
    max_distance = distances[index]
    
    # If the maximum distance is greater than epsilon, recursively simplify
    if max_distance > epsilon:
        # Recursive call on two segments: from start to index and index to end.
        first_segment = rdp(points[:index+1], points[0], points[index+1],  epsilon)
        second_segment = rdp(points[index:], points[index], points[-1], epsilon)
        
        # Combine the results, avoiding duplication of the pivot point
        return np.vstack((first_segment[:-1], second_segment))
    else:
        # If max distance is less than epsilon, discard intermediate points.
        return np.array([start, end])


def compressGraph(img):
    # path = np.array(img)
    return np.argwhere(img == 1)

def remove_neighboring(original_points, simplified_points, neighbor_threshold):
    """
    Remove points from original_points that are within neighbor_threshold
    distance of any point in simplified_points using a vectorized approach.
    
    Args:
        original_points (np.ndarray): Original array of points, shape (N, 2).
        simplified_points (np.ndarray): Simplified set of points, shape (M, 2).
        neighbor_threshold (float): Distance threshold for considering a point as neighbor.
        
    Returns:
        np.ndarray: Filtered array of original points with neighboring points removed.
    """
    # If no simplified points are provided, return the original list.
    if simplified_points.size == 0:
        return original_points
    
    # Compute the pairwise Euclidean distances between original points and simplified points
    # resulting shape: (N, M)
    diff = original_points[:, None, :] - simplified_points[None, :, :]
    distances = np.linalg.norm(diff, axis=2)
    
    # For each original point, find the minimum distance to any simplified point.
    min_distances = np.min(distances, axis=1)
    
    # Create a mask: keep only points that are not neighbors (min distance >= threshold)
    keep_mask = min_distances >= neighbor_threshold
    return original_points[keep_mask]


def findBestNodes(endpoints, points, ep, disTol):
    # Instead of growing a numpy array in a loop,
    # use a Python list to collect the results.
    nodes_list = []

    # Compute all unordered pairs of endpoint indices
    for i, j in combinations(range(endpoints.shape[0]), 2):
        start = endpoints[i]
        end = endpoints[j]
        # Call your rdp function on the current pair.
        # It is assumed that rdp returns a NumPy array of points.
        simplified_points = rdp(points, start, end, ep)
        nodes_list.append(simplified_points)
        points = remove_neighboring(points, simplified_points, disTol)
        if(points.shape[0] == 0):
            break    
    nodes_list.append(endpoints)
    # Combine all resulting nodes at once:
    if nodes_list:
        nodes_combined = np.vstack(nodes_list)
    else:
        nodes_combined = np.array([])


    # Deduplicate nodes using numpy.unique (assuming numeric types)
    # We assume nodes are 2D points, so we remove duplicate rows
    if nodes_combined.size > 0:
        nodes = np.unique(nodes_combined, axis=0)
    else:
        nodes = nodes_combined
        
    return nodes

def declutter(nodes, tolerance):
    """
    Removes nodes that are within a given tolerance distance of each other,
    keeping only one representative node from each clump.
    
    Parameters:
        nodes (list or array of tuples): Each tuple is (x, y) coordinate.
        tolerance (float): Maximum distance between nodes to consider them clumped.
        
    Returns:
        pruned_nodes (list): List of pruned node coordinates (x, y).
    """
    pruned_nodes = []
    for node in nodes:
        if not any(np.linalg.norm(np.array(node) - np.array(other)) < tolerance for other in pruned_nodes):
            pruned_nodes.append(node)
    return np.array(pruned_nodes)


def largest_skeleton(skeleton):
    """
    Given a binary skeleton image, this function keeps only the largest
    continuous skeleton (largest connected component).
    
    Parameters:
        skeleton (numpy.ndarray): A binary skeleton image where foreground pixels 
                                  have a value of 255 and background is 0.
    
    Returns:
        largest_component (numpy.ndarray): A binary image with only the largest
                                             connected component retained.
    """
    # Make sure the skeleton image is in 8-bit format: values 0 or 255.
    if skeleton.dtype != np.uint8:
        skeleton = (skeleton.astype(np.uint8)) * 255

    # Compute connected components with stats.
    # connectivity=8 to consider diagonal connections as well.
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(skeleton, connectivity=8)

    # No components found (other than the background).
    if num_labels <= 1:
        return skeleton.copy()

    # stats array: index 0 is the background.
    # Find the label with the largest area (ignore background label 0).
    # The area for each component is stored in stats[:, cv2.CC_STAT_AREA].
    # We ignore the background (stats[0, ...]).
    largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])

    # Create an output mask with the largest component.
    largest_component = np.zeros_like(skeleton)
    largest_component[labels == largest_label] = 255
    threshold_value = filters.threshold_otsu(largest_component)
    largest_component = largest_component > threshold_value 

    return largest_component



@dataclass
class node:
    id: int 
    name: str
    y: int
    x: int

@dataclass
class edge:
    source: node
    target: node
    weight: float
    
def storeNodes(coords):
    nodes = []
    i = 0
    for coord in coords:
        y, x = coord
        nodes.append(node(i, str(i), y, x))  # x = col, y = row
        i += 1
    return nodes

def skeleton_graph(skel):
    """
    Build a graph from skeleton
    
    Args:
        skel (np.ndarray): A binary skeleton image.
        
    Returns:
        nx.Graph: Graph
    """
    rows, cols = skel.shape
    G = nx.Graph()
    
    for i in range(rows):
        for j in range(cols):
            if skel[i, j]:
                G.add_node((i, j))
                # Connect with all 8-connected neighbors
                for di in [-1, 0, 1]:
                    for dj in [-1, 0, 1]:
                        if di == 0 and dj == 0:
                            continue
                        ni, nj = i + di, j + dj
                        if 0 <= ni < rows and 0 <= nj < cols and skel[ni, nj]:
                            G.add_edge((i, j), (ni, nj))
    return G



def find_edges(G, critical_nodes, tform):
    """
    multi-source BFS on graph to find edges

    Args:
        G (nx.Graph)
        critical_nodes (list[node]): attributes ['x' and 'y']

    Returns:
        List[edge]: List of edges
    """
    # Build a mapping from the critical node coordinate to its node object.
    seed_to_node = {(n.y, n.x): n for n in critical_nodes}

    # --- Multi-Source BFS ---
    label = {}   # maps each graph node (tuple) to the seed (tuple) that reached it first
    dist = {}    # distance (BFS-level) from the seed
    q = deque()
    # Initialize all critical nodes as seeds.
    for n in critical_nodes:
        coord = (n.y, n.x)
        label[coord] = coord
        dist[coord] = 0
        q.append(coord)

    # Standard multi-source BFS
    while q:
        u = q.popleft()
        for v in G[u]:
            if v not in label:
                label[v] = label[u]  # propagate the seed label from u
                dist[v] = dist[u] + 1
                q.append(v)

    # --- Extract edges between different Voronoi regions ---
    edge_dict = {}  # Will hold unique pairs of seeds mapped to the computed weight.
    # Iterate over all edges in G (each as (u, v))
    for u, v in G.edges():
        seed_u = label.get(u)
        seed_v = label.get(v)
        if seed_u is None or seed_v is None:
            continue  # Should not happen if G is fully reached.
        if seed_u != seed_v:
            # Create an unordered key for the pair of seeds
            key = tuple(sorted([seed_u, seed_v]))
            # Compute Euclidean distance between the two critical nodes.
            node_u = seed_to_node[seed_u]
            node_v = seed_to_node[seed_v]
            
            # convert to world coordinates
            lat1, lon1 = tform([node_u.x, node_u.y])[0]
            lat2, lon2 = tform([node_v.x, node_v.y])[0]
        
            
            weight = haversine_distance(lat1, lon1, lat2, lon2)
            # If the pair already exists, keep the minimum weight
            if key in edge_dict:
                edge_dict[key] = min(edge_dict[key], weight)
            else:
                edge_dict[key] = weight

    # --- Convert the dictionary of edges into a list of edge objects ---
    edges_list = [
        edge(source=seed_to_node[k[0]], target=seed_to_node[k[1]], weight=w)
        for k, w in edge_dict.items()
    ]
    return edges_list



def haversine_distance(lat1_deg, lon1_deg, lat2_deg, lon2_deg):
    """
    Distance between 2 world points

    Parameters
    ----------
    lon1_deg, lat1_deg : float
        Longitude and latitude in degrees.
    lon2_deg, lat2_deg : float
        Longitude and latitude in degrees.

    Returns
    -------
    float
        Distance in metres along the Earth's surface.
    """
    EARTH_RADIUS_M = 6_371_000  # mean Earth radius in metres
    
    lon1 = math.radians(lon1_deg)
    lat1 = math.radians(lat1_deg)
    lon2 = math.radians(lon2_deg)
    lat2 = math.radians(lat2_deg)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    sin_dlat = math.sin(dlat / 2.0)
    sin_dlon = math.sin(dlon / 2.0)

    a = sin_dlat * sin_dlat + math.cos(lat1) * math.cos(lat2) * sin_dlon * sin_dlon
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))

    return EARTH_RADIUS_M * c

def generate_nodes_edges(image_path, source_points, target_points):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    kernel = np.ones((5, 5), np.uint8)
    image = cv2.erode(image, kernel)

    if len(image.shape) == 3:
        image_gray = color.rgb2gray(image)
    else:
        image_gray = image

    # ------ Skeletonize image --------
    threshold_value = filters.threshold_otsu(image_gray)
    binary_image = image_gray > threshold_value  
    skeleton = morphology.skeletonize(binary_image)
    skeleton = largest_skeleton(skeleton)
    
    G = collapse_colinear(skeleton_graph(skeleton), 45)
    nodes = declutter(G.nodes, 10)
    newNodes = storeNodes(nodes)
    
    _, tform = calculateHomography(np.flip(source_points), target_points, nodes)
    edges = find_edges(G, newNodes, tform)

    print("Total nodes: ", nodes.shape)



    togetherImg = binary_image ^ skeleton
    nodeImage = (skeleton.astype(np.uint8)) * 255

    for point in nodes:
            y, x = point
            cv2.circle(nodeImage, (x, y), radius=3, color=(255, 255, 0), thickness=-1)
    
    return nodes, newNodes, edges, togetherImg, nodeImage


def calculateHomography(sourcePoints, targetPoints, allPoints):
    tform = transform.estimate_transform('projective', sourcePoints, targetPoints)
    return tform(allPoints), tform

def collapse_colinear(G, angle_tol_deg=5):
    """
    Iteratively remove every degree-2 pixel whose two incident edges form
    an interior angle smaller than `angle_tol_deg`.

    Parameters
    ----------
    G : nx.Graph            # pixel graph
    angle_tol_deg : float   # degrees, e.g. 5°

    Returns
    -------
    nx.Graph                # modified in place and also returned
    """
    angle_tol = np.deg2rad(angle_tol_deg)

    changed = True
    while changed:                          # keep collapsing until nothing changes
        changed = False
        for n in list(G.nodes):             # static snapshot of current nodes
            if n not in G:                  # might have been removed earlier
                continue
            if G.degree[n] != 2:
                continue

            u, v = list(G.neighbors(n))     # exactly two neighbours
            a = np.array(u) - np.array(n)   # n → u
            b = np.array(v) - np.array(n)   # n → v

            # interior angle at n  (0 when perfectly straight)
            cosang = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
            cosang = np.clip(cosang, -1.0, 1.0)          # numerical safety
            angle  = np.pi - np.arccos(cosang)

            if angle < angle_tol:           # almost colinear → merge
                w = (G.edges[n, u].get("weight", 1)
                     + G.edges[n, v].get("weight", 1))
                G.add_edge(u, v, weight=w)
                G.remove_node(n)
                changed = True              # we’ll need another sweep
    return G


def generate_new_map(file, source_points, target_points, building, floor, offset):
    image_path = file

    nodes, newNodes, edges, _, _ = generate_nodes_edges(image_path, source_points, target_points)
    # worldPoints, tform = calculateHomography(np.flip(source_points), target_points, nodes)
    nodes_to_csv(newNodes, "nodes.csv", building, floor, source_points, target_points, offset)
    edges_to_csv(edges, "edges.csv", offset)








from skimage import transform
import numpy as np
import cv2


def rotate_image_and_save(image_path, angle_deg, points, output_path):
    """
    Rotates an image around its center by a specified angle, making empty areas transparent,
    and transforms a given set of pixel coordinates accordingly.

    Parameters:
        image_path (str): Path to the input image (should be PNG with alpha or will be converted).
        angle_deg (float): Angle to rotate (in degrees, counter-clockwise).
        points (np.ndarray): Nx2 array of (x, y) pixel coordinates to be rotated.
        output_path (str): Path to save the rotated image (PNG).

    Returns:
        np.ndarray: Transformed pixel coordinates (Nx2).
    """
    # Load image with alpha channel
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        raise FileNotFoundError(f"Image not found: {image_path}")
    
    # Add alpha channel if missing
    if img.shape[2] == 3:
        b, g, r = cv2.split(img)
        alpha = np.ones(b.shape, dtype=b.dtype) * 255
        img = cv2.merge([b, g, r, alpha])
    
    # Get image dimensions and center
    (h, w) = img.shape[:2]
    center = (w / 2, h / 2)

    # Compute rotation matrix
    M = cv2.getRotationMatrix2D(center, angle_deg, 1.0)

    # Compute new dimensions to fit entire rotated image
    cos = np.abs(M[0, 0])
    sin = np.abs(M[0, 1])
    new_w = int(h * sin + w * cos)
    new_h = int(h * cos + w * sin)

    # Adjust matrix for translation due to canvas size change
    M[0, 2] += (new_w / 2) - center[0]
    M[1, 2] += (new_h / 2) - center[1]

    # Rotate image with transparent background
    rotated = cv2.warpAffine(
        img,
        M,
        (new_w, new_h),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0, 0)
    )

    # Convert points to homogeneous coordinates and apply transformation
    ones = np.ones((points.shape[0], 1))
    points_homogeneous = np.hstack([points, ones])
    transformed_points = (M @ points_homogeneous.T).T  # shape Nx2

    # Save the rotated image
    if output_path != "":
        cv2.imwrite(output_path, rotated)
        print(f"Saved transparent rotated image to: {output_path}")

    return transformed_points, rotated
    
def rotate_world(coords, theta_deg):
    """
    Rotate a set of world coordinates (longitude, latitude) by theta degrees 
    around the center point.

    Args:
        coords (np.ndarray): Nx2 array of (longitude, latitude) points.
        theta_deg (float): Rotation angle in degrees (counter-clockwise).

    Returns:
        np.ndarray: Rotated coordinates (Nx2).
    """
    # Convert to radians
    theta = np.radians(theta_deg)
    
    # Compute the center point (mean of all coords)
    center = np.mean(coords, axis=0)
    
    # Translate points to center at origin
    translated = coords - center
    
    # Rotation matrix
    R = np.array([
        [np.cos(theta), -np.sin(theta)],
        [np.sin(theta),  np.cos(theta)]
    ])
    
    # Apply rotation
    rotated = translated @ R.T
    
    # Translate back
    rotated_coords = rotated + center
    
    return rotated_coords



def calculateHomography(sourcePoints, targetPoints, allPoints):
    tform = transform.estimate_transform('projective', sourcePoints, targetPoints)
    return tform(allPoints), tform


# imgSizeChest = np.array([[1812, 1439],
#                          [1812, 0],
#                          [0, 0],
#                          [0, 1439]])

# topright chestnut: 
# bottom right chestnut: 
# bottom left chestnut: 
# top left chestnut: 
source_points_pat22_3 = np.array([[2000, 187],
                         [1544, 1036],
                         [209, 1162],
                         [209, 187]])


target_points_pat22_3 =  np.array([[42.093062543998506, -71.2668158582853],
                         [42.09274408688253, -71.26662810365559],
                         [42.092246494442065, -71.26698215524748],
                         [42.092483348931324, -71.26740594428013]])




# BL
# TL
# TR
# BR

source_points_pat20 = np.array([[0, 1012],
                         [57, 78],
                         [474, 80],
                         [1029, 1009]])


target_points_pat20 =  np.array([[42.092498, -71.266337],
                         [42.093107, -71.266557],
                         [42.093202, -71.266231],
                         [42.092740, -71.265533]])


pat20 = [source_points_pat20, target_points_pat20]


source_points_pat22_4 = np.array([[2097, 274],
                         [1584, 1241],
                         [70, 1378],
                         [70, 270]])


target_points_pat22_4 =  np.array([[42.093062543998506, -71.2668158582853],
                         [42.09274408688253, -71.26662810365559],
                         [42.092246494442065, -71.26698215524748],
                         [42.092483348931324, -71.26740594428013]])


# source_points_chest = np.array([[9888, 11823], #RB
#                          [9747, 5783], #RT
#                          [1732, 5981], #LT
#                          [1880, 12011]]) #LB

# source_points_chest = np.array([[450, 2881], # BL
#                                 [416, 1436], # TL
#                                 [2339, 1389], # TR
#                                 [2370, 2837]]) #BR




# target_points_chest = np.array([[42.325702, -71.150086], #BL
#                                 [42.326170, -71.150140],
#                                 [42.326223, -71.149317],
#                                 [42.325756, -71.149264]])



# chestnut = [source_points_chest, target_points_chest]

source_points_faulkner1 = np.array([ 
                         [2043, 462], # TR
                         [602, 482], # TL
                         [134, 1298], #BL
                         [2374, 1299], # BR
                         ]) 

target_points_faulkner1 = np.array([
                                    [42.300905, -71.128506],
                                    [42.301782, -71.127798],
                                    [42.302379, -71.128184],
                                    [42.301098, -71.129380],
                                    ])


faulkner1 = [source_points_faulkner1, target_points_faulkner1]

source, target = faulkner1


# image_path = r"cs3733-d25 Revised Floor Plans v2\\PATRIOT PL\\22-FLOOR4-LABELED-1.png"
image_path = r"Faulkner1.png"

img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
if img is None:
    raise FileNotFoundError(f"Image not found: {image_path}")
    
img_size = np.array([[img.shape[1], 0],
                            [img.shape[1], img.shape[0]],
                            [0, img.shape[0]],
                            [0, 0]])
print(img.shape)

worldCoords, tform = calculateHomography(source, target, img_size)
rotated_pixels, rotated_img = rotate_image_and_save(image_path, -123, source, "faulkner1_rotated.png")


rotated_img_size = np.array([[rotated_img.shape[1], 0],
                            [rotated_img.shape[1], rotated_img.shape[0]],
                            [0, rotated_img.shape[0]],
                            [0, 0]])

adjusted_world, _ = calculateHomography(rotated_pixels, target, rotated_img_size)


print(np.max(adjusted_world[:, 0]), ",", np.min(adjusted_world[:, 0]), ",", np.max(adjusted_world[:, 1]), ",", np.min(adjusted_world[:, 1]))







from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
import tempfile, os, io, zipfile, json
from .skeleton import generate_new_map
# from mangum import Mangum

app = FastAPI()

# enable CORS for your dev‐direct fetch tests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# # Lambda entry‑point ───────────────────────────────────────────
# handler = Mangum(
#     app,
#     binary_media_types=["application/zip"],   # let API Gateway pass ZIPs through
#     lifespan="auto",                          # run startup/shutdown hooks
# )

@app.get("/health")
async def health():
    return JSONResponse({"ok": True})

@app.post("/generate-new-map")
async def generate_new_map_endpoint(
        file: UploadFile = File(...),
        sourcePoints: str  = Form(...),   # JSON string "[[x1,y1],…]"
        targetPoints: str  = Form(...),   # JSON string "[[u1,v1],…]"
        building:     str  = Form(...),
        floor:        int  = Form(...),
        offset:       int  = Form(...),
):
    # parse the JSON arrays
    try:
        source_pts = json.loads(sourcePoints)
        target_pts = json.loads(targetPoints)
    except json.JSONDecodeError:
        raise HTTPException(400, "sourcePoints / targetPoints must be valid JSON")

    # create a temp working directory
    with tempfile.TemporaryDirectory() as tmpdir:
        # 1) save the uploaded image
        img_path = os.path.join(tmpdir, file.filename)
        with open(img_path, "wb") as f:
            f.write(await file.read())

        # 2) chdir into tmpdir if your generate_new_map writes CSVs to cwd
        cwd = os.getcwd()
        os.chdir(tmpdir)
        try:
            # call your function, which will create:
            #   nodes_<name>.csv  and  edges_<name>.csv
            generate_new_map(img_path, source_pts, target_pts, building, floor, offset)
            print("python - Successfully generated nodes and edges")
        finally:
            os.chdir(cwd)

        # 3) locate the two CSVs
        nodes_csv = os.path.join(tmpdir, f"nodes.csv")
        edges_csv = os.path.join(tmpdir, f"edges.csv")
        for p in (nodes_csv, edges_csv):
            if not os.path.exists(p):
                raise HTTPException(500, f"Expected output file missing: {os.path.basename(p)}")
        print("python - files found")

        # 4) bundle into a ZIP in memory
        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
            z.write(nodes_csv, os.path.basename(nodes_csv))
            z.write(edges_csv, os.path.basename(edges_csv))
        buf.seek(0)

        # 5) stream back to client
        headers = {
            "Content-Disposition": f"attachment; filename=graph.zip"
        }
        print("python - zipped file")

        return StreamingResponse(buf, media_type="application/zip", headers=headers)
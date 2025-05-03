import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import client from '../../bin/prisma-client';

const router = express.Router();

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Configure Multer
const storage = multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadPath),
    filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// POST /upload
router.post('/', upload.single('image_upload'), async (req, res) => {
    const {
        name,
        employee_id,
        priority,
        location,
        department,
        status,
        request_type,
        additional_comments,
    } = req.body;
    const imagePath = req.file?.filename ?? null;

    try {
        const request = await client.service_request.create({
            data: {
                name,
                employee_id,
                priority,
                location,
                department,
                status,
                request_type,
                additional_comments,
                image_upload: imagePath,
            },
        });

        res.json({ success: true, request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create service request' });
    }
});

export default router;

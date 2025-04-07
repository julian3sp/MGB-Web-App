import express, { Router, Request, Response } from 'express';
import PrismaClient from '../bin/prisma-client.ts';
const router: Router = express.Router();

router.get('/', async function (req: Request, res: Response) {
    // Fetch the latest score from database
    try {
        const result = await PrismaClient.service_request.findMany();
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error('error fetching language requests:', error);
    }
});

export default router;

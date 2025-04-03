import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';

import PrismaClient from '../bin/prisma-client';
const router: Router = express.Router();

// Whenever a get request is made, return all employees
router.get('/', async function (req: Request, res: Response) {
    // Fetch the latest score from database
    try {
        const assignedEmployees = await PrismaClient.language_request.findMany({
            where: {
                employee_id: {
                    not: null,
                },
            },
        });
        console.log(assignedEmployees);
        res.json(assignedEmployees);
    } catch (error) {
        console.error('error fetching employees:', error);
    }
});

export default router;

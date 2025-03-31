import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();

router.post('/', async function (req: Request, res: Response) {
    const scoreAttempt: Prisma.employeeCreateInput = req.body;
    // Attempt to save the score
    try {
        // Attempt to create in the database
        await PrismaClient.employee.create({ data: scoreAttempt });
        console.info('Successfully created employee'); // Log that it was successful
    } catch (error) {
        // Log any failures
        console.error(`Unable to save score attempt ${scoreAttempt}: ${error}`);
        res.sendStatus(400); // Send error
        return; // Don't try to send duplicate statuses
    }

    res.sendStatus(200); // Otherwise say it's fine
});

// Whenever a get request is made, return all employees
router.get('api/employee', async function (req: Request, res: Response) {
    // Fetch the latest score from database
    try {
        const result = await PrismaClient.employee.findMany();
        console.table(result);
        res.json(result);
    } catch (error) {
        console.error('error fetching employees:', error);
    }
});

export default router;

import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';
import PrismaClient from '../bin/prisma-client';
import { insertEmployee } from 'database';
import { publicProcedure } from '../server/trpc';

const router: Router = express.Router();

// Whenever a get request is made, return all employees
router.get('/', async function (req: Request, res: Response) {
    // Fetch the latest score from database
    try {
        const result = await PrismaClient.employee.findMany();
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error('error fetching employees:', error);
    }
});

router.post('/', async function (req: Request, res: Response) {
    const id = req.body.id;
    const name = req.body.name;

    // Validate inputs
    if (!id || !name) {
        res.status(400).json({ error: 'ID and name are required' });
        return;
    }

    try {
        // Assuming insertEmployee is an async function
        const newEmployee = await insertEmployee(id, name, PrismaClient);

        // Respond with success
        res.status(201).json({ message: 'Employee created', employee: newEmployee });
        return;
    } catch (error) {
        console.error('Error creating employee:', error);

        // Send a failure response if an error occurs
        res.status(500).json({ error: 'Failed to create employee' });
        return;
    }
});

export default router;

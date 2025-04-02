import express, { Router, Request, Response } from 'express';
import { Prisma } from 'database';
import PrismaClient from '../bin/prisma-client';
import { insertEmployee } from '../bin/prisma-client';
import { deleteEmployees } from '../bin/prisma-client';

const router: Router = express.Router();

// Whenever a get request is made, return all employees
router.get('/', async function (req: Request, res: Response) {
    // Fetch the latest score from database
    try {
        await insertEmployee('000000000', 'Julian Espinal');
        await insertEmployee('111111111', 'Brendon Peters');
        await insertEmployee('222222222', 'Evan Demas');
        await insertEmployee('333333333', 'Bryan Wheeler');
        await insertEmployee('444444444', 'Klaidi Varfi');
        const result = await PrismaClient.employee.findMany();
        console.log(result);
        res.json(result);
        await deleteEmployees(['000000000', '111111111', '222222222', '333333333', '444444444']);
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
        const newEmployee = await insertEmployee(id, name);

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

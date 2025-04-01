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
        await insertEmployee('000000000', 'Julian Espinal')
        await insertEmployee('111111111', 'Brendon Peters')
        await insertEmployee('222222222', 'Evan Demas')
        await insertEmployee('333333333', 'Bryan Wheeler')
        await insertEmployee('444444444', 'Klaidi Varfi')
        const result = await PrismaClient.employee.findMany();
        console.log(result);
        res.json(result);
        await deleteEmployees(['000000000', '111111111', '222222222', '333333333', '444444444'])
    } catch (error) {
        console.error('error fetching employees:', error);
    }
});

export default router;

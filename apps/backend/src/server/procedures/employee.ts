import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const getEmployee = publicProcedure.query(async () => {
    return client.employee.findMany();
});

export const makeEmployee = publicProcedure
    .input(
        z.object({
            id: z.string(),
            employee_name: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const employee = await client.employee.create({
            data: input,
        });
        return employee;
    });

export const getEmployeeName = publicProcedure.query(async () => {
    try {
        console.log('Fetching employees...');
        const employeeNames = await client.employee.findMany({
            select: {
                id: true,
                employee_name: true,
            },
        });
        console.log('Fetched employees:', employeeNames);
        return employeeNames;
    } catch (error) {
        console.error('Error in getEmployeeName:', error);
        throw new Error('Failed to fetch employees');
    }
});

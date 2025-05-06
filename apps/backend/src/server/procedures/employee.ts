import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const getEmployees = publicProcedure.query(async () => {
    return client.employee.findMany({
        select: { id: true, employee_name: true },
    });
});

export const makeManyEmployees = publicProcedure
    .input(z.array(z.object({ id: z.string(), employee_name: z.string() })))
    .mutation(async ({ input }) => {
        return client.employee.createMany({ data: input });
    });

export const deleteEmployees = publicProcedure.mutation(async () => {
    await client.employee.deleteMany();
});
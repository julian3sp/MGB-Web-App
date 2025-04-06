import client from "../../bin/prisma-client";
import { publicProcedure } from "../trpc";
import {z} from 'zod'



export const getEmployee = publicProcedure.query(async () => {
    return client.employee.findMany();
})

export const makeEmployee = publicProcedure.input(z.object({
    id: z.string(),
    employee_name: z.string(),
})).mutation( async (opts) =>{
    const {input} = opts;

    const employee = await client.employee.create(input);
    return employee;
})
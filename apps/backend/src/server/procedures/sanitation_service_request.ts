import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';


export const getSanitationRequests = trpc.procedure.query(async () => {
    console.log('getSanitationRequests called');
    const sanitationRequests = await client.sanitation_service_request.findMany();
    console.log('getSanitationRequests returned');
    return sanitationRequests;
});

export const makeSanitationRequest = publicProcedure
    .input(
        z.object({
            name: z.string(),
            priority: z.string(),
            location: z.string(),
            department: z.string(),
            status: z.string(),
            employeeID: z.string(),
            cleaningType: z.string(),
            email: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const sanitationRequest = await client.sanitation_service_request.create({
            data: input,
        });

        return sanitationRequest;
    });
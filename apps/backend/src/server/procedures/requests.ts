import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const getRequests = trpc.procedure.query(async () => {
    console.log('getRequests called');
    const requests = await client.service_request.findMany();
    console.log('getRequests returned');
    return requests;
});

export const makeRequest = publicProcedure
    .input(
        z.object({
            room_num: z.number(),
            language: z.string(),
            request_type: z.string(),
            employee_id: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const request = await client.service_request.create({
            data: input,
        });

        return request;
    });

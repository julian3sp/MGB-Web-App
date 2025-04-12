import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';


export const makeSanitationRequest = publicProcedure
    .input(
        z.object({
            name: z.string(),
            priority: z.string(),
            location: z.string(),
            department: z.string(),
            status: z.string(),
            general_disinfection: z.boolean(),
            special_cleaning: z.boolean(),
            ppe: z.boolean(),
            janitorial: z.boolean(),
        })
    )
    .mutation(async ({ input }) => {
        const request = await client.service_request.create({
            data: input,
        });

        return request;
    });
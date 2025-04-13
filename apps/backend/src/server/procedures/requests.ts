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
            name: z.string(),
            priority: z.string(),
            department: z.string(),
            location: z.string(),
            status: z.string(),
            request_type: z.string(),
            additional_comments: z.optional(z.string()),
            sanitation: z.optional(z.object(
                { cleaningType: z.string(), }
            )),
            language: z.optional(z.object(
                { language: z.string() }
            )),
            audioVisual: z.optional(z.object(
                { accommodations: z.string() }
            )),
        })
    )
    .mutation(async ({ input }) => {
        const request = await client.service_request.create({
            data: {
                ...input,
                sanitation: {
                    create: input.sanitation
                },
                language: {
                    create: input.language
                },
                audioVisual: {
                    create: input.audioVisual
                },
            },
        });

        return request;
    });

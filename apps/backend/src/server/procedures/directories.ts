import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const getDirectories = publicProcedure.query(async () => {
    return client.directory.findMany();
});

export const makeDirectories = publicProcedure
    .input(
        z.object({
            name: z.string(),
            location: z.string(),
            telephone: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const directory = await client.directory.create({
            data: input,
        });
        return directory;
    });

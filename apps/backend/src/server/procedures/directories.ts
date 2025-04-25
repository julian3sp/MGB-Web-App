import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';
import { sleep } from 'react-query/types/core/utils';

export const getDirectories = publicProcedure.query(async () => {
    return client.directory.findMany();
});

export const getUniqueDirectories = publicProcedure
    .input(
        z.object({
            id: z.number(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;

        const directory = await client.directory.findUnique({
            where: {
                id: input.id,
            },
        });
        return directory;
    });

export const makeDirectories = publicProcedure
    .input(
        z.object({
            name: z.string(),
            services: z.string(),
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

export const deleteAllDirectories = publicProcedure.mutation(async () => {
    await client.directory.deleteMany();
    await client.$executeRaw`ALTER SEQUENCE "directory_id_seq" RESTART WITH 1`;
});

import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const makeNode = publicProcedure
    .input(
        z.object({
            building: z.string(),
            floor: z.number(),
            x: z.number(),
            y: z.number(),
        })
    )
    .mutation(async ({ input }) => {
        const node = await client.nodes.create({
            data: input,
        });
        return node;
    });

export const getAllNodes = publicProcedure
    .input(
        z.object({
            building: z.string(),
            floor: z.number(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;
        // Retrieve the user with the given ID
        const nodes = await client.nodes.findMany({
            where: {
                building: input.building,
                floor: input.floor,
            },
        });
        return nodes;
    });

export const getNode = publicProcedure
    .input(
        z.object({
            id: z.number(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;

        const node = await client.nodes.findUnique({
            where: {
                id: input.id,
            },
        });
        return node;
    });

export const deleteAllNodes = publicProcedure.mutation(async () => {
    await client.nodes.deleteMany();
    await client.$executeRaw`ALTER SEQUENCE "nodes_id_seq" RESTART WITH 1`;
});

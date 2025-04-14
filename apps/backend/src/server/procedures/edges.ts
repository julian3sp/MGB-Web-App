import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const makeEdge = publicProcedure
    .input(
        z.array(
            z.object({
                sourceId: z.number(),
                targetId: z.number(),
                weight: z.number(),
            })
        )
    )
    .mutation(async ({ input }) => {
        try {
            await client.edges.createMany({
                data: input,
            });
        } catch (error) {
            console.error('CreateMany error:', error);
            console.log('Edges attempted to insert:', input);
        }
    });

export const getAllEdges = publicProcedure
    .input(
        z.object({
            building: z.string(),
            floor: z.number(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;
        // Retrieve the user with the given ID
        const edges = await client.edges.findMany({
            include: {
                sourceNode: true,
                targetNode: true,
            },
        });
        return edges;
    });

export const deleteAllEdges = publicProcedure.mutation(async () => {
    await client.edges.deleteMany();
    await client.$executeRaw`ALTER SEQUENCE "edges_id_seq" RESTART WITH 1`;
});

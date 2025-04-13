import client from '../../bin/prisma-client';
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const makeEdge = publicProcedure
    .input(
        z.object({
            sourceId: z.number(),
            targetId: z.number(),
            weight: z.number(),
        })
    )
    .mutation(async ({ input }) => {
        const edge = await client.edges.create({
            data: input,
        });
        return edge;
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

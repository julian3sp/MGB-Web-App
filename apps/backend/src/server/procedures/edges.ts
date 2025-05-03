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
        console.log('Backend array: ', input);
        try {
            await client.edges.createMany({
                data: input,
            });
        } catch (error) {
            console.error('1st CreateMany error:', error);
            console.log('Edges attempted to insert:', input);
        }
    });
export const makeManyEdges = publicProcedure
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
                skipDuplicates: true, // optional, in case you're worried about duplicates
            });
        } catch (error) {
            console.error('CreateMany error:', error);
            console.log('Edges attempted to insert:', input);
        }
    });

export const getAllEdges = publicProcedure.query(async (opts) => {
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

export const deleteSelectedEdges = publicProcedure
    .input(z.array(z.number())) // expects an array of edge IDs
    .mutation(async ({ input }) => {
        await client.edges.deleteMany({
            where: {
                id: {
                    in: input,
                },
            },
        });
        console.log(input);

        return { success: true, deletedIds: input };
    });

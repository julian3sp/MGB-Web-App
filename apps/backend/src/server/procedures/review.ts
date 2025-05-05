import { publicProcedure } from '../trpc';
import client from '../../bin/prisma-client';
import { z } from 'zod';
import { trpc } from '../trpc.ts';

export const makeReview = publicProcedure
    .input(
        z.object({
            employeeId: z.string(),
            serviceRequestId: z.string(),
            review: z.string(),
            rating: z.number().min(1).max(5),
        })
    )
    .mutation(async ({ input }) => {
        try {
            const review = await client.review.create({
                data: input,
            });
            return review;
        } catch (error) {
            console.error(error);
        }
    });

export const getReviews = publicProcedure.query(async () => {
    const reviews = await client.review.findMany({});
    return reviews;
});

/*
export const getUniqueReview = publicProcedure.query(async () => {
        const array_of_names = await client.directory.findMany({ select: { id: true } });
        return array_of_names;
    });
*/

import { publicProcedure } from '../trpc';
import { z } from 'zod';
import client from '../../bin/prisma-client';

export const makeReview = publicProcedure
    .input(
        z.object({
            review: z.string(),
            rating: z.number(),
        })
    )
    .mutation(async ({ input }) => {
        try {
            console.log('Creating review with input:', input);

            const newReview = await client.review.create({
                data: {
                    review: input.review,
                    rating: input.rating,
                },
            });

            console.log('Review created successfully:', newReview);
            return newReview;
        } catch (error) {
            console.error('Error in makeReview procedure:', error);
            throw new Error('Failed to create review');
        }
    });

export const getReviews = publicProcedure.query(async () => {
    const reviews = await client.review.findMany({});
    return reviews;
});

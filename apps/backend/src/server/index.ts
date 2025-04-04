import { router, publicProcedure } from './trpc.ts'
import PrismaClient from "../bin/prisma-client.ts";
import prismaClient from "../bin/prisma-client.ts";

const appRouter({
    requestList: publicProcedure
        .query( async () => {
            const requests = prismaClient.service_requests.findMany()
        })
})

export type appRouter = typeof appRouter;


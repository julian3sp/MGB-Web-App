import { router, publicProcedure } from './trpc.ts'
import PrismaClient from "../bin/prisma-client.ts";
import prismaClient from "../bin/prisma-client.ts";

const appRouter = router({
    requestList: publicProcedure
        .query( async () => {
            const requests = await prismaClient.service_requests.findMany()
            return requests;
        })
})

export type appRouter = typeof appRouter;


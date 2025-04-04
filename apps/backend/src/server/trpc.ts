import { initTRPC } from "@trpc/server";

// initialize backend

const trpc = initTRPC.create();

// export reusable router
// procedure helpers: reusable template that helps you define how an api endpoint behaves
export const router = trpc.router();
export const publicProcedure = trpc.procedure;



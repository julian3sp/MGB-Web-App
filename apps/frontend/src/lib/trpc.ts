import { createTRPCReact } from '@trpc/react-query';
import type {appRouter} from "../../../backend/src/app.ts"; // Adjust the path if needed

export const trpc = createTRPCReact<appRouter>();
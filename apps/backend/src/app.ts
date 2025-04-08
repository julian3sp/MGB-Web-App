import createError, { HttpError } from 'http-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { getRequests, makeRequest } from './server/procedures/requests';
import { getEmployee, makeEmployee } from './server/procedures/employee';
import { router } from './server/trpc.ts';
import { getUser, makeUser } from './server/procedures/login.ts';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
const cors = require('cors');

const appRouter = t.router({
    requestList: getRequests,
    createRequest: makeRequest,
    getEmployees: getEmployee,
    makeEmployee: makeEmployee,
    validUser: getUser,
    makeUser: makeUser,
});

const app: Express = express(); // Setup the backend
app.use(cors());
app.use('/trpc', (req, res, next) => {
    console.log(`[TRPC] ${req.method} ${req.url}`);
    next();
});

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

// Setup generic middlewear
app.use(
    logger('dev', {
        stream: {
            // This is a "hack" that gets the output to appear in the remote debugger :)
            write: (msg) => console.info(msg),
        },
    })
); // This records all HTTP requests

app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
    // Have the next (generic error handler) process a 404 error
    next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response) => {
    // Provide the error message
    res.statusMessage = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Reply with the error
    res.status(err.status || 500);
});

// Export the backend, so that www.ts can start it
export default app;
export type appRouter = typeof appRouter;

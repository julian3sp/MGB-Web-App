import express, { Router, Request, Response } from 'express';
import PrismaClient, {
    deleteEmployees,
    deleteLangRequests,
    insertEmployee,
} from '../bin/prisma-client.ts';
const router: Router = express.Router();
import { insertLanguageRequest } from '../bin/prisma-client';

router.get('/servicereqs', async function (req: Request, res: Response) {
    // Fetch the latest score from database
    try {
        await insertEmployee('000000000', 'Julian Espinal');
        await insertEmployee('111111111', 'Brendon Peters');
        await insertEmployee('222222222', 'Evan Demas');
        await insertEmployee('333333333', 'Bryan Wheeler');
        await insertEmployee('444444444', 'Klaidi Varfi');
        await insertLanguageRequest(100, 'Spanish', '000000000');
        await insertLanguageRequest(102, 'Albanian', null);
        await insertLanguageRequest(103, 'Spanish', '111111111');
        await insertLanguageRequest(104, 'Russian', null);
        await insertLanguageRequest(105, 'Spanish', null);
        await insertLanguageRequest(106, 'French', '000000000');
        await insertLanguageRequest(107, 'Spanish', null);
        await insertLanguageRequest(108, 'Russian', null);
        await insertLanguageRequest(109, 'Spanish', '222222222');
        await insertLanguageRequest(110, 'Spanish', null);

        const result = await PrismaClient.language_request.findMany();
        console.log(result);
        res.json(result);
        await deleteLangRequests([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        await deleteEmployees(['000000000', '111111111', '222222222', '333333333', '444444444']);
    } catch (error) {
        console.error('error fetching language requests:', error);
    }
});

export default router;

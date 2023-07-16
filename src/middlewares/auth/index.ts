import { getSecretKey } from '../../services/secretKey';
import { NextFunction, Request, Response } from 'express';
import { compareSecretKey, decryptSecretKey } from '../../connections';
import { BadRequestError, InternalError, UnauthorizedError } from '../../errors';

export const auth = () => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (
        req.method === 'POST' ||
        req.method === 'PUT' ||
        req.method === 'DELETE'
    ) {

        const secretKey = req.headers['secret-key'];

        try {
            if (!secretKey || typeof secretKey !== 'string' || secretKey.trim() === '') {
                const badRequestError = new BadRequestError('Chave secreta inválida.');
                return res
                    .status(badRequestError.statusCode)
                    .json({ error: badRequestError.message });
            }

            const mySecretKeyHash = await getSecretKey();
            const decryptedPrivateKey = decryptSecretKey(String(secretKey));
            const isMatch = await compareSecretKey(decryptedPrivateKey, mySecretKeyHash);

            if (!isMatch) {
                const methodUnauthorizedError = new UnauthorizedError('Permissão negada!');
                return res
                    .status(methodUnauthorizedError.statusCode)
                    .json({ error: methodUnauthorizedError.message });
            }

            next();
        } catch (error) {
            console.error(error);
            const internalError = new InternalError('Ocorreu um erro no servidor.');
            return res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    } else {
        next();
    }
};
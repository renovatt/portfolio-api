import { getSecretKey } from '../../services/secretKey';
import { NextFunction, Request, Response } from 'express';
import { compareSecretKey, decryptSecretKey } from '../../connections';
import { BadRequestError, InternalError, UnauthorizedError } from '../../errors';

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const failedAttempts: Map<string, number> = new Map();
const lockedOutUsers: Set<string> = new Set();

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
        const ipAddress = req.ip;
        const secretKey = req.headers['secret-key'];

        try {
            if (!secretKey || typeof secretKey !== 'string' || secretKey.trim() === '') {
                const badRequestError = new BadRequestError('Chave secreta inválida.');
                return res
                    .status(badRequestError.statusCode)
                    .json({ error: badRequestError.message });
            }

            if (lockedOutUsers.has(ipAddress)) {
                const lockoutError = new UnauthorizedError('Você está bloqueado devido a tentativas incorretas.');
                return res
                    .status(lockoutError.statusCode)
                    .json({ error: lockoutError.message });
            }

            const mySecretKeyHash = await getSecretKey();
            const decryptedPrivateKey = decryptSecretKey(String(secretKey));
            const isMatch = await compareSecretKey(decryptedPrivateKey, mySecretKeyHash);

            if (!isMatch) {
                const attempts = failedAttempts.get(ipAddress) || 0;
                if (attempts >= MAX_FAILED_ATTEMPTS) {
                    lockedOutUsers.add(ipAddress);
                    setTimeout(() => {
                        lockedOutUsers.delete(ipAddress);
                        failedAttempts.delete(ipAddress);
                    }, LOCKOUT_DURATION);

                    const lockoutError = new UnauthorizedError('Acesso bloqueado devido a tentativas incorretas.');
                    return res
                        .status(lockoutError.statusCode)
                        .json({ error: lockoutError.message });
                }

                failedAttempts.set(ipAddress, attempts + 1);

                const unauthorizedError = new UnauthorizedError('PERMISSÃO NEGADA!');
                return res
                    .status(unauthorizedError.statusCode)
                    .json({ error: unauthorizedError.message });
            }

            failedAttempts.delete(ipAddress);

        } catch (error) {
            console.error(error);
            const internalError = new InternalError('Ocorreu um erro no servidor.');
            return res
                .status(internalError.statusCode)
                .json({ error: internalError.message });
        }
    }
    next();
};
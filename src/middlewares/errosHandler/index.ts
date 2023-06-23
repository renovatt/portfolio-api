import { ApiError, InternalError } from '../../errors';
import { NextFunction, Request, Response } from 'express';

export function errorHandlerMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof ApiError) {
        return res
            .status(error.statusCode)
            .json({ error: error.message });
    }

    const internalError = new InternalError('Erro interno.');
    return res
        .status(internalError.statusCode)
        .json({ error: internalError.message });
}
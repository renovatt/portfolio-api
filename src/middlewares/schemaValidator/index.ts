import { AnyZodObject, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { InternalError } from '../../errors';

export const schemaValition =
    (schema: AnyZodObject) =>
        (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            try {
                schema.parse({
                    body: req.body,
                    params: req.params,
                    query: req.query,
                });
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const validationErrors = error.errors.map(issue => ({
                        path: issue.path.join(' '),
                        message: issue.message
                    }));

                    return res
                        .status(400)
                        .json({ error: validationErrors });
                }

                const internalError = new InternalError('Erro interno.');

                return res
                    .status(internalError.statusCode)
                    .json({ error: internalError.message });
            }
        };
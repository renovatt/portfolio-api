import { BadRequestError } from '../errors';

const verifyMongoId = (userId: string) => {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return !idRegex.test(userId);
};

export function validateId(id: string): void {
    if (verifyMongoId(id)) {
        throw new BadRequestError('ID inválido ou não existe!');
    }
}
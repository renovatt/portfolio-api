import prismaClient from '../../lib';
import { NotFoundError } from '../../errors';

export const getSecretKey = async () => {
    const secretKey = await prismaClient.secretKey.findFirst();

    if (!secretKey) {
        throw new NotFoundError('Chave secreta não encontrada.');
    }

    return secretKey.secretKey;
};
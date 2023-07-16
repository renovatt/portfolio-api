import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { BadRequestError } from '../errors';

dotenv.config();

const SECRET = process.env.SECRET as string;
const ENCRYPTION_ALGORITHM = process.env.ENCRYPTION_ALGORITHM as string;

const verifyMongoId = (userId: string) => {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return !idRegex.test(userId);
};

export function validateId(id: string): void {
    if (verifyMongoId(id)) {
        throw new BadRequestError('ID inválido ou não existe!');
    }
}

export const compareSecretKey = async (
    secretKey: string,
    mySecretKeyHash: string
): Promise<boolean> => {
    return bcrypt.compare(secretKey, mySecretKeyHash);
};

export const decryptSecretKey = (encrypted: string) => {
    const [iv, encryptedSecretKey] = encrypted.split(':');

    const decipher = crypto.createDecipheriv(
        ENCRYPTION_ALGORITHM,
        Buffer.from(SECRET),
        Buffer.from(iv, 'hex')
    );

    let decrypted = decipher.update(encryptedSecretKey, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted.toString();
};
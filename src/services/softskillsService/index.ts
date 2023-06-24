import prismaClient from '../../lib';
import {
    BadRequestError,
    NotFoundError
} from '../../errors';
import {
    CreateSoftskillSchema,
    DeleteSoftskillSchema,
    UpdateSoftskillSchema
} from '../../@types';

export const validateSoftskillNotExist = async (softskill_name: string): Promise<void> => {
    const existingSoftskill = await prismaClient.softskills.findFirst({
        where: { softskill_name }
    });

    if (existingSoftskill) {
        throw new BadRequestError('Já existe uma competência com esse nome.');
    }
};

export const findSoftskillsById = async (id: string): Promise<CreateSoftskillSchema['body']> => {
    const existingSoftskill = await prismaClient.softskills.findFirst({
        where: { id }
    });

    if (!existingSoftskill) {
        throw new NotFoundError('Nenhuma competência foi encontrada.');
    }

    return existingSoftskill;
};

export const getAllSoftskills = async () => {
    const softskills = await prismaClient.softskills.findMany();

    if (!softskills) {
        throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
    }

    return { softskills };
};

export const createSoftskill = async (
    data: CreateSoftskillSchema['body']): Promise<CreateSoftskillSchema['body']> => {
    const { softskill_name } = data;

    const softskills = await prismaClient.softskills.create({
        data: { softskill_name },
    });

    return softskills;
};

export const updateSoftskill = async (
    existingSoftskill: UpdateSoftskillSchema['body'],
    softskill_name: string
): Promise<UpdateSoftskillSchema['body']> => {
    const { id } = existingSoftskill;

    const updatedSoftskill = await prismaClient.softskills.update({
        where: { id },
        data: { softskill_name },
    });

    return updatedSoftskill;
};

export const deleteSoftskill = async (
    existingSoftskill: DeleteSoftskillSchema['params'],
): Promise<DeleteSoftskillSchema['params']> => {

    const deletedSoftskill = await prismaClient.softskills.delete({
        where: { id: existingSoftskill.id },
    });

    return deletedSoftskill;
};
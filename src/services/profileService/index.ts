import prismaClient from '../../lib';
import {
    BadRequestError,
    NotFoundError
} from '../../errors';
import {
    CreateProfileSchema,
    DeleteProfileSchema,
    UpdateProfileSchema
} from '../../@types';

export const findProfileById = async (id: string): Promise<CreateProfileSchema['body']> => {
    const existingProfile = await prismaClient.profile.findUnique({
        where: { id }
    });

    if (!existingProfile) {
        throw new NotFoundError('Nenhuma perfil foi encontrado.');
    }

    return existingProfile;
};

export const getAllProfile = async () => {
    const profile = await prismaClient.profile.findMany();

    if (!profile) {
        throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
    }

    return { profile };
};

export const createProfile = async (
    data: CreateProfileSchema['body']): Promise<CreateProfileSchema['body']> => {
    const {
        description_1,
        description_2
    } = data;

    const profile = await prismaClient.profile.create({
        data: {
            description_1,
            description_2
        },
    });

    return profile;
};

export const updateProfile = async (
    existingProfile: UpdateProfileSchema['body'],
    body: UpdateProfileSchema['body'],
): Promise<UpdateProfileSchema['body']> => {
    const { id } = existingProfile;

    const {
        description_1,
        description_2
    } = body;

    const updatedProfile = await prismaClient.profile.update({
        where: { id },
        data: {
            description_1,
            description_2
        },
    });

    return updatedProfile;
};

export const deleteProfile = async (
    existingProfile: DeleteProfileSchema['params'],
): Promise<DeleteProfileSchema['params']> => {

    const deletedProfile = await prismaClient.profile.delete({
        where: { id: existingProfile.id },
    });

    return deletedProfile;
};
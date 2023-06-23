import prismaClient from '../../lib';
import { Request, Response } from 'express';
import { validateId } from '../../connections';
import { BadRequestError, NotFoundError } from '../../errors';
import { CreateProfileSchema, DeleteProfileSchema, UpdateProfileSchema } from '../../@types';

export class ProfileController {
    async profile(request: Request, response: Response) {
        const profile = await prismaClient.profile.findMany();

        if (!profile) {
            throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
        }

        return response
            .status(200)
            .json(profile);
    }

    async create(request: Request<CreateProfileSchema['body']>, response: Response) {
        const { body }: CreateProfileSchema = request;
        const { description_1, description_2 } = body;

        const profile = await prismaClient.profile.create({
            data: {
                description_1,
                description_2
            },
        });

        return response
            .status(201)
            .json({
                profile,
                message: 'Perfil adicionado com sucesso!'
            });
    }

    async update(request: Request<UpdateProfileSchema['params']>, response: Response) {
        const { id } = request.params;
        const { body }: UpdateProfileSchema = request;
        const { description_1, description_2 } = body;

        validateId(id);

        const findProfileId = await prismaClient.profile.findFirst({
            where: { id }
        });

        if (!findProfileId) {
            throw new NotFoundError('Perfil não encontrado.');
        } else {
            const updatedProfile = await prismaClient.profile.update({
                where: { id },
                data: {
                    description_1,
                    description_2
                },
            });

            return response
                .status(200)
                .json({
                    profile: updatedProfile,
                    message: 'Perfil atualizado com sucesso!'
                });
        }
    }

    async delete(request: Request<DeleteProfileSchema['params']>, response: Response) {
        const { id } = request.params;

        validateId(id);

        const findProfileId = await prismaClient.profile.findFirst({
            where: { id }
        });

        if (!findProfileId) {
            throw new NotFoundError('Perfil não encontrado.');
        } else {
            const profile = await prismaClient.profile.delete({
                where: { id }
            });
            return response
                .status(200)
                .json({
                    profile,
                    message: 'Perfil deletado com sucesso.'
                });
        }
    }
}
import prismaClient from '../../lib';
import { Request, Response } from 'express';
import { SoftskillsTypeProps } from '../../@types';
import { BadRequestError, InternalError, NotFoundError } from '../../errors';
import { verifyUserId } from '../../connections';

export class SoftskillsController {
    async softskills(request: Request, response: Response) {
        try {
            const softskills = await prismaClient.softskills.findMany();

            if (!softskills) throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');

            return response.status(201).json(softskills);
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async create(request: Request, response: Response) {
        const { softskill_name }: SoftskillsTypeProps = request.body;

        try {
            const isExists = await prismaClient.softskills.findFirst({
                where: { softskill_name }
            });

            if (isExists) {
                throw new BadRequestError('Já existe uma competência com esse nome.');
            } else {
                const softskills = await prismaClient.softskills.create({
                    data: {
                        softskill_name
                    },
                });
                return response.status(200).json({ softskills, message: 'Competência adicionada com sucesso!' });
            }
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { softskill_name }: SoftskillsTypeProps = request.body;

        try {
            if (verifyUserId(id)) throw new BadRequestError('O ID do competência é inválida ou não existe!');

            const softskills = await prismaClient.softskills.findFirst({
                where: { id }
            });

            if (!softskills) {
                throw new NotFoundError('Nenhuma competência foi encontrada.');
            } else {
                await prismaClient.softskills.update({
                    where: { id },
                    data: {
                        softskill_name
                    },
                });
            }
            return response.status(200).json({ softskills, message: 'Competência atualizada com sucesso!' });
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequestError('O ID do competência é inválida ou não existe!');

            const findSoftskill = await prismaClient.softskills.findFirst({
                where: { id }
            });

            if (!findSoftskill) {
                throw new NotFoundError('Nenhuma competência foi encontrada.');
            } else {
                const softskills = await prismaClient.softskills.delete({
                    where: { id }
                });
                return response.status(200).json({ softskills, message: 'Competência deletada com sucesso.' });
            }
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }
}
import prismaClient from '../../lib';
import { Request, Response } from 'express';
import { validateId } from '../../connections';
import { BadRequestError, NotFoundError } from '../../errors';
import { CreateSoftskillSchema, DeleteSoftskillSchema, UpdateSoftskillSchema } from '../../@types';

export class SoftskillController {
    async softskills(request: Request, response: Response) {
        const softskills = await prismaClient.softskills.findMany();

        if (!softskills) {
            throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
        }

        return response
            .status(200)
            .json(softskills);
    }

    async create(request: Request<CreateSoftskillSchema['body']>, response: Response) {
        const { body }: CreateSoftskillSchema = request;
        const { softskill_name } = body;

        const isExists = await prismaClient.softskills.findFirst({
            where: { softskill_name }
        });

        if (isExists) {
            throw new BadRequestError('Já existe uma competência com esse nome.');
        } else {
            const softskills = await prismaClient.softskills.create({
                data: { softskill_name },
            });

            return response
                .status(201)
                .json({
                    softskills,
                    message: 'Competência adicionada com sucesso!'
                });
        }
    }

    async update(request: Request<UpdateSoftskillSchema['params']>, response: Response) {
        const { id } = request.params;
        const { body }: UpdateSoftskillSchema = request;
        const { softskill_name } = body;

        validateId(id);

        const findSoftskillsId = await prismaClient.softskills.findFirst({
            where: { id }
        });

        const isExists = await prismaClient.softskills.findFirst({
            where: { softskill_name }
        });

        if (isExists) {
            throw new BadRequestError('Já existe uma competência com esse nome.');
        }

        if (!findSoftskillsId) {
            throw new NotFoundError('Nenhuma competência foi encontrada.');
        } else {
            const updatedSoftskill = await prismaClient.softskills.update({
                where: { id },
                data: { softskill_name },
            });

            return response
                .status(200)
                .json({
                    softskills: updatedSoftskill,
                    message: 'Competência atualizada com sucesso!'
                });
        }
    }

    async delete(request: Request<DeleteSoftskillSchema['params']>, response: Response) {
        const { id } = request.params;

        validateId(id);

        const findSoftskill = await prismaClient.softskills.findFirst({
            where: { id }
        });

        if (!findSoftskill) {
            throw new NotFoundError('Nenhuma competência foi encontrada.');
        } else {
            const softskills = await prismaClient.softskills.delete({
                where: { id }
            });
            return response
                .status(200)
                .json({
                    softskills,
                    message: 'Competência deletada com sucesso.'
                });
        }
    }
}
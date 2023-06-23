import prismaClient from '../../lib';
import { Request, Response } from 'express';
import { validateId } from '../../connections';
import { BadRequestError, NotFoundError } from '../../errors';
import { CreateSkillSchema, DeleteSkillSchema, UpdateSkillSchema } from '../../@types';

export class SkillController {
    async skills(request: Request, response: Response) {
        const skill = await prismaClient.skills.findMany();

        if (!skill) {
            throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
        }

        return response
            .status(200)
            .json(skill);
    }

    async create(request: Request<CreateSkillSchema['body']>, response: Response) {
        const { body }: CreateSkillSchema = request;
        const {
            svg,
            link,
            skill_name,
            description
        } = body;

        const isExists = await prismaClient.skills.findFirst({
            where: { skill_name }
        });

        if (isExists) {
            throw new BadRequestError('Já existe um habilidade com esse nome.');
        } else {
            const skill = await prismaClient.skills.create({
                data: {
                    svg,
                    link,
                    skill_name,
                    description
                },
            });

            return response
                .status(201)
                .json({
                    skill,
                    message: 'Habilidade adicionada com sucesso!'
                });
        }
    }

    async update(request: Request<UpdateSkillSchema>['params'], response: Response) {
        const { id } = request.params;
        const { body }: UpdateSkillSchema = request;
        const {
            svg,
            link,
            skill_name,
            description
        } = body;

        validateId(id);

        const skill = await prismaClient.skills.findFirst({
            where: { id }
        });

        if (!skill) {
            throw new NotFoundError('Nenhuma habilidade foi encontrada.');
        } else {
            const updatedSkill = await prismaClient.skills.update({
                where: { id },
                data: {
                    svg,
                    link,
                    skill_name,
                    description
                },
            });

            return response
                .status(200)
                .json({
                    skill: updatedSkill,
                    message: 'Habilidade atualizada com sucesso!'
                });
        }
    }

    async delete(request: Request<DeleteSkillSchema>['params'], response: Response) {
        const { id } = request.params;

        validateId(id);

        const findSkill = await prismaClient.skills.findFirst({
            where: { id }
        });

        if (!findSkill) {
            throw new NotFoundError('Nenhuma habilidade foi encontrada.');
        } else {
            const skill = await prismaClient.skills.delete({
                where: { id }
            });

            return response
                .status(200)
                .json({
                    skill,
                    message: 'Habilidade deletada com sucesso.'
                });
        }
    }
}
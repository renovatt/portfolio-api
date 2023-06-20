import prismaClient from '../../lib';
import { Request, Response } from 'express';
import { SkillsTypeProps } from '../../@types';
import { BadRequestError, InternalError, NotFoundError } from '../../errors';
import { verifyUserId } from '../../connections';

export class SkillsController {
    async skills(request: Request, response: Response) {
        try {
            const skills = await prismaClient.skills.findMany();

            if (!skills) throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');

            return response.status(201).json(skills);
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async create(request: Request, response: Response) {
        const {
            svg,
            link,
            skill_name,
            description
        }: SkillsTypeProps = request.body;

        try {
            const isExists = await prismaClient.skills.findFirst({
                where: { skill_name }
            });

            if (isExists) {
                throw new BadRequestError('Já existe um habilidade com esse nome.');
            } else {
                const skills = await prismaClient.skills.create({
                    data: {
                        svg,
                        link,
                        skill_name,
                        description
                    },
                });
                return response.status(200).json({ skills, message: 'Habilidade adicionada com sucesso!' });
            }
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const {
            svg,
            link,
            skill_name,
            description
        }: SkillsTypeProps = request.body;

        try {
            if (verifyUserId(id)) throw new BadRequestError('O ID do habilidade é inválida ou não existe!');

            const skills = await prismaClient.skills.findFirst({
                where: { id }
            });

            if (!skills) {
                throw new NotFoundError('Nenhuma habilidade foi encontrada.');
            } else {
                await prismaClient.skills.update({
                    where: { id },
                    data: {
                        svg,
                        link,
                        skill_name,
                        description
                    },
                });
            }
            return response.status(200).json({ skills, message: 'Habilidade atualizada com sucesso!' });
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequestError('O ID do habilidade é inválida ou não existe!');

            const findSkill = await prismaClient.skills.findFirst({
                where: { id }
            });

            if (!findSkill) {
                throw new NotFoundError('Nenhuma habilidade foi encontrada.');
            } else {
                const project = await prismaClient.skills.delete({
                    where: { id }
                });
                return response.status(200).json({ project, message: 'Habilidade deletada com sucesso.' });
            }
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }
}
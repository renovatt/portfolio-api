import prismaClient from '../../lib';
import { Request, Response } from 'express';
import { verifyUserId } from '../../connections';
import { ProjectsTypeProps } from '../../@types';
import { BadRequestError, InternalError, NotFoundError } from '../../errors';

export class ProjectController {
    async projects(request: Request, response: Response) {
        try {
            const projects = await prismaClient.project.findMany();

            if (!projects) throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');

            return response.status(201).json(projects);
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async create(request: Request, response: Response) {
        const {
            project_name,
            banner,
            description,
            link_deploy,
            thumbnail,
            techs: {
                links
            }
        }: ProjectsTypeProps = request.body;

        try {
            const isExists = await prismaClient.project.findFirst({
                where: { project_name }
            });

            if (isExists) {
                throw new BadRequestError('Já existe um projeto com esse nome.');
            } else {
                const project = await prismaClient.project.create({
                    data: {
                        project_name,
                        link_deploy,
                        banner,
                        thumbnail,
                        description,
                        techs: {
                            links
                        }
                    },
                });
                return response.status(200).json({ project, message: 'Projeto adicionado com sucesso!' });
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
            project_name,
            banner,
            description,
            link_deploy,
            thumbnail,
            techs: {
                links
            }
        }: ProjectsTypeProps = request.body;

        try {
            if (verifyUserId(id)) throw new BadRequestError('O ID do projeto é inválido ou não existe!');

            const project = await prismaClient.project.findFirst({
                where: { id }
            });

            if (!project) {
                throw new NotFoundError('Nenhum projeto foi encontrado.');
            } else {
                await prismaClient.project.update({
                    where: { id },
                    data: {
                        project_name,
                        banner,
                        description,
                        link_deploy,
                        thumbnail,
                        techs: {
                            links
                        }
                    },
                });
            }
            return response.status(200).json({ project, message: 'Projeto atualizado com sucesso!' });
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        try {
            if (verifyUserId(id)) throw new BadRequestError('O ID do projeto é inválido ou não existe!');

            const findproject = await prismaClient.project.findFirst({
                where: { id }
            });

            if (!findproject) {
                throw new NotFoundError('Nenhum projeto foi encontrado.');
            } else {
                const project = await prismaClient.project.delete({
                    where: { id }
                });
                return response.status(200).json({ project, message: 'Projeto deletado com sucesso.' });
            }
        } catch (error: any) {
            let modifieldError = error;
            if (!modifieldError.statusCode) modifieldError = new InternalError('Error interno.');
            return response.status(modifieldError.statusCode).json({ error: modifieldError.message });
        }
    }
}
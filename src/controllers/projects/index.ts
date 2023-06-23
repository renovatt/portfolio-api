import prismaClient from '../../lib';
import { Request, Response } from 'express';
import { validateId } from '../../connections';
import { BadRequestError, NotFoundError } from '../../errors';
import { CreateProjectSchema, DeleteProjectSchema, UpdateProjectSchema } from '../../@types';

export class ProjectController {
    async projects(request: Request, response: Response) {
        const projects = await prismaClient.project.findMany();

        if (!projects) {
            throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
        }

        return response
            .status(200)
            .json(projects);
    }

    async create(request: Request<CreateProjectSchema>['body'], response: Response) {
        const { body }: CreateProjectSchema = request;
        const {
            project_name,
            banner_url,
            deploy_url,
            thumbnail_url,
            description,
            techs: { links },
        } = body;

        const isExists = await prismaClient.project.findFirst({
            where: { project_name }
        });

        if (isExists) {
            throw new BadRequestError('Já existe um projeto com esse nome.');
        } else {
            const project = await prismaClient.project.create({
                data: {
                    project_name,
                    banner_url,
                    deploy_url,
                    thumbnail_url,
                    description,
                    techs: { links },
                },
            });
            return response
                .status(201)
                .json({
                    project,
                    message: 'Projeto adicionado com sucesso!'
                });
        }
    }

    async update(request: Request<UpdateProjectSchema>['params'], response: Response) {
        const { id } = request.params;
        const { body }: UpdateProjectSchema = request;
        const {
            project_name,
            banner_url,
            deploy_url,
            thumbnail_url,
            description,
            techs: { links },
        } = body;

        validateId(id);

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
                    banner_url,
                    deploy_url,
                    thumbnail_url,
                    description,
                    techs: { links },
                },
            });
        }
        return response
            .status(200)
            .json({
                project,
                message: 'Projeto atualizado com sucesso!'
            });
    }

    async delete(request: Request<DeleteProjectSchema>['params'], response: Response) {
        const { id } = request.params;

        validateId(id);

        const findProject = await prismaClient.project.findFirst({
            where: { id }
        });

        if (!findProject) {
            throw new NotFoundError('Nenhum projeto foi encontrado.');
        } else {
            const project = await prismaClient.project.delete({
                where: { id }
            });
            return response
                .status(200)
                .json({
                    project,
                    message: 'Projeto deletado com sucesso.'
                });
        }
    }
}
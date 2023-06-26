import prismaClient from '../../lib';
import {
    BadRequestError,
    NotFoundError
} from '../../errors';
import {
    CreateProjectSchema,
    DeleteProjectSchema,
    UpdateProjectSchema
} from '../../@types';

export const validateProjectNotExist = async (project_name: string): Promise<void> => {
    const existingProject = await prismaClient.project.findFirst({
        where: { project_name }
    });

    if (existingProject) {
        throw new BadRequestError('Já existe um projeto com esse nome.');
    }
};

export const validateProjecOrdertNotExist = async (order: number): Promise<void> => {
    const existingProject = await prismaClient.project.findFirst({
        where: { order }
    });

    if (existingProject) {
        throw new BadRequestError('Já existe um projeto nessa ordem.');
    }
};

export const findProjectById = async (id: string): Promise<CreateProjectSchema['body']> => {

    const existingProject = await prismaClient.project.findUnique({
        where: { id }
    });

    if (!existingProject) {
        throw new NotFoundError('Nenhuma projeto foi encontrado.');
    }

    return existingProject;
};


export const getAllProjects = async () => {
    const projects = await prismaClient.project.findMany();

    if (!projects) {
        throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
    }

    return { projects };
};

export const createProject = async (
    body: CreateProjectSchema['body']): Promise<CreateProjectSchema['body']> => {
    const {
        order,
        project_name,
        banner_url,
        deploy_url,
        thumbnail_url,
        description,
        techs: { links },
    } = body;

    const createdProject = await prismaClient.project.create({
        data: {
            order,
            project_name,
            banner_url,
            deploy_url,
            thumbnail_url,
            description,
            techs: { links },
        },
    });

    return createdProject;
};

export const updateProject = async (
    existingProject: UpdateProjectSchema['body'],
    body: UpdateProjectSchema['body'],
): Promise<UpdateProjectSchema['body']> => {
    const { id } = existingProject;

    const {
        order,
        project_name,
        banner_url,
        deploy_url,
        thumbnail_url,
        description,
        techs: { links },
    } = body;

    if (existingProject.project_name !== project_name) {
        await validateProjectNotExist(project_name);
    }

    if (existingProject.order !== order) {
        await validateProjecOrdertNotExist(order);
    }

    const updatedProject = await prismaClient.project.update({
        where: { id },
        data: {
            order,
            project_name,
            banner_url,
            deploy_url,
            thumbnail_url,
            description,
            techs: { links },
        },
    });

    return updatedProject;
};

export const deleteProject = async (
    existingProject: DeleteProjectSchema['params'],
): Promise<DeleteProjectSchema['params']> => {

    const deletedProject = await prismaClient.project.delete({
        where: { id: existingProject.id },
    });

    return deletedProject;
};
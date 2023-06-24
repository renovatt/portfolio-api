import { Request, Response } from 'express';
import { validateId } from '../../connections';
import {
    CreateProjectSchema,
    DeleteProjectSchema,
    ReadProjectSchema,
    UpdateProjectSchema
} from '../../@types';
import {
    createProject,
    deleteProject,
    findProjectById,
    getAllProjects,
    updateProject,
    validateProjecOrdertNotExist,
    validateProjectNotExist
} from '../../services/projectService';

export class ProjectController {
    async projects(request: Request, response: Response) {
        const projects = await getAllProjects();

        return response
            .status(200)
            .json(projects);
    }

    async create(request: Request<CreateProjectSchema>['body'], response: Response) {
        const { body }: CreateProjectSchema = request;
        const { project_name, order } = body;

        await validateProjecOrdertNotExist(order);
        await validateProjectNotExist(project_name);

        const project = await createProject(body);

        return response
            .status(201)
            .json({
                project,
                message: 'Projeto adicionado com sucesso!'
            });
    }

    async update(request: Request<UpdateProjectSchema>['params'], response: Response) {
        const { id } = request.params;
        const { body }: UpdateProjectSchema = request;
        const { project_name, order } = body;

        validateId(id);
        await validateProjecOrdertNotExist(order);
        await validateProjectNotExist(project_name);

        const existingProject = await findProjectById(id);
        const updatedProject = await updateProject(existingProject, body);

        return response
            .status(200)
            .json({
                project: updatedProject,
                message: 'Projeto atualizado com sucesso!'
            });
    }

    async delete(request: Request<DeleteProjectSchema>['params'], response: Response) {
        const { id } = request.params;

        validateId(id);

        const existingProject = await findProjectById(id);
        const existingProjectId = existingProject.id as string;
        const deletedProject = await deleteProject({ id: existingProjectId });

        return response
            .status(200)
            .json({
                project: deletedProject,
                message: 'Projeto deletado com sucesso.'
            });
    }

    async find(request: Request<ReadProjectSchema['params']>, response: Response) {
        const { id } = request.params;

        validateId(id);

        const project = await findProjectById(id);

        return response
            .status(200)
            .json(project);
    }
}
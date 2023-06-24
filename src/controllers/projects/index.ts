import { Request, Response } from 'express';
import { validateId } from '../../connections';
import {
    CreateProjectSchema,
    DeleteProjectSchema,
    UpdateProjectSchema
} from '../../@types';
import {
    createProject,
    deleteProject,
    findProjectsById,
    getAllProjects,
    updateProject,
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
        const { project_name } = body;

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
        const { project_name } = body;

        validateId(id);
        await validateProjectNotExist(project_name);

        const existingProject = await findProjectsById(id);
        const updatedProject = await updateProject(existingProject, body);

        console.log(existingProject);

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

        const existingProject = await findProjectsById(id);
        const existingProjectId = existingProject.id as string;
        const deletedProject = await deleteProject({ id: existingProjectId });

        return response
            .status(200)
            .json({
                project: deletedProject,
                message: 'Projeto deletado com sucesso.'
            });
    }
}
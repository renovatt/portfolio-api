import prismaClient from "../../lib";
import { Request, Response } from 'express'
import { ProjectProps } from "../../@types";

export class ProjectController {
    async create(request: Request, response: Response) {

        const { name }: ProjectProps = request.body

        try {
            if (!name) {
                throw new Error("Nenhum projeto encontrado.");
            } else {

                const project = await prismaClient.project.create({
                    data: {
                        name
                    },
                });

                return response.status(200).json({ project, message: "Projeto criado com sucesso!" });
            }
        } catch (error: any) {
            return response.status(400).json({ error: "Algo deu errado" });
        }
    }

    async projects(request: Request, response: Response) {

        const { name }: ProjectProps = request.body

        try {
            if (name) {
                throw new Error("Nenhum projeto encontrado.");
            } else {
                const project = await prismaClient.project.findMany();
                return response.status(200).json(project);
            };
        } catch (error: any) {
            return response.status(400).json({ error: "Algo deu errado" });
        }
    }
}
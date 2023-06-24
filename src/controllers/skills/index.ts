import { Request, Response } from 'express';
import { validateId } from '../../connections';
import {
    CreateSkillSchema,
    DeleteSkillSchema,
    UpdateSkillSchema
} from '../../@types';
import {
    createSkill,
    deleteSkill,
    findSkillsById,
    getAllSkills,
    updateSkill,
    validateSkillNotExist
} from '../../services/skillsService';

export class SkillController {
    async skills(request: Request, response: Response) {
        const skills = await getAllSkills();

        return response
            .status(200)
            .json(skills);
    }

    async create(request: Request<CreateSkillSchema['body']>, response: Response) {
        const { body }: CreateSkillSchema = request;
        const { skill_name } = body;

        await validateSkillNotExist(skill_name);

        const skill = await createSkill(body);

        return response
            .status(201)
            .json({
                skill,
                message: 'Habilidade adicionada com sucesso!'
            });
    }

    async update(request: Request<UpdateSkillSchema['params']>, response: Response) {
        const { id } = request.params;
        const { body }: UpdateSkillSchema = request;
        const { skill_name } = body;

        validateId(id);
        await validateSkillNotExist(skill_name);

        const existingSkill = await findSkillsById(id);
        const updatedSkill = await updateSkill(existingSkill, body);

        return response
            .status(200)
            .json({
                skill: updatedSkill,
                message: 'Habilidade atualizada com sucesso!'
            });
    }

    async delete(request: Request<DeleteSkillSchema['params']>, response: Response) {
        const { id } = request.params;

        validateId(id);

        const existingSkill = await findSkillsById(id);
        const existingSkillId = existingSkill.id as string;
        const deletedSkill = await deleteSkill({ id: existingSkillId });

        return response
            .status(200)
            .json({
                skill: deletedSkill,
                message: 'Habilidade deletada com sucesso!'
            });
    }
}
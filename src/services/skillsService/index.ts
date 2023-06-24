import prismaClient from '../../lib';
import {
    BadRequestError,
    NotFoundError
} from '../../errors';
import {
    CreateSkillSchema,
    DeleteSkillSchema,
    UpdateSkillSchema
} from '../../@types';

export const validateSkillNotExist = async (skill_name: string): Promise<void> => {
    const existingSkill = await prismaClient.skills.findFirst({
        where: { skill_name }
    });

    if (existingSkill) {
        throw new BadRequestError('Já existe uma habilidade com esse nome.');
    }
};

export const findSkillsById = async (id: string): Promise<CreateSkillSchema['body']> => {
    const existingSkill = await prismaClient.skills.findFirst({
        where: { id }
    });

    if (!existingSkill) {
        throw new NotFoundError('Nenhuma habilidade foi encontrada.');
    }

    return existingSkill;
};

export const getAllSkills = async () => {
    const skills = await prismaClient.skills.findMany();

    if (!skills) {
        throw new BadRequestError('Lamento, aconteceu algum erro ao buscar os dados.');
    }

    return { skills };
};

export const createSkill = async (
    data: CreateSkillSchema['body']): Promise<CreateSkillSchema['body']> => {
    const {
        svg,
        link,
        skill_name,
        description
    } = data;

    const skill = await prismaClient.skills.create({
        data: {
            svg,
            link,
            skill_name,
            description
        },
    });

    return skill;
};

export const updateSkill = async (
    existingSkill: UpdateSkillSchema['body'],
    body: UpdateSkillSchema['body'],
): Promise<UpdateSkillSchema['body']> => {
    const { id } = existingSkill;

    const {
        skill_name,
        description,
        link,
        svg
    } = body;

    const updatedSkill = await prismaClient.skills.update({
        where: { id },
        data: {
            skill_name,
            description,
            link,
            svg
        },
    });

    return updatedSkill;
};

export const deleteSkill = async (
    existingSkill: DeleteSkillSchema['params'],
): Promise<DeleteSkillSchema['params']> => {

    const deletedSkill = await prismaClient.skills.delete({
        where: { id: existingSkill.id },
    });

    return deletedSkill;
};
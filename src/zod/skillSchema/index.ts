import { z } from 'zod';

const payload = {
    body: z.object({
        id: z.string().optional(),
        link: z
            .string({ required_error: 'Link obrigatório.' })
            .nonempty('Link obrigatório.')
            .url('Precisa ser uma url válida.'),
        svg: z
            .string({ required_error: 'SVG obrigatório.' })
            .nonempty('SVG obrigatório.'),
        skill_name: z
            .string({ required_error: 'Nome obrigatório.' })
            .nonempty('Nome obrigatório.'),
        description: z
            .string({ required_error: 'Descrição obrigatória.' })
            .nonempty('Descrição obrigatório.')
    })
};

const params = {
    params: z.object({
        id: z.string()
    })
};

export const createSkillSchema = z.object({
    ...payload
});

export const updateSkillSchema = z.object({
    ...params,
    ...payload
});

export const deleteSkillSchema = z.object({
    ...params
});

export const getSkillSchema = z.object({
    ...params,
});
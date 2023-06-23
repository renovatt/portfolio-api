import { z } from 'zod';

const payload = {
    body: z.object({
        id: z.string().optional(),
        description_1: z
            .string({ required_error: 'Descrição obrigatória.' })
            .nonempty('Descrição obrigatória.'),
        description_2: z
            .string({ required_error: 'Descrição obrigatória.' })
            .nonempty('Descrição obrigatória.')
    })
};

const params = {
    params: z.object({
        id: z.string()
    })
};

export const createProfileSchema = z.object({
    ...payload
});

export const updateProfileSchema = z.object({
    ...params,
    ...payload
});

export const deleteProfileSchema = z.object({
    ...params
});
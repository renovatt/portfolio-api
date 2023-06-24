import { z } from 'zod';

const payload = {
    body: z.object({
        id: z.string().optional(),
        softskill_name: z
            .string({ required_error: 'Nome obrigatório' })
            .nonempty('Nome obrigatório.')
            .min(3, 'Minimo de 3 char'),
    })
};

const params = {
    params: z.object({
        id: z.string()
    })
};

export const createSoftskillSchema = z.object({
    ...payload
});

export const updateSoftskillSchema = z.object({
    ...params,
    ...payload
});

export const deleteSoftskillSchema = z.object({
    ...params,
});
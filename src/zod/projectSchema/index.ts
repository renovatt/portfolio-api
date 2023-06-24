import { z } from 'zod';

const payload = {
    body: z.object({
        id: z.string().optional(),
        project_name: z
            .string({ required_error: 'Nome do projeto é obrigatório.' })
            .nonempty('Nome do projeto é obrigatório.'),
        deploy_url: z
            .string({ required_error: 'URL do deploy é obrigatória.' })
            .nonempty('URL do deploy é obrigatória.')
            .url('Precisa ser uma url válida.'),
        banner_url: z
            .string({ required_error: 'URL do banner é obrigatória.' })
            .nonempty('URL do banner é obrigatória.')
            .url('Precisa ser uma url válida.'),
        thumbnail_url: z
            .string({ required_error: 'URL da thumbnail é obrigatória.' })
            .nonempty('URL da thumbnail é obrigatória.')
            .url('Precisa ser uma url válida.'),
        description: z
            .string({ required_error: 'Descrição é obrigatória.' })
            .nonempty('Descrição é obrigatória.'),
        techs: z
            .object({
                links: z
                    .array(
                        z
                            .object({
                                id: z
                                    .string({ required_error: 'ID da tech obrigatório.' })
                                    .nonempty('ID da tech obrigatório.'),
                                svg_name: z
                                    .string({ required_error: 'Informe o nome do svg.' })
                                    .nonempty('Informe o nome do svg.'),
                                link: z
                                    .string({ required_error: 'URL da tech obrigatória.' })
                                    .nonempty('URL da tech obrigatória.')
                                    .url('Precisa ser uma url válida.'),
                                svg_link: z
                                    .string({ required_error: 'URL do svg obrigatória.' })
                                    .nonempty('Precisa informar a url do svg da habilidade.')
                                    .url('Precisa ser uma url válida.'),
                            }),
                    )
            })
    })
};

const params = {
    params: z.object({
        id: z.string()
    })
};

export const createProjectSchema = z.object({
    ...payload
});

export const updateProjectSchema = z.object({
    ...params,
    ...payload
});

export const deleteProjectSchema = z.object({
    ...params
});
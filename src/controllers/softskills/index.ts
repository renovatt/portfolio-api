import { Request, Response } from 'express';
import { validateId } from '../../connections';
import {
    CreateSoftskillSchema,
    DeleteSoftskillSchema,
    ReadSoftskillSchema,
    UpdateSoftskillSchema
} from '../../@types';
import {
    createSoftskill,
    deleteSoftskill,
    findSoftskillById,
    getAllSoftskills,
    updateSoftskill,
    validateSoftskillNotExist
} from '../../services/softskillsService';

export class SoftskillController {
    async softskills(request: Request, response: Response) {
        const softskills = await getAllSoftskills();

        return response
            .status(200)
            .json(softskills);
    }

    async create(request: Request<CreateSoftskillSchema['body']>, response: Response) {
        const { body }: CreateSoftskillSchema = request;
        const { softskill_name } = body;

        await validateSoftskillNotExist(softskill_name);

        const softskill = await createSoftskill(body);

        return response
            .status(201)
            .json({
                softskill,
                message: 'Competência adicionada com sucesso!'
            });
    }

    async update(request: Request<UpdateSoftskillSchema['params']>, response: Response) {
        const { id } = request.params;
        const { body }: UpdateSoftskillSchema = request;
        const { softskill_name } = body;

        validateId(id);
        await validateSoftskillNotExist(softskill_name);

        const existingSoftskill = await findSoftskillById(id);
        const updatedSoftskill = await updateSoftskill(existingSoftskill, softskill_name);

        return response
            .status(200)
            .json({
                softskill: updatedSoftskill,
                message: 'Competência atualizada com sucesso!'
            });
    }

    async delete(request: Request<DeleteSoftskillSchema['params']>, response: Response) {
        const { id } = request.params;

        validateId(id);

        const existingSoftskill = await findSoftskillById(id);
        const existingSoftskillId = existingSoftskill.id as string;
        const deletedSoftskill = await deleteSoftskill({ id: existingSoftskillId });

        return response
            .status(200)
            .json({
                softskill: deletedSoftskill,
                message: 'Competência deletada com sucesso!'
            });
    }

    async find(request: Request<ReadSoftskillSchema['params']>, response: Response) {
        const { id } = request.params;

        validateId(id);

        const softskill = await findSoftskillById(id);

        return response
            .status(200)
            .json(softskill);
    }
}
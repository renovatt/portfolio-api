import { Request, Response } from 'express';
import { validateId } from '../../connections';
import {
    CreateProfileSchema,
    DeleteProfileSchema,
    UpdateProfileSchema
} from '../../@types';
import {
    createProfile,
    deleteProfile,
    findProfileById,
    getAllProfile,
    updateProfile
} from '../../services/profileService';

export class ProfileController {
    async profile(request: Request, response: Response) {
        const profile = await getAllProfile();

        return response
            .status(200)
            .json(profile);
    }

    async create(request: Request<CreateProfileSchema['body']>, response: Response) {
        const { body }: CreateProfileSchema = request;

        const profile = await createProfile(body);

        return response
            .status(201)
            .json({
                profile,
                message: 'Perfil adicionado com sucesso!'
            });
    }

    async update(request: Request<UpdateProfileSchema['params']>, response: Response) {
        const { id } = request.params;
        const { body }: UpdateProfileSchema = request;

        validateId(id);

        const existingProfile = await findProfileById(id);
        const updatedProfile = await updateProfile(existingProfile, body);

        return response
            .status(200)
            .json({
                profile: updatedProfile,
                message: 'Perfil atualizado com sucesso!'
            });
    }

    async delete(request: Request<DeleteProfileSchema['params']>, response: Response) {
        const { id } = request.params;

        validateId(id);

        const existingProfile = await findProfileById(id);
        const existingProfileId = existingProfile.id as string;
        const deletedProfile = await deleteProfile({ id: existingProfileId });

        return response
            .status(200)
            .json({
                profile: deletedProfile,
                message: 'Perfil deletado com sucesso!'
            });
    }
}
import { z } from 'zod';
import {
    createSoftskillSchema,
    deleteSoftskillSchema,
    getSoftskillSchema,
    updateSoftskillSchema
} from '../zod/softskillSchema';
import {
    createSkillSchema,
    deleteSkillSchema,
    getSkillSchema,
    updateSkillSchema
} from '../zod/skillSchema';
import {
    createProjectSchema,
    deleteProjectSchema,
    getProjectSchema,
    updateProjectSchema
} from '../zod/projectSchema';
import {
    createProfileSchema,
    deleteProfileSchema,
    getProfileSchema,
    updateProfileSchema
} from '../zod/profileSchema';

export type CreateProfileSchema = z.infer<typeof createProfileSchema>;
export type ReadProfileSchema = z.infer<typeof getProfileSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type DeleteProfileSchema = z.infer<typeof deleteProfileSchema>;

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type ReadProjectSchema = z.infer<typeof getProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
export type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>;

export type CreateSkillSchema = z.infer<typeof createSkillSchema>;
export type ReadSkillSchema = z.infer<typeof getSkillSchema>;
export type UpdateSkillSchema = z.infer<typeof updateSkillSchema>;
export type DeleteSkillSchema = z.infer<typeof deleteSkillSchema>;

export type CreateSoftskillSchema = z.infer<typeof createSoftskillSchema>;
export type ReadSoftskillSchema = z.infer<typeof getSoftskillSchema>;
export type UpdateSoftskillSchema = z.infer<typeof updateSoftskillSchema>;
export type DeleteSoftskillSchema = z.infer<typeof deleteSoftskillSchema>;
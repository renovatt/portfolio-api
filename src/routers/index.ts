import { Router } from 'express';
import { ProjectController } from '../controllers/projects';
import { SkillController } from '../controllers/skills';
import { SoftskillController } from '../controllers/softskills';
import { schemaValition } from '../middlewares/schemaValidator';
import {
    createSoftskillSchema,
    deleteSoftskillSchema,
    updateSoftskillSchema
} from '../zod/softskillSchema';
import {
    createSkillSchema,
    deleteSkillSchema,
    updateSkillSchema
} from '../zod/skillSchema';
import {
    createProjectSchema,
    deleteProjectSchema,
    updateProjectSchema
} from '../zod/projectSchema';
import { ProfileController } from '../controllers/profile';
import {
    createProfileSchema,
    deleteProfileSchema,
    updateProfileSchema
} from '../zod/profileSchema';

const router = Router();

const profile = new ProfileController().profile;
const createProfile = new ProfileController().create;
const updateProfile = new ProfileController().update;
const deleteProfile = new ProfileController().delete;

const projects = new ProjectController().projects;
const createProjects = new ProjectController().create;
const updateProjects = new ProjectController().update;
const deleteProjects = new ProjectController().delete;

const skills = new SkillController().skills;
const createSkills = new SkillController().create;
const updateSkills = new SoftskillController().update;
const deleteSkills = new SkillController().delete;

const softskills = new SoftskillController().softskills;
const createSoftskills = new SoftskillController().create;
const updateSoftskills = new SoftskillController().update;
const deleteSoftskills = new SoftskillController().delete;

router.get('/profile', profile);
router.post('/profile', schemaValition(createProfileSchema), createProfile);
router.put('/profile/:id', schemaValition(updateProfileSchema), updateProfile);
router.delete('/profile/:id', schemaValition(deleteProfileSchema), deleteProfile);

router.get('/projects', projects);
router.post('/projects', schemaValition(createProjectSchema), createProjects);
router.put('/projects/:id', schemaValition(updateProjectSchema), updateProjects);
router.delete('/projects/:id', schemaValition(deleteProjectSchema), deleteProjects);

router.get('/skills', skills);
router.post('/skills', schemaValition(createSkillSchema), createSkills);
router.put('/skills/:id', schemaValition(updateSkillSchema), updateSkills);
router.delete('/skills/:id', schemaValition(deleteSkillSchema), deleteSkills);

router.get('/softskills', softskills);
router.post('/softskills', schemaValition(createSoftskillSchema), createSoftskills);
router.put('/softskills/:id', schemaValition(updateSoftskillSchema), updateSoftskills);
router.delete('/softskills/:id', schemaValition(deleteSoftskillSchema), deleteSoftskills);

export { router };
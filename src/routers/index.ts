import { Router } from 'express';
import { ProfileController } from '../controllers/profile';
import { ProjectController } from '../controllers/projects';
import { SkillController } from '../controllers/skills';
import { SoftskillController } from '../controllers/softskills';
import { schemaValition } from '../middlewares/schemaValidator';
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

const router = Router();

const profile = new ProfileController().profile;
const createProfile = new ProfileController().create;
const updateProfile = new ProfileController().update;
const deleteProfile = new ProfileController().delete;
const getProfile = new ProfileController().find;

const projects = new ProjectController().projects;
const createProject = new ProjectController().create;
const updateProject = new ProjectController().update;
const deleteProject = new ProjectController().delete;
const getProject = new ProjectController().find;

const skills = new SkillController().skills;
const createSkill = new SkillController().create;
const updateSkill = new SkillController().update;
const deleteSkill = new SkillController().delete;
const getSkill = new SkillController().find;

const softskills = new SoftskillController().softskills;
const createSoftskill = new SoftskillController().create;
const updateSoftskill = new SoftskillController().update;
const deleteSoftskill = new SoftskillController().delete;
const getSoftskill = new SoftskillController().find;

router.get('/profile', profile);
router.post('/profile', schemaValition(createProfileSchema), createProfile);
router.get('/profile/:id', schemaValition(getProfileSchema), getProfile);
router.put('/profile/:id', schemaValition(updateProfileSchema), updateProfile);
router.delete('/profile/:id', schemaValition(deleteProfileSchema), deleteProfile);

router.get('/projects', projects);
router.post('/projects', schemaValition(createProjectSchema), createProject);
router.get('/projects/:id', schemaValition(getProjectSchema), getProject);
router.put('/projects/:id', schemaValition(updateProjectSchema), updateProject);
router.delete('/projects/:id', schemaValition(deleteProjectSchema), deleteProject);

router.get('/skills', skills);
router.post('/skills', schemaValition(createSkillSchema), createSkill);
router.get('/skills/:id', schemaValition(getSkillSchema), getSkill);
router.put('/skills/:id', schemaValition(updateSkillSchema), updateSkill);
router.delete('/skills/:id', schemaValition(deleteSkillSchema), deleteSkill);

router.get('/softskills', softskills);
router.post('/softskills', schemaValition(createSoftskillSchema), createSoftskill);
router.get('/softskills/:id', schemaValition(getSoftskillSchema), getSoftskill);
router.put('/softskills/:id', schemaValition(updateSoftskillSchema), updateSoftskill);
router.delete('/softskills/:id', schemaValition(deleteSoftskillSchema), deleteSoftskill);

export { router };
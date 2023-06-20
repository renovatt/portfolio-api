import { Router } from 'express';
import { ProjectController } from '../controllers/projects';
import { SkillsController } from '../controllers/skills';
import { SoftskillsController } from '../controllers/softskills';

const router = Router();

const projects = new ProjectController().projects;
const createProjects = new ProjectController().create;
const updateProjects = new ProjectController().update;
const deleteProjects = new ProjectController().delete;

const skills = new SkillsController().skills;
const createSkills = new SkillsController().create;
const updateSkills = new SoftskillsController().update;
const deleteSkills = new SkillsController().delete;

const softskills = new SoftskillsController().softskills;
const createSoftskills = new SoftskillsController().create;
const updateSoftskills = new SoftskillsController().update;
const deleteSoftskills = new SoftskillsController().delete;

router.get('/projects', projects);
router.post('/projects', createProjects);
router.put('/projects/:id', updateProjects);
router.delete('/projects/:id', deleteProjects);

router.get('/skills', skills);
router.post('/skills', createSkills);
router.put('/skills/:id', updateSkills);
router.delete('/skills/:id', deleteSkills);

router.get('/softskills', softskills);
router.post('/softskills', createSoftskills);
router.put('/softskills/:id', updateSoftskills);
router.delete('/softskills/:id', deleteSoftskills);

export { router };
import { Router } from 'express';
import { ProjectController } from '../controllers/projects';

const router = Router();

const projects = new ProjectController().projects;
const createProjects = new ProjectController().create;
const updateProjects = new ProjectController().update;
const deleteProjects = new ProjectController().delete;

router.get('/projects', projects);
router.post('/projects', createProjects);
router.put('/projects/:id', updateProjects);
router.delete('/projects/:id', deleteProjects);

export { router };
import { Router } from 'express';
import { ProjectController } from '../controllers/projects';

const router = Router();

const createProjects = new ProjectController().create;
const projects = new ProjectController().projects;

router.get('/projects', projects);
router.post('/projects', createProjects);

export { router };
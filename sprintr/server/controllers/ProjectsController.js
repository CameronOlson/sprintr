import { projectsService } from '../services/ProjectsService.js'
import BaseController from '../utils/BaseController.js'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .get('', this.getProjects)
  }

  async getProjects(req, res, next) {
    try {
      const projects = await projectsService.getProjects(req.query)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }
}

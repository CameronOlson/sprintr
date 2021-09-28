import { AppState } from '../AppState'
import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectsService {
  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log('res from project creation', res)
  }

  async getProjects() {
    const res = await api.get('api/projects')
    logger.log(res)
    AppState.projects = res.data.map(p => new Project(p))
    logger.log(AppState.projects)
  }
}
export const projectsService = new ProjectsService()

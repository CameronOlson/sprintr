import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectsService {
  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log('res from project creation', res)
  }
}
export const projectsService = new ProjectsService()

import { AppState } from '../AppState'
import { Project } from '../models/Project'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProjectsService {
  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log('res from project creation', res.data)
    AppState.projects.unshift(new Project(res.data))
  }

  async getProjects() {
    const res = await api.get('api/projects')
    logger.log('this is the getProjects', res.data)
    AppState.projects = res.data.map(p => new Project(p))
    logger.log(AppState.projects)
  }

  async getProjectById(projectId) {
    const res = await api.get('api/projects/' + projectId)
    logger.log('this is the getProjectsById', res.data)
    AppState.project = res.data
    logger.log(AppState.project)
  }
}
export const projectsService = new ProjectsService()

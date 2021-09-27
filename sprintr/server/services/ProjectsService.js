import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ProjectsService {
  async getProjects(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name')
    if (!projects) {
      throw new BadRequest('no matching project')
    }
    return projects
  }
}
export const projectsService = new ProjectsService()

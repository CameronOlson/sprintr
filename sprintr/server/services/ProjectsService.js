import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectsService {
  async removeProject(projectId, userId) {
    const project = await this.getProjectById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden("you aren't allowed to do that!!")
    }
    await project.delete()
    return project
  }

  async editProject(projectId, userId, projectData) {
    const project = await this.getProjectById(projectId)
    if (userId !== project.creatorId.toString()) {
      throw new Forbidden("you aren't allowed to do that!")
    }
    project.name = projectData.name || project.name
    project.description = projectData.description || project.description
    await project.save()
    return project
  }

  async createProject(projectData) {
    const project = await dbContext.Projects.create(projectData)
    await project.populate('creator', 'name')
    if (!project) {
      throw new BadRequest('there is no project ')
    }
    return project
  }

  async getProjectById(projectId) {
    const project = await dbContext.Projects.findById(projectId)
    if (!project) {
      throw new BadRequest('this is not the right project ID')
    }
    return project
  }

  async getProjects(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name')
    if (!projects) {
      throw new BadRequest('no matching project')
    }
    return projects
  }
}
export const projectsService = new ProjectsService()

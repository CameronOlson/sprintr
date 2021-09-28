import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintsService {
  async removeSprint(sprintId, userId) {
    const sprint = await this.getSprintById(sprintId)
    if (userId !== sprint.creatorId.toString()) {
      throw new Forbidden('this is not your sprint!!')
    }
    await sprint.delete()
    return sprint
  }

  async editSprint(sprintId, userId, sprintData) {
    const sprint = await this.getSprintById(sprintId)
    if (userId !== sprint.creatorId.toString()) {
      throw new Forbidden('this is not your sprint!!')
    }
    sprint.name = sprintData.name || sprint.name
    sprint.startDate = sprintData.startDate || sprint.startDate
    sprint.endDate = sprintData.endDate || sprint.endDate
    await sprint.save()
    return sprint
  }

  async createSprint(sprintData) {
    const sprint = await dbContext.Sprints.create(sprintData)
    return sprint
  }

  async getSprintById(sprintId) {
    const sprint = await dbContext.Sprints.findById(sprintId)
    if (!sprint) {
      throw new BadRequest('no sprint found')
    }
    return sprint
  }

  async getSprints() {
    const sprints = await dbContext.Sprints.find()
    if (!sprints) {
      throw new BadRequest('no sprints found')
    }
    return sprints
  }
}
export const sprintsService = new SprintsService()

import { dbContext } from '../db/DbContext'

class SprintsService {
  async getSprints() {
    const sprints = await dbContext.Sprints.find()
    return sprints
  }
}
export const sprintsService = new SprintsService()

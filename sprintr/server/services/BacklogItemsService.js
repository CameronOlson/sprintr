import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BacklogItemsService {
  async getBacklogItems() {
    const backlogItems = await dbContext.BacklogItems.find()
    if (!backlogItems) {
      throw new BadRequest('no matching BacklogItems')
    }
    return backlogItems
  }
}
export const backlogItemsService = new BacklogItemsService()

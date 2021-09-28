import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BacklogItemsService {
  async removeBacklogItem(backlogItemId, userId) {
    const backlogItem = await this.getBacklogItemById(backlogItemId)
    if (userId !== backlogItem.creatorId.toString()) {
      throw new Forbidden('You do not have that authority')
    }
    await backlogItem.delete()
    return backlogItem
  }

  async editBacklogItem(backlogItemId, userId, backlogItemData) {
    const backlogItem = await this.getBacklogItemById(backlogItemId)
    if (userId !== backlogItem.creatorId.toString()) {
      throw new Forbidden("you can't dp that")
    }
    backlogItem.name = backlogItemData.name || backlogItem.name
    backlogItem.description = backlogItemData.description || backlogItem.description
    backlogItem.status = backlogItemData.status || backlogItem.status
    backlogItem.sprintId = backlogItemData.sprintId || backlogItem.sprintId

    await backlogItem.save()
    return backlogItem
  }

  async getBacklogItemById(backlogItemId) {
    const backlogItem = await dbContext.BacklogItems.findById(backlogItemId)
    if (!backlogItem) {
      throw new BadRequest('no backlog item found by that ID')
    }
    return backlogItem
  }

  async getBacklogItemsByProjectId(projectId) {
    const backlogItems = await dbContext.BacklogItems.find({ projectId })
    if (!backlogItems) {
      throw new BadRequest('no matching BacklogItems')
    }
    return backlogItems
  }

  async createBacklogItem(backlogItemData) {
    const backlogItem = await dbContext.BacklogItems.create(backlogItemData)
    return backlogItem
  }
}
export const backlogItemsService = new BacklogItemsService()

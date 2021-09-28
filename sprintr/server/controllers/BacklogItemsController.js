import { backlogItemsService } from '../services/BacklogItemsService.js'
import BaseController from '../utils/BaseController.js'

export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/backlogItems')
    this.router
      .get('', this.getBacklogItems)
  }

  async getBacklogItems(req, res, next) {
    try {
      const backlogItems = await backlogItemsService.getBacklogItems()
      res.send(backlogItems)
    } catch (error) {
      next(error)
    }
  }
}

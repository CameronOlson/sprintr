import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogItemsService } from '../services/BacklogItemsService.js'
import BaseController from '../utils/BaseController.js'

export class BacklogItemsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/backlogItems')
    this.router
      .get('', this.getBacklogItems)
      .get('/:backlogItemId', this.getBacklogItemById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBacklogItem)
      .put('/:backlogItemId', this.editBacklogItem)
      .delete('/:backlogItemId', this.removeBacklogItem)
  }

  async removeBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.removeBacklogItem(req.params.backlogItemId, req.userInfo.id)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async editBacklogItem(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.editBacklogItem(req.params.backlogItemId, req.userInfo.id, req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async createBacklogItem(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const backlogItem = await backlogItemsService.createBacklogItem(req.body)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogItemById(req, res, next) {
    try {
      const backlogItem = await backlogItemsService.getBacklogItemById(req.params.backlogItemId)
      res.send(backlogItem)
    } catch (error) {
      next(error)
    }
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

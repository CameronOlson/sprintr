import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService'
import BaseController from '../utils/BaseController'

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
      .get('', this.getSprints)
      .get('/:sprintId', this.getSprintById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createSprint)
      .put('/:sprintId', this.editSprint)
      .delete('/:sprintId', this.removeSprint)
  }

  async removeSprint(req, res, next) {
    try {
      const sprint = await sprintsService.removeSprint(req.params.sprintId, req.userInfo.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async editSprint(req, res, next) {
    try {
      const sprint = await sprintsService.editSprint(req.params.sprintId, req.userInfo.id, req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async createSprint(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.createSprint(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getSprintById(req, res, next) {
    try {
      const sprint = await sprintsService.getSprintById(req.params.sprintId)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async getSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getSprints(req.params.projectId)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }
}

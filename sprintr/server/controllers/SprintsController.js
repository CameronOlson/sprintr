import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService'
import BaseController from '../utils/BaseController'

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
      .get('', this.getSprints)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async getSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getSprints()
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }
}

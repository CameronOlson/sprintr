import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .get('', this.getNotes)
  }

  async getNotes(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}

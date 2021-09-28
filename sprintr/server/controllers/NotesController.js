import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .get('', this.getNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotes(req.params.projectId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }
}

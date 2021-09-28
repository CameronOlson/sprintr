import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .get('', this.getNotes)
      .get('/:noteId', this.getNoteById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)
      .put('/:noteId', this.editNote)
      .delete('/:noteId', this.removeNote)
  }

  async removeNote(req, res, next) {
    try {
      const note = await notesService.removeNote(req.params.noteId, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getNoteById(req, res, next) {
    try {
      const note = await notesService.getNoteById(req.params.noteId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      const note = await notesService.editNote(req.params.noteId, req.userInfo.id, req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
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

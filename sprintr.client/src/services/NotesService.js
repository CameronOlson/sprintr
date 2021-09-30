import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async createNote(projectId, noteData) {
    const res = await api.post('api/projects/' + projectId + '/notes', noteData)
    logger.log('create notes', res.data)
    AppState.notes.push(res.data)
  }

  async getNotes(projectId) {
    const res = await api.get('api/projects/' + projectId + '/notes')
    logger.log('get notes', res.data)
    AppState.notes = res.data
  }

  async removeNote(projectId, noteId) {
    const res = await api.delete('api/projects/' + projectId + '/notes/' + noteId)
    logger.log('res from remove note', res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}
export const notesService = new NotesService()

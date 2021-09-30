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
}
export const notesService = new NotesService()

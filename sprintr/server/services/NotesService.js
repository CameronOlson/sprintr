import { dbContext } from '../db/DbContext'

class NotesService {
  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    return note
  }

  async getNotes(projectId) {
    const notes = await dbContext.Notes.find({ projectId })
    return notes
  }
}

export const notesService = new NotesService()

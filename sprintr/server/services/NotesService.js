import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async removeNote(noteId, userId) {
    const note = await this.getNoteById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('this is not your note, bruh')
    }
    await note.delete()
    return note
  }

  async editNote(noteId, userId, noteData) {
    const note = await this.getNoteById(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden("this isn't your note, amigo")
    }
    note.body = noteData.body || note.body
    await note.save()
    return note
  }

  async getNoteById(noteId) {
    const note = await dbContext.Notes.findById(noteId).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('no note found')
    }
    return note
  }

  async createNote(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note.populate('creator', 'name picture')
    return note
  }

  async getNotes(projectId) {
    const notes = await dbContext.Notes.find({ projectId }).populate('creator', 'name picture')
    return notes
  }
}

export const notesService = new NotesService()

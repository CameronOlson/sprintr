import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    // NOTE VVV this is the local field
    backlogItemId: { type: Schema.Types.ObjectId, required: true, ref: 'BacklogItem' },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)
NoteSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})
NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
NoteSchema.virtual('backlogItem', {
  localField: 'backlogItemId',
  //              vvv this is assigned when you get the Note
  foreignField: '_id',
  ref: 'BacklogItem',
  justOne: true
})

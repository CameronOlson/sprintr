import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BacklogItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Review', 'Done'],
      required: true
    },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    // REVIEW this might need to change
    sprintId: { type: Schema.Types.ObjectId, ref: 'Sprint', required: false },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
BacklogItemSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})
BacklogItemSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
BacklogItemSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  ref: 'Sprint',
  justOne: true
})

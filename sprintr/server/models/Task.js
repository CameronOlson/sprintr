import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    backlogItemId: { type: Schema.Types.ObjectId, ref: 'BacklogItem', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    isComplete: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

TaskSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: 'Project',
  justOne: true
})
TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
TaskSchema.virtual('backlogItem', {
  localField: 'backlogItemId',
  //              vvv this is assigned when you get the Note
  foreignField: '_id',
  ref: 'BacklogItem',
  justOne: true
})

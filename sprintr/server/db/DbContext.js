import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { BacklogItemSchema } from '../models/BacklogItem'
import { NoteSchema } from '../models/Note'
import { ProjectSchema } from '../models/Project'
import { SprintSchema } from '../models/Sprint'
import { TaskSchema } from '../models/Task'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  // REVIEW we might need the account on this, maybe
  Projects = mongoose.model('Project', ProjectSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
  BacklogItems = mongoose.model('BacklogItem', BacklogItemSchema);

  Notes = mongoose.model('Note', NoteSchema);
  Tasks = mongoose.model('Task', TaskSchema)
}

export const dbContext = new DbContext()

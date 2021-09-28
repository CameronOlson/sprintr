import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TasksService {
  async editTask(taskId, userId, taskData) {
    const task = await this.getTaskById(taskId)
    if (userId !== task.creatorId.toString()) {
      throw new Forbidden("this isn't your task, boy!")
    }
    task.name = taskData.name || task.name
    task.weight = taskData.weight || task.weight
    task.isComplete = taskData.isComplete || task.isComplete
    await task.save()
    return task
  }

  async removeTask(taskId, userId) {
    const task = await this.getTaskById(taskId)
    if (userId !== task.creatorId.toString()) {
      throw new Forbidden('you can not do that')
    }
    await task.delete()
    return task
  }

  async createTask(taskData) {
    const task = await dbContext.Tasks.create(taskData)
    await task.populate('creator', 'name picture')
    return task
  }

  async getTaskById(taskId) {
    const task = await dbContext.Tasks.findById(taskId).populate('creator', 'name picture')
    if (!task) {
      throw new BadRequest('task not found')
    }
    return task
  }

  async getTasks(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId }).populate('creator', 'name picture')
    return tasks
  }
}

export const tasksService = new TasksService()

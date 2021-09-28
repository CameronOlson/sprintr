import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .get('', this.getTasks)
      .get('/:taskId', this.getTaskById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
      .put('/:taskId', this.editTask)
      .delete('/:taskId', this.removeTask)
  }

  async editTask(req, res, next) {
    try {
      const task = await tasksService.editTask(req.params.taskId, req.userInfo.id, req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async removeTask(req, res, next) {
    try {
      const task = await tasksService.removeTask(req.params.taskId, req.userInfo.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.createTask(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await tasksService.getTaskById(req.params.taskId)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await tasksService.getTasks(req.params.projectId)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }
}

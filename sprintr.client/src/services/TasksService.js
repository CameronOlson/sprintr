import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async createTask(projectId, taskData) {
    const res = await api.post('api/projects/' + projectId + '/tasks/', taskData)
    logger.log('this is the res of the create task', res.data)
    AppState.tasks.push(res.data)
  }

  async getTasks(projectId) {
    const res = await api.get('api/projects/' + projectId + '/tasks/')
    logger.log('get tasks', res.data)
    AppState.tasks = res.data
  }

  async removeTask(projectId, taskId) {
    const res = await api.delete('api/projects/' + projectId + '/tasks/' + taskId)
    logger.log('remove this task', res.data)

    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }
}
export const tasksService = new TasksService()

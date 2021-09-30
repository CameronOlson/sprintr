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
    logger.log('this is getting tasks from TasksService', res.data)
    AppState.tasks = res.data
  }

  async findWeight(backlogItemId, tasksArr) {
    let sum = 0
    for (let i = 0; i <= tasksArr.length; i++) {
      const task = tasksArr[i]

      if (task.backlogItemId === backlogItemId) {
        sum += task.weight
      }
    }
    logger.log('this is the findweight total', sum)
    return sum
  }
}
export const tasksService = new TasksService()

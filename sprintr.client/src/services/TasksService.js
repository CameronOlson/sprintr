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

  async findWeight(backlogItemId) {
    const tasksArr = AppState.tasks
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

  async removeTask(projectId, taskId) {
    const res = await api.delete('api/projects/' + projectId + '/tasks/' + taskId)
    logger.log('remove this task', res.data)

    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }

  async toggleCheck(projectId, taskId, boolean) {
    console.log(!boolean)
    boolean = !boolean
    const res = await api.put('api/projects/' + projectId + '/tasks/' + taskId, { isComplete: boolean })
    logger.log('check mark res', res.data.isComplete)

    const i = AppState.tasks.findIndex(t => t.id === taskId)
    AppState.tasks.splice(i, 1, res.data)
    AppState.tasks = [...AppState.tasks]
  }
}
export const tasksService = new TasksService()

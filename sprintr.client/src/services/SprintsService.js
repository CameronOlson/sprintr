import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async getSprintsById(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    logger.log('this is the res from getting sprints', res.data)
    AppState.sprints = res.data
  }

  async createSprint(projectId, sprintData) {
    const res = await api.post('api/projects/' + projectId + '/sprints', sprintData)
    logger.log('this is from the sprint creator', res.data)
    AppState.sprints.push(res.data)
    return res.data.id
  }

  async getSprintById(projectId, sprintId) {
    const res = await api.get('api/projects/' + projectId + '/sprints/' + sprintId)
    logger.log('get single sprint res', res.data)
    AppState.sprint = res.data
  }

  async deleteSprint(projectId, sprintId) {
    const res = await api.delete('api/projects/' + projectId + '/sprints/' + sprintId)
    logger.log('this is the sprint delete', res)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)
    AppState.sprint = null
  }

  async getBacklogItemsBySprintId(projectId, sprintId) {
    const res = await api.get('api/projects/' + projectId + '/backlog')
    logger.log('res from get backlogs by sprintId', res.data)
    AppState.backlogItems = res.data
    AppState.backlogItems = AppState.backlogItems.filter(b => b.sprintId === sprintId)
  }
}
export const sprintsService = new SprintsService()

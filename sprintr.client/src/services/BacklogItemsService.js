import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BacklogItemsService {
  async createBacklogItem(projectId, backlogItemData) {
    const res = await api.post('api/projects/' + projectId + '/backlog', backlogItemData)
    logger.log('create BLI res', res.data)
    AppState.backlogItems.push(res.data)
  }

  async getBacklogItemsByProjectId(projectId) {
    const res = await api.get('api/projects/' + projectId + '/backlog')
    logger.log('this is the res from the BacklogItemsService client Side', res.data)
    AppState.backlogItems = res.data
  }

  async removeBacklogItem(projectId, backlogItemId) {
    const res = await api.delete('api/projects/' + projectId + '/backlog/' + backlogItemId)
    logger.log('this is the res from the remove backlog items', res)
    AppState.backlogItems = AppState.backlogItems.filter(b => b.id !== backlogItemId)
  }

  async addBacklogItemToSprint(sprintId, backlogItemId, projectId) {
    const res = await api.put('api/projects/' + projectId + '/backlog/' + backlogItemId, { sprintId: sprintId })
    logger.log('add BLI to sprint res', res.data)
  }

  async pendingBacklogItemById(projectId, backlogItemId) {
    const res = await api.put('api/projects/' + projectId + '/backlog/' + backlogItemId, { status: 'pending' })
    logger.log('add pending to the backlog item res', res.data)
  }
}
export const backlogItemsService = new BacklogItemsService()

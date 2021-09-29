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
}
export const backlogItemsService = new BacklogItemsService()

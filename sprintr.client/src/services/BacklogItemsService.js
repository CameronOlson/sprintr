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
}
export const backlogItemsService = new BacklogItemsService()

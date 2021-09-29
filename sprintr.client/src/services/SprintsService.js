import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async getSprintsById(projectId) {
    const res = await api.get('api/projects/' + projectId + '/sprints')
    logger.log('this is the res from getting sprints', res.data)
    AppState.sprints = res.data
  }
}
export const sprintsService = new SprintsService()

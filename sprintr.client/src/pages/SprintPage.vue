<template>
  <div v-if="sprint" class="container-fluid">
    <div class="row">
      <h1>{{ sprint.name }}</h1>
    </div>
  </div>
  <div v-else class="container-fluid">
    <div class="row">
      <h1>LOADING</h1>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      AppState.sprint = null
    })
    watchEffect(async() => {
      if (route.params.sprintId) {
        try {
          await sprintsService.getSprintById(route.params.id, route.params.sprintId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      sprint: computed(() => AppState.sprint)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <BacklogItem v-for="b in backlogItems" :key="b" :backlog-item="b" />
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      AppState.backlogItems = []
    })
    watchEffect(async() => {
      if (route.params.id) {
        try {
          await backlogItemsService.getBacklogItemsByProjectId(route.params.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      backlogItems: computed(() => AppState.backlogItems)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

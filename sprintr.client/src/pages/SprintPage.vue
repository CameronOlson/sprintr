<template>
  <div class="container-fluid">
    <div class="row">
      <h1>{{ sprint.name }}</h1>
    </div>
  </div>
</template>

<script>
import { onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { sprintsService } from '../services/SprintsService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      AppState.sprint = null
    })
    watchEffect(async() => {
      if (route.params.id) {
        try {
          await sprintsService.
        } catch (error) {

        }
      }
    })
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>

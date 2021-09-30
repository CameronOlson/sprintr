<template>
  <p>{{ }}</p>
</template>

<script>
import { onMounted, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { tasksService } from '../services/TasksService'
import { AppState } from '../AppState'
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // onMounted(async() => {
    //   try {
    //     const sum = await tasksService.findWeight(props.backlogItem.id)
    //     return sum
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    // })
    watchEffect(async() => {
      if (AppState.tasks) {
        try {
          await tasksService.findWeight(props.backlogItem.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

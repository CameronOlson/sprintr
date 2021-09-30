<template>
  <p>{{ }}</p>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { tasksService } from '../services/TasksService'
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(async() => {
      try {
        const sum = await tasksService.findWeight(props.backlogItem.id, AppState.tasks)
        return sum
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

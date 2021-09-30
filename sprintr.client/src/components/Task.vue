<template>
  <li v-if="task.backlogItemId === backlogItem.id">
    {{ task.name }} Weight: {{ task.weight }} <i v-if="account.id === task.creatorId" @click="removeTask()" class="mdi mdi-delete selectable"></i>
  </li>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tasksService } from '../services/TasksService'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async removeTask() {
        try {
          if (await Pop.confirm) {
            await tasksService.removeTask(route.params.id, props.task.id)
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <li v-if="task.backlogItemId === backlogItem.id">
    <p>
      <input type="checkbox" @click.prevent="toggleCheck()" :checked="editable">
      {{ task.name }} Weight: {{ task.weight }} <i v-if="account.id === task.creatorId" @click="removeTask()" class="mdi mdi-delete selectable"></i>
    </p>
  </li>
<!-- v-if="task.isComplete ? 'checked' : ''" -->
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
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
    const editable = ref(props.task.isComplete)
    const route = useRoute()
    return {
      editable,
      account: computed(() => AppState.account),
      async removeTask() {
        if (await Pop.confirm()) {
          try {
            if (await Pop.confirm) {
              await tasksService.removeTask(route.params.id, props.task.id)
            }
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      },
      async toggleCheck() {
        try {
          await tasksService.toggleCheck(route.params.id, props.task.id, props.task)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      tasks: computed(() => AppState.tasks)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

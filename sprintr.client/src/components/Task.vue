<template>
  <div v-if="task.backlogItemId === backlogItem.id">
    <div class="move-out" @click.prevent="toggleCheck()">
      <span v-if="task.isComplete === true" class="mdi mdi-checkbox-multiple-marked selectable"></span>
      <span v-else class="mdi mdi-checkbox-multiple-blank-outline selectable"></span>
      <div>
        {{ task.name }}
      </div>
      <div>
        Weight: {{ task.weight }}
      </div>
      <i v-if="account.id === task.creatorId" @click="removeTask()" class="mdi mdi-delete selectable"></i>
    </div>
  </div>
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
            await tasksService.removeTask(route.params.id, props.task.id)
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      },
      async toggleCheck() {
        if (AppState.account.id === props.task.creatorId) {
          try {
            await tasksService.toggleCheck(route.params.id, props.task.id, props.task)
          } catch (error) {
            Pop.toast(error, 'error')
          }
        } else Pop.toast("This isn't your task, amigo")
      },
      tasks: computed(() => AppState.tasks),
      totalWeight: computed(() => AppState.tasks)

    }
  }
}
</script>

<style lang="scss" scoped>
.move-out{
  display: flex;
  justify-content: space-between;
}

</style>

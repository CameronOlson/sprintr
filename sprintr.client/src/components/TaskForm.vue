<template>
  <form @submit.prevent="createTask()">
    <span>

      <div class="form-group">
        <label for="name">
          <input type="text"
                 for="name"
                 class="form-control bg-light"
                 placeholder="Task Name"
                 v-model="editable.name"
                 required
          >
        </label>
      </div>
    </span>
    <span>
      <div class="form-group">
        <label for="weight">
          <input type="number"
                 for="weight"
                 class="form-control bg-light"
                 placeholder="Task Weight"
                 v-model="editable.weight"
                 required
          >
        </label>
      </div>
    </span>
    <button type="submit">
      Create Task
    </button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService'

export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const editable = ref({ backlogItemId: props.backlogItem.id })
    const route = useRoute()
    return {
      editable,
      async createTask() {
        await tasksService.createTask(route.params.id, editable.value)
        editable.value = { backlogItemId: props.backlogItem.id }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

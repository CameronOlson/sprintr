<template>
  <div class="component">
    <div class="card my-3">
      <span>
        <h5 class="card-header">
          {{ backlogItem.name }}
        </h5>
        <div class="dropdown">
          <a class="btn btn-primary"
             href="#collapseExample1"
             role="button"
             aria-expanded="false"
             aria-controls="collapseExample1"
             :data-bs-target="'#details-modal-' + backlogItem.id"
             data-bs-toggle="modal"
          >
            Details
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">

          </ul>
        </div>
        <button @click="removeBacklogItem(backlogItem.id)">
          Delete
        </button>
      </span>
      <span>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  @click="getSprintsById()"
          >
            Move to Sprint
          </button>
          <ul v-if="sprints" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <SprintList v-for="s in sprints" :key="s.id" :sprint="s" :backlog-item="backlogItem" />
          </ul>
          <ul v-else class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              Loading...
            </li>
          </ul>
        </div>
      </span>
      <div class="card-body">
        <h5 class="card-title">
          {{ backlogItem.description }}
        </h5>
        <p class="card-text">
          {{ backlogItem.status }}
        </p>
        <a class="btn btn-primary"
           href="#collapseExample1"
           role="button"
           aria-expanded="false"
           aria-controls="collapseExample1"
           :data-bs-target="'#task-modal-' + backlogItem.id"
           data-bs-toggle="modal"
        >
          Tasks
        </a>
        <div class="collapse" id="collapseExample1">
          <div class="card card-body">
            <ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <Modal :id="'task-modal-' + backlogItem.id">
      <template #modal-title>
        {{ backlogItem.name }}
      </template>
      <template #modal-body>
        <TaskForm :backlog-item="backlogItem" />
        <Task v-for="t in tasks" :key="t.id" :task="t" :backlog-item="backlogItem" />
      </template>
    </Modal>
    <Modal :id="'details-modal-' + backlogItem.id">
      <template #modal-title>
        {{ backlogItem.name }} Details
      </template>
      <template #modal-body>
        <DetailsForm :backlog-item="backlogItem" />
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import { sprintsService } from '../services/SprintsService'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup() {
    const editable = ref({})
    const route = useRoute()
    onMounted(async() => {
      try {
        await tasksService.getTasks(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      editable,
      async getSprintsById() {
        try {
          await sprintsService.getSprintsById(route.params.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async removeBacklogItem(backlogItemId) {
        try {
          await backlogItemsService.removeBacklogItem(route.params.id, backlogItemId)
          Pop.toast('this has been removed')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async pendingBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.pendingBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is pending')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async inProgressBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.inProgressBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is in progress')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async reviewBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.reviewBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is review')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async doneBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.doneBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is done')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },

      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

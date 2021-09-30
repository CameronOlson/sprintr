<template>
  <div class="component">
    <div class="col-10 m-auto">
      <div class="card my-3 p-3">
        <div class="card-header text-center">
          <span>
            <h2>
              {{ backlogItem.name }}
            </h2>
            <p class="card-text">
              {{ backlogItem.status }}
            </p>
          </span>
        </div>
        <div class="d-flex justify-content-space-between">
          <a class="mdi mdi-delete selectable f-20" @click="removeBacklogItem(backlogItem.id)">
          </a>
          <div class="dropdown">
            <button class="card-link dropdown-toggle"
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
        </div>
        <h5 class="card-title">
          {{ backlogItem.description }}
        </h5>
        <TaskWeight :backlog-item="backlogItem" />

        <div class="dropdown">
          <a class="card-link"
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

        <div class="card-body">
          <a class="card-link"
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
import { notesService } from '../services/NotesService'
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
    // onMounted(async() => {
    //   try {
    //     await tasksService.getTasks(route.params.id)
    //     await notesService.getNotes(route.params.id)
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    // })
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

      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks)

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

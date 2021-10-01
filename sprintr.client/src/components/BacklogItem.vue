<template>
  <div class="container-fluid">
    <div class="component">
      <div class="col-10 m-auto">
        <div class="card p-3 m-2">
          <div class="card-header text-center my-card">
            <span>
              <h2>
                {{ backlogItem.name }}
              </h2>
            </span>
          </div>
          <div class="my-card p-2">
            <h6 class="card-title">
              {{ backlogItem.description }}
            </h6>
          </div>
          <div class="my-card">
            <div v-if="account.id === backlogItem.creatorId">
              <a class="mdi mdi-delete selectable f-20" title="Delete Backlog Item" @click="removeBacklogItem(backlogItem.id)">
              </a>
            </div>
            <div v-if="account.id === backlogItem.creatorId">
              <span class="dropdown">
                <button class="btn btn-og card-link dropdown-toggle m-2"
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
              </span>
            </div>
            <div>
              <div>
                <p class="card-text">
                  Status: {{ backlogItem.status }}
                </p>
              </div>
              <TaskWeight :backlog-item="backlogItem" />
            </div>
            <div>
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
            </div>

            <div>
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
        {{ taskWeight }}
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
import { computed, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const editable = ref({})
    const route = useRoute()
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
        if (await Pop.confirm()) {
          try {
            await backlogItemsService.removeBacklogItem(route.params.id, backlogItemId)
            Pop.toast('this has been removed')
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      },
      account: computed(() => AppState.account),
      sprints: computed(() => AppState.sprints),
      tasks: computed(() => AppState.tasks),
      taskWeight: computed(() => {
        let weight = 0
        const backlogItemTasks = AppState.tasks.filter(t => t.backlogItemId === props.backlogItem.id)
        // eslint-disable-next-line no-return-assign
        backlogItemTasks.forEach(t => weight += t.weight)
        return weight
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.my-card{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-og{
display: inline-block;
color:aliceblue
}
.my-card{
  background-color: black;
  color: aliceblue;
}

</style>

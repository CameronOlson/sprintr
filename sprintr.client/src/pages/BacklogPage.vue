<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center py-2">
        <button class=" btn btn-og mb-2" type="button" data-bs-toggle="modal" data-bs-target="#backlog-form">
          Add Item
        </button>
      </div>
    </div>
  </div>
  <div class="row" v-if="backlogItems">
    <BacklogItem v-for="b in backlogItems" :key="b.id" :backlog-item="b" />
  </div>
  <div class="row" v-else>
    Loading.........
  </div>

  <Modal id="backlog-form">
    <template #modal-title>
      <h4>Backlog Form</h4>
    </template>
    <template #modal-body>
      <BacklogForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Pop'
import { tasksService } from '../services/TasksService'
import { notesService } from '../services/NotesService'
import { projectsService } from '../services/ProjectsService'
export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      AppState.backlogItems = []
    })
    watchEffect(async() => {
      if (route.params.id) {
        try {
          await backlogItemsService.getBacklogItemsByProjectId(route.params.id)
          await tasksService.getTasks(route.params.id)
          await notesService.getNotes(route.params.id)
          await projectsService.getProjectById(route.params.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      backlogItems: computed(() => AppState.backlogItems),
      account: computed(() => AppState.account),
      project: computed(() => AppState.project)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-black{
  background-color: #22333B;
  color:aliceblue;
}

.btn-og{
  display: inline-block;

  border: 2px solid aliceblue;
  border-radius: 0.12em;
  text-decoration: none;
  background-color: Transparent;
  background-repeat:no-repeat;
  color:aliceblue;
  font-family: 'Roboto',sans-serif;
  text-align: center;
  transition: all 0.2s;
  box-sizing: border-box;
}
.btn-og:hover{
  background-color: aliceblue;
  color:#000000;

}
.center-this{
  display: flex;
  align-items: center;
}

</style>

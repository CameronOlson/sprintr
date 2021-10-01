<template>
  <header v-if="project">
    <ul class="nav nav-tabs">
      <div class="d-flex">
        <div><i v-if="account.id === project.creatorId" class="mdi mdi-delete selectable f-20" title="Delete Project" @click="deleteProject()"></i></div>
        <div><h1>{{ project.name }}</h1></div>
      </div>
      <li class="nav-item">
        <router-link :to="{name: 'Project.Backlog'}">
          <a class="nav-link active" aria-current="page">Backlog</a>
        </router-link>
      </li>
      <SprintButton v-for="s in sprints" :key="s.id" :sprint="s" />
      <li class="nav-item" v-if="account.id == project.creatorId">
        <a class="nav-link active selectable" data-bs-toggle="modal" data-bs-target="#sprint-form" aria-current="page">New Sprint
          <i class="mdi mdi-plus">
          </i>
        </a>
      </li>
    </ul>
    <div v-if="account.id == project.creatorId">
    </div>
  </header>
  <header v-else>
    loading
  </header>
  <router-view />
  <footer>
    <Modal id="sprint-form">
      <template #modal-title>
        <h4>Sprint Form</h4>
      </template>
      <template #modal-body>
        <SprintForm />
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    onMounted(() => {
      AppState.project = null
    })
    watchEffect(async() => {
      if (route.params.id) {
        await projectsService.getProjectById(route.params.id)
        await sprintsService.getSprintsById(route.params.id)
      }
    })
    return {
      project: computed(() => AppState.project),
      sprints: computed(() => AppState.sprints),
      account: computed(() => AppState.account),
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.id)
            router.push({
              name: 'Home'
            })
            Pop.toast('Project has been deleted, baby')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async createSprint() {
        try {
          await sprintsService.createSprint(route.params.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>

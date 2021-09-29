<template>
  <header v-if="project">
    <ul class="nav nav-tabs">
      <h1>{{ project.name }}</h1>
      <li class="nav-item">
        <router-link :to="{name: 'Project.Backlog'}">
          <a class="nav-link active" aria-current="page">Backlog</a>
        </router-link>
      </li>
      <SprintButton v-for="s in sprints" :key="s" :sprint="s" />
    </ul>
    <div v-if="account.id == project.creatorId">
      <i class="mdi mdi-delete selectable" @click="deleteProject()"></i>
    </div>
  </header>
  <header v-else>
    loading
  </header>
  <router-view />
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
          await projectsService.deleteProject(route.params.id)
          router.push({
            name: 'Home'
          })
          Pop.toast('Project has been deleted, baby')
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

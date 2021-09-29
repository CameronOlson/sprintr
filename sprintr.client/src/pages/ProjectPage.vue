<template>
  <header v-if="project">
    <ul class="nav nav-tabs">
      <h1>{{ project.name }}</h1>
      <li class="nav-item">
        <router-link :to="{name: 'Project.Backlog'}">
          <a class="nav-link active" aria-current="page">Backlog</a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Project.Sprint'}">
          <a class="nav-link active" aria-current="page">Sprint</a>
        </router-link>
      </li>
    </ul>
  </header>
  <header v-else>
    loading
  </header>
  <router-view />
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { projectsService } from '../services/ProjectsService'
export default {
  name: 'Project',
  setup() {
    const route = useRoute()
    onMounted(() => {
      AppState.project = null
    })
    watchEffect(async() => {
      if (route.params.id) {
        await projectsService.getProjectById(route.params.id)
      }
    })
    return {
      project: computed(() => AppState.project)
    }
  }
}
</script>

<style>

</style>

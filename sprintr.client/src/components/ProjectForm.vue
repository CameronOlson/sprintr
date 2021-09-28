<template>
  <form @submit.prevent="createProject()">
    <div class="form-group">
      <label for="title"></label>
      <input type="text"
             class="form-control bg-light"
             placeholder="Project Name"
      >
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
      </div>
      <textarea class="form-control mt-2" placeholder="Project Description" aria-label="With textarea"></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Create Project
      </button>
    </div>
  </form>
</template>

<script>
import Pop from '../utils/Pop'
import { projectsService } from '../services/ProjectsService'

export default {

  setup() {
    return {
      async createProject() {
        try {
          await projectsService.createProject()
        } catch (error) {
          Pop.toast('this is an error from the Project Form')
        }
      }
    }
  }
}

</script>

<style>

</style>

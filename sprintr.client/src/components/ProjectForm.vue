<template>
  <form @submit.prevent="createProject()">
    <div class="form-group">
      <label for="name">
        <input type="text"
               for="name"
               class="form-control bg-light"
               placeholder="Project Name"
               v-model="editable.name"
               required
        >
      </label>
    </div>
    <div class="input-group">
      <label for="description">
        <textarea type="text"
                  for="description"
                  v-model="editable.description"
                  class="form-control mt-2 bg-light"
                  placeholder="Project Description"
                  aria-label="With textarea"
                  required
        ></textarea>
      </label>
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
import { ref } from '@vue/reactivity'

export default {

  setup() {
    const editable = ref({})
    return {
      editable,
      async createProject() {
        try {
          await projectsService.createProject(editable.value)
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

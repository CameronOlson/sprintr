<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="card card-size m-3">
      <div class="card-body">
        <div class="card-title">
          <button class=" btn btn-primary mb-2" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
            Create Project
          </button>
          <div>
            <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <Modal id="post-form">
      <template #modal-title>
        <h4>Project Form</h4>
      </template>
      <template #modal-body>
        <ProjectForm />
      </template>
    </Modal>
  </footer>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.card-size{
  height: 80vh;
  width: 80vw;
  overflow: scroll;
}
</style>

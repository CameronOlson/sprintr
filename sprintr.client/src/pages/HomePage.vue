<template>
  <div class="text-center">
    <h1 class="text-light">
      SPRINTR
    </h1>
  </div>
  <div class="home my-3 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div class="card card-size bg-brown m-3">
      <div class="card-body scrollable-y bg-black">
        <div class="card-title">
          <button class=" btn btn-og mb-2" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
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
  width: 70vw
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

}
</style>

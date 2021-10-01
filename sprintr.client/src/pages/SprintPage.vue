<template>
  <div v-if="sprint" class="container-fluid">
    <div class="row text-center">
      <h1 class="my-text">
        {{ sprint.name }}
      </h1>
    </div>
    <div class="text-center">
      <button class="btn-og" v-if="account.id == sprint.creatorId" @click="deleteSprint()">
        Delete Sprint
      </button>
    </div>
  </div>
  <div v-else class="container-fluid">
    <div class="row">
      <h1>LOADING</h1>
    </div>
  </div>
  <div v-if="backlogItems">
    <BacklogItem v-for="b in backlogItems" :key="b.id" :backlog-item="b" />
  </div>
  <div v-else>
    Loading.......
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    onMounted(() => {
      AppState.backlogItems = []
    })
    watchEffect(async() => {
      if (route.params.sprintId) {
        AppState.backlogItems = null
        AppState.sprint = null

        try {
          await sprintsService.getSprintById(route.params.id, route.params.sprintId)
          await sprintsService.getBacklogItemsBySprintId(route.params.id, route.params.sprintId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    })
    return {
      account: computed(() => AppState.account),
      sprint: computed(() => AppState.sprint),
      backlogItems: computed(() => AppState.backlogItems),
      async deleteSprint() {
        try {
          if (await Pop.confirm) {
            await sprintsService.deleteSprint(route.params.id, route.params.sprintId)
            Pop.toast('this has been deleted')
            router.push({ name: 'Project', params: { id: route.params.id } })
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-text{
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

</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <button class=" btn btn-primary mb-2" type="button" data-bs-toggle="modal" data-bs-target="#backlog-form">
        Add Item
      </button>
    </div>
  </div>
  <BacklogItem v-for="b in backlogItems" :key="b.id" :backlog-item="b" />

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

</style>

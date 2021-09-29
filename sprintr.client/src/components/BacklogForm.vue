<template>
  <form @submit.prevent="createBacklogItem()">
    <div class="form-group">
      <label for="name">
        <input type="text"
               for="name"
               class="form-control bg-light"
               placeholder="Backlog Item Name"
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
                  placeholder="Backlog Item Description"
                  aria-label="With textarea"
                  required
        ></textarea>
      </label>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Create Backlog Item
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Pop'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      router,
      route,
      async createBacklogItem() {
        try {
          const projectId = await backlogItemsService.createBacklogItem(route.params.id, editable.value)
          router.push({
            name: 'Project.Backlog',
            params: { id: projectId }
          })
        } catch (error) {
          Pop.toast('this is an error from the Backlog Item Form')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <form @submit.prevent="createSprint()">
    <div class="input-group mb-3">
      <input type="text"
             class="form-control"
             placeholder="Name"
             aria-label="Name"
             v-model="editable.name"
      >
      <span> Start Date
        <input type="date"
               id="start"
               name="trip-start"
               min="2018-01-01"
               max="2018-12-31"
               v-model="editable.startDate"
        >
      </span>
      <span> End Date
        <input type="date"
               id="start"
               name="trip-start"
               min="2018-01-01"
               max="2018-12-31"
               v-model="editable.endDate"
        >
      </span>
      <button type="submit">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { sprintsService } from '../services/SprintsService'
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    const router = useRouter()
    return {
      editable,
      router,
      route,
      async createSprint() {
        try {
          const sprintId = await sprintsService.createSprint(route.params.id, editable.value)
          router.push({
            name: 'Project.Sprint',
            params: { sprintId: sprintId }
          })
        } catch (error) {

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

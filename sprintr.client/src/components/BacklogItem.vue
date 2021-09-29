<template>
  <div class="component">
    <div class="card">
      <span>
        <h5 class="card-header">
          {{ backlogItem.name }}
        </h5>
        <button @click="removeBacklogItem(backlogItem.id)">
          Delete
        </button>
      </span>
      <div class="card-body">
        <h5 class="card-title">
          {{ backlogItem.description }}
        </h5>
        <p class="card-text">
          {{ backlogItem.status }}
        </p>
        <a class="btn btn-primary"
           data-bs-toggle="collapse"
           href="#collapseExample1"
           role="button"
           aria-expanded="false"
           aria-controls="collapseExample1"
        >
          Info
        </a>
        <div class="collapse" id="collapseExample1">
          <div class="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Pop'
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()

    return {
      async removeBacklogItem(backlogItemId) {
        try {
          await backlogItemsService.removeBacklogItem(route.params.id, backlogItemId)
          Pop.toast('this has been removed')
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

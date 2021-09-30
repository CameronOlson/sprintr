<template>
  <form @submit.prevent="createDetails()">
    <span>
      <h3>{{}}</h3>
      <h6>{{ backlogItem.status }}</h6>

      <button @click.prevent="pendingBacklogItemById(backlogItem.id)"><a class="dropdown-item">Pending</a></button>
      <button @click.prevent="inProgressBacklogItemById(backlogItem.id)"><a class="dropdown-item">In-Progress</a></button>
      <button @click.prevent="reviewBacklogItemById(backlogItem.id)"><a class="dropdown-item">Review</a></button>
      <button @click.prevent="doneBacklogItemById(backlogItem.id)"><a class="dropdown-item">Done</a></button>

      <div class="form-group">
        <label for="name">
          <input type="text"
                 for="name"
                 class="form-control bg-light"
                 placeholder="Add Note"
          >
        </label>
      </div>
    </span>
    <span>

    </span>
    <button type="submit" class="mdi mdi-send">
    </button>
    <div class="row">
      <NotesList n-for="n in notes" :key="n.id" :note="n" :backlog-item="backlogItem" />
      <div class="card-Body">
      </div>
    </div>
  </form>
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
      async pendingBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.pendingBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is pending')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async inProgressBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.inProgressBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is in progress')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async reviewBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.reviewBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is review')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async doneBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.doneBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is done')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

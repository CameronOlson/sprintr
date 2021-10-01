<template>
  <form @submit.prevent="createNote()">
    <span>
      <h6>{{ backlogItem.status }}</h6>

      <button @click.prevent="pendingBacklogItemById(backlogItem.id)"><a class="dropdown-item">Pending</a></button>
      <button @click.prevent="inProgressBacklogItemById(backlogItem.id)"><a class="dropdown-item">In-Progress</a></button>
      <button @click.prevent="reviewBacklogItemById(backlogItem.id)"><a class="dropdown-item">Review</a></button>
      <button @click.prevent="doneBacklogItemById(backlogItem.id)"><a class="dropdown-item">Done</a></button>
      <div class="center-these">

        <div class="form-group">
          <label for="body">
            <input type="text"
                   for="body"
                   class="form-control bg-light"
                   placeholder="Add Note"
                   v-model="editable.body"
            >
          </label>
        </div>
        <div>
          <button type="submit" class="mdi mdi-send ">
          </button>
        </div>
      </div>
    </span>
    <span>

    </span>
    Notes
    <NotesList v-for="n in notes" :key="n.id" :note="n" :backlog-item="backlogItem" />
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const editable = ref({
      backlogItemId: props.backlogItem.id
    })
    const route = useRoute()

    return {
      editable,
      async pendingBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.pendingBacklogItemById(route.params.id, backlogItemId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async inProgressBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.inProgressBacklogItemById(route.params.id, backlogItemId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async reviewBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.reviewBacklogItemById(route.params.id, backlogItemId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async doneBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.doneBacklogItemById(route.params.id, backlogItemId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async createNote() {
        try {
          await notesService.createNote(route.params.id, editable.value)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },

      notes: computed(() => AppState.notes)
    }
  }
}
</script>

<style lang="scss" scoped>
.center-these{
  display: flex;
}

</style>

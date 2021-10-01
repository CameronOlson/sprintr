<template>
  <div class="move-side" v-if="note.backlogItemId === backlogItem.id">
    <div>
      <span>{{ note.creator.name }}</span>
      <img :src="note.creator.picture" alt="" class="small">
    </div>
    <dir>
      {{ note.body }}
      <a v-if="note.creatorId === account.id" class="mdi mdi-delete selectable f-20" title="Delete Note" @click="removeNote()"></a>
    </dir>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      async removeNote() {
        if (await Pop.confirm()) {
          try {
            await notesService.removeNote(route.params.id, props.note.id)
          } catch (error) {
            Pop.toast(error, 'error')
          }
        }
      },
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style lang="scss" scoped>

.small{
  height: 50px;
  border-radius: 50%;
}

.move-side{
  display: flex;
  justify-content: space-between;
}

</style>

<template>
  <p v-if="note.backlogItemId === backlogItem.id">
    <img :src="note.creator.picture" alt="" class="small">
    {{ note.body }}
    <a class="mdi mdi-delete" @click="removeNote()"></a>
  </p>
</template>

<script>
import { useRoute } from 'vue-router'
import { notesService } from '../services/NotesService'
import Pop from '../utils/Pop'
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
        try {
          await notesService.removeNote(route.params.id, props.note.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }
}
</script>

<style lang="scss" scoped>

.small{
  height: 50px;
  border-radius: 50%;
}

</style>

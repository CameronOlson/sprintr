<template>
  <li @click="addBacklogItemToSprint">
    <a class="dropdown-item selectable">{{ sprint.name }}</a>
  </li>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import Pop from '../utils/Pop'
export default {
  props: {
    sprint: {
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
    const editable = ref({ })
    return {
      editable,
      async addBacklogItemToSprint() {
        try {
          // TODO Get this working
          await backlogItemsService.addBacklogItemToSprint(props.sprint.id, props.backlogItem.id, route.params.id)
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

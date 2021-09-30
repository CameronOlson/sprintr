<template>
  <p v-if="note.backlogItemId === backlogItem.id">
    <img :src="note.creator.picture" alt="" class="small">
    {{ note.body }}
  </p>
</template>

<script>
import { useRoute } from 'vue-router'
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

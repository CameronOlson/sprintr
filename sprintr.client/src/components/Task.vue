<template>
  <li v-if="task.backlogItemId === backlogItem.id">
    {{ task.name }} Weight: {{ task.weight }}
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>

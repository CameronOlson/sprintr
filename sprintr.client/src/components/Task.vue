<template>
  <div class="component">
    <li> {{ task.name }} Weight: {{ task.weight }}</li>
  </div>
</template>

<script>
export default {
  props: {
    task: {
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

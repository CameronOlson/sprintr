<template>
  <li @click="addBacklogItemToSprint">
    <a class="dropdown-item selectable">{{ sprint.name }}</a>
  </li>
</template>

<script>
export default {
  props: {
    sprint: {
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

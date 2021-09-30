<template>
  <li class="nav-item">
    <router-link :to="{name: 'Project.Sprint', params:{sprintId: sprint.id}}">
      <a class="nav-link active" aria-current="page">{{ sprint.name }}</a>
    </router-link>
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
  setup(props) {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <li class="nav-item">
    <router-link :to="{name: 'Project.Sprint', params:{sprintId: sprint.id}}">
      <div class="pad">
        <a class="link-primary" aria-current="page">|{{ sprint.name }}|</a>
      </div>
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
.pad{
  display: flex;
  padding-left: 1rem;
}

</style>

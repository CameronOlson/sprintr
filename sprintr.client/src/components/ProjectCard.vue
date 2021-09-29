<template>
  <div class="card m-3">
    <h5 class="card-header">
      {{ project.name }}
    </h5>
    <div class="card-body">
      <p class="card-text">
        {{ project.description }}
      </p>
      <router-link :to="{name: 'Project.Backlog', params: {id: project.id}}" class="selectable">
        <a href="#project" class="btn btn-primary">Open Project</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>

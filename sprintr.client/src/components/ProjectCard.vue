<template>
  <div class="card">
    <h5 class="card-header">
      {{ project.name }}
    </h5>
    <div class="card-body">
      <p class="card-text">
        {{ project.description }}
      </p>
      <a href="#" class="btn btn-primary">Open Project</a>
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

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
        <a href="#project" class="btn btn-og">Open Project</a>
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
.card-size{
  height: 80vh;
  width: 70vw
}
.card{
  background-color: #0b2c3d;
  color:aliceblue
}

.btn-og{
  display: inline-block;

  border: 2px solid aliceblue;
  border-radius: 0.12em;
  text-decoration: none;
  background-color: Transparent;
  background-repeat:no-repeat;
  color:aliceblue;
  font-family: 'Roboto',sans-serif;
  text-align: center;
  transition: all 0.2s;
  box-sizing: border-box;
}
.btn-og:hover{
  background-color: aliceblue;
  color:#000000;

}

</style>

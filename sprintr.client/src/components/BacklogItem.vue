<template>
  <div class="component">
    <div class="card">
      <span>
        <h5 class="card-header">
          {{ backlogItem.name }}
        </h5>
        <h6>{{ backlogItem.status }}</h6>
        <div class="dropdown">
          <a class="btn btn-secondary dropdown-toggle"
             href="#"
             role="button"
             id="dropdownMenuLink"
             data-bs-toggle="dropdown"
             aria-expanded="false"
          >
            Dropdown link
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li @click.prevent="pendingBacklogItemById(backlogItem.id)"><a class="dropdown-item">Pending</a></li>
            <li @click.prevent="inProgressBacklogItemById(backlogItem.id)"><a class="dropdown-item">In-Progress</a></li>
            <li @click.prevent="reviewBacklogItemById(backlogItem.id)"><a class="dropdown-item">Review</a></li>
            <li @click.prevent="doneBacklogItemById(backlogItem.id)"><a class="dropdown-item">Done</a></li>
          </ul>
        </div>
        <button @click="removeBacklogItem(backlogItem.id)">
          Delete
        </button>
      </span>
      <span>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  @click="getSprintsById()"
          >
            Dropdown button
          </button>
          <ul v-if="sprints" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <SprintList v-for="s in sprints" :key="s.id" :sprint="s" :backlog-item="backlogItem" />
          </ul>
          <ul v-else class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              Loading...
            </li>
          </ul>
        </div>
      </span>
      <div class="card-body">
        <h5 class="card-title">
          {{ backlogItem.description }}
        </h5>
        <p class="card-text">
          {{ backlogItem.status }}
        </p>
        <a class="btn btn-primary"
           data-bs-toggle="collapse"
           href="#collapseExample1"
           role="button"
           aria-expanded="false"
           aria-controls="collapseExample1"
        >
          Info
        </a>
        <div class="collapse" id="collapseExample1">
          <div class="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { backlogItemsService } from '../services/BacklogItemsService'
import { sprintsService } from '../services/SprintsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    backlogItem: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    // watchEffect(async() => {
    //   if (props.backlogItem.id) {
    //     try {
    //       await backlogItemsService.getBacklogItemsByProjectId(route.params.id)
    //     } catch (error) {

    //     }
    //   }
    // })
    return {
      async getSprintsById() {
        try {
          await sprintsService.getSprintsById(route.params.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async removeBacklogItem(backlogItemId) {
        try {
          await backlogItemsService.removeBacklogItem(route.params.id, backlogItemId)
          Pop.toast('this has been removed')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async pendingBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.pendingBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is pending')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async inProgressBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.inProgressBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is in progress')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async reviewBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.reviewBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is review')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async doneBacklogItemById(backlogItemId) {
        try {
          await backlogItemsService.doneBacklogItemById(route.params.id, backlogItemId)
          Pop.toast('status is done')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

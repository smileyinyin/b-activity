<template>
  <div class="create-activity">

    <Card style="min-width:1078px">
      <p class="title">创建活动</p>
      <activityStep :curStep="step"></activityStep>

      <div class="router-view-wrap">
        <router-view @status="statusHandler"></router-view>
      </div>
    </Card>
  </div>
</template>

<script>

import activityStep from './components/activity-step'
import createStepRouterMapper from './data/create-step-router-mapper'

export default {
  components: {
    activityStep
  },
  data () {
    return {
      activityStatus: 'draft',
      step: 0
    }
  },

  methods: {
    statusHandler (s) {
      this.activityStatus = s
    }
  },

  watch: {
    '$route' (to, from) {
      this.step = createStepRouterMapper[to.name].step
    }
  },

  created () {
    console.log(this.$router.currentRoute.name)
    this.step = createStepRouterMapper[this.$router.currentRoute.name].step
  }
}
</script>

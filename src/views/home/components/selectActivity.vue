<template>
    <Dropdown @on-click="onClick" class="mb10" placement="bottom-start">
        <a href="javascript:void(0)">
            {{ currentActivity }}
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem style="border-bottom: 1px solid #e8eaec" :name="0">全部有效活动</DropdownItem>
            <DropdownItem v-for="(item, index) in activityList" :key="index" :name="item.id">
                {{ item.name }}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
  name: 'selectActivity',
  props: {
    activityList: {
      type: Array,
      default() {
        return [
        //   { id: 1, name: '第一个活动' },
        //   { id: 2, name: '第二个活动' },
        //   { id: 3, name: '第三个活动' }
        ]
      }
    }
  },
  data() {
    return {
      currentActivity: '全部有效活动'
    }
  },
  methods: {
    onClick(name) {
      console.log(name)
      this.changeCurrentActivity(name)
      this.$emit('on-change', name)
    },
    changeCurrentActivity(id) {
      if (id === 0) {
        this.currentActivity = '全部有效活动'
        return
      }
      let act = this.activityList.find(item => item.id === id)
      act && (this.currentActivity = act.name)
    }
  }
}
</script>

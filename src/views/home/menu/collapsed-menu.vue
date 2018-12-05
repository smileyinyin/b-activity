<template>
  <Dropdown @on-click="handleClick" transer placement="right-start">
    <a class="drop-menu-a"><Icon :size="20" :type="parentItem.icon"/></a>
    <DropdownMenu slot="list">
      <template v-for="child in parentItem.children">
        <collapsed-menu v-if="child && child.children" :icon-size="20" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.router"
          ><Icon :size="20" :type="child.icon"
          /><span class="menu-title">{{ child.name }}</span></DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'CollapsedMenu',
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      textColor: '#495060'
    }
  },
  methods: {
    handleClick (name) {
      this.$emit('on-click', name)
    }
  }
}
</script>

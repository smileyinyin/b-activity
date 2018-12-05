<template>
    <ul class="rank-list">
        <li class="title">
            <span>{{ title[0] }}</span>
            <span>{{ title[1] }}</span>
            <span>{{ title[2] }}</span>
        </li>
        <li v-for="(item, i) in data" :key="i">
            <span>{{ item.rank }}</span>
            <span>
              <Tooltip :content="item.storeName" placement="top">
                {{ item.storeName }}
              </Tooltip>
            </span>
            <span>{{ item.transactionCount }}</span>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'rankList',
  props: {
    title: {
      type: Array,
      default() {
        return ['排名', '渠道', '笔数']
      }
    },
    data: {
      required: true,
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-list {
  .title {
    margin-top: 26px;
    color: rgba(0, 0, 0, 0.3);
  }

  /deep/ li {
    display: flex;
    height: 40px;
    line-height: 40px;
    list-style: none;

    &:nth-child(n + 2) {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    span:nth-child(1) {
      flex-basis: 15%;
      min-width: 30px;
    }
    span:nth-child(2) {
      flex-basis: 60%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span:nth-child(3) {
      min-width: 30px;
      flex-basis: 25%;
    }
  }
}
</style>

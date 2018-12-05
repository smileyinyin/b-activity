<template>
  <div class="template-select">
    <swiper :options="swiperOption" ref="swiper">
      <!-- slides -->
      <swiper-slide v-for="(t, i) in activityTemplates" :key="t.key">
        <input type="radio" :id="t.key" name="templatePanel" class="templatePanel__radio" v-model="selectedT" :value="t.key">
        <label class="templatePanel" :class="`templatePanel--bg-${i}`" :for="t.key">
          <h5 class="templatePanel__title">{{t.name}}</h5>

          <Icon class="templatePanel__checked" type="md-checkmark" size="22"
                style="color: white;" v-if="t.key === selectedT"
          >
          </Icon>
        </label>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import activityT from '../../../data/activity-templates'
import * as ApiCreateActivity from '@/api/create-activity'

const swiperOption = {
  // loop: true,
  preventClicks: false,
  // preventClicksPropagation: false,
  // slideToClickedSlide: true,
  slidesPerView: '6',
  grabCursor: true,
  autoPlay: false,
  height: 300,
  spaceBetween: 20
}

export default {
  data () {
    return {
      swiperOption,

      selectedT: null,
      activityTs: []
    }
  },

  props: {
    value: { type: String, default: 'MeetDiscount' },
    activityId: { type: String, default: '' }
  },

  watch: {
    selectedT (val) {
      this.$emit('input', (val || 'MeetDiscount'))
    }
  },

  computed: {
    swiper () {
      return this.$refs.swiper.swiper
    },

    activityTemplates () {
      if (!this.activityTs) {
        return Object.keys(activityT).map(k => ({ name: activityT[k].name, key: k }))
      } else {
        return this.activityTs.map(({ name, msg }) => ({ name: msg, key: name }))
      }
    }
  },

  methods: {
    async getActivityTemplates (activityId) {
      let { data = [] } = await ApiCreateActivity.getActivityTemplates(activityId)
      let selectedT = data.filter(({ isMe = false }) => isMe)
      this.selectedT = selectedT.length === 0 ? data[0].name : selectedT[0].name
      this.activityTs = data.filter(item => item.name !== 'Ticket')
    }
  },

  created () {
    if (this.activityId) {
      this.getActivityTemplates(this.activityId)
    }
  },

  components: {
    swiper, swiperSlide
  }
}
</script>

<style lang="scss">
  @import "~SassMagic/src/mixins/_BEM";
  @import "~SassMagic/src/mixins/_open-color";

  @include b (templatePanel) {
    display: inline-block;
    position: relative;
    background: red;
    height: 0;
    padding-bottom: 100%;
    width: 100%;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;

    $oc-l: map_keys($oc-color-list);
    @for $i from 0 through 20 {
      @include m (bg-#{$i}) {
        background: map_get(nth($oc-l, random($oc-color-spectrum)), "5");
      }
    }

    @include e (radio) {
      position: absolute; top: -9999px; left: -9999px;
    }
    @include e (title) {
      font-size: 18px; color: white;
      padding: 6px 12px;
    }
    @include e (checked) {
      position: absolute; bottom: 12px; right: 12px;
    }
  }
</style>

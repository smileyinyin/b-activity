
<template>
  <Form :label-width="100" :model="baseInfoForm" :rules="validRules" ref="form" class="base-information dib" style="min-width: 1045px;">
    <Row>
      <i-col span="12">
        <!-- 活动名称 -->
        <FormItem label="活动名称" prop="name">
          <Input v-model="baseInfoForm.name" placeholder="请输入活动名称" :maxlength="50" :disabled="disabled" />
        </FormItem>
        <!-- 活动主办方 -->
        <FormItem label="活动主办方" prop="bankId">
          {{ baseInfoForm.bankName }}
          <!-- <Select v-model="baseInfoForm.bankId" placeholder="请选择活动主办方" clearabl :disabled="disabled">
            <Option v-for="p in activityOrganizer" :value="p.id" :label="p.name" :key="p.id"></Option>
          </Select> -->
        </FormItem>
        <!-- 活动时间 -->
        <FormItem label="活动时间" :required="true">
          <Row>
            <i-col span="11">
              <FormItem prop="startTime">
                <DatePicker v-model="baseInfoForm.startTime" class="pct100" type="datetime" :editable="false" placement="bottom-start" placeholder="请选择开始时间" format="yyyy-MM-dd HH:mm:ss" :disabled="disabled"></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="2">&nbsp;</i-col>
            <i-col span="11">
              <FormItem prop="endTime">
                <DatePicker v-model="baseInfoForm.endTime" class="pct100" type="datetime" :editable="false" placement="bottom-start" placeholder="请选择结束时间" format="yyyy-MM-dd HH:mm:ss" @on-change="endTimeChangeHanlder" :disabled="disabled"></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </FormItem>
        <!-- 删选时间 -->
        <FormItem class="tl zx1 date-panel-wrap" label="筛选时间" style="margin-bottom: 10px;">
          <!-- <DatePicker type="daterange" split-panels placeholder="请选择时间" style="width: 100%;" v-model="baseInfoForm.includeTimesList"></DatePicker> -->
          <date-range-panel v-model="baseInfoForm.includeTimesList"
                          :can-selected-day="baseInfoForm.weeksList"
                          :start-time="baseInfoForm.startTime"
                          :end-time="baseInfoForm.endTime"
                          :exclude-times-list="baseInfoForm.excludeTimesList"
                          :disabled="disabled"
          >
          </date-range-panel>
        </FormItem>
      </i-col>
      <i-col span="12">
        <!-- 所在地区 -->
        <FormItem label="所在地区">
          {{ baseInfoForm.provinceName }}
          -
          {{ baseInfoForm.cityName }}
          -
          {{ baseInfoForm.districtName }}
          <!-- <Row>
            <i-col span="11">
              <FormItem prop="province">
                <Select v-model="baseInfoForm.province" placeholder="请选择省份" clearable @on-change="getCityList(baseInfoForm.province)" :disabled="disabled">
                  <Option v-for="p in provinceList" :value="String(p.provinceCode)" :label="p.provinceName" :key="p.id"></Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="2">&nbsp;</i-col>
            <i-col span="11">
              <FormItem prop="city">
                <Select v-model="baseInfoForm.city" placeholder="请选择城市" clearable :disabled="disabled">
                  <Option v-for="p in cityList" :value="String(p.cityCode)" :label="p.cityName" :key="p.id"></Option>
                </Select>
              </FormItem>
            </i-col>
          </Row> -->
        </FormItem>
        <!-- 活动协办方 -->
        <FormItem label="活动协办方" prop="companyId">
          {{ baseInfoForm.companyName }}
          <!-- <Select v-model="baseInfoForm.companyId" placeholder="请选择活动协办方" clearable :disabled="disabled">
            <Option v-for="p in activityCoOrganizer" :value="p.id" :label="p.name" :key="p.id"></Option>
          </Select> -->
        </FormItem>
        <!-- 活动预算 -->
        <FormItem label="活动预算" prop="budget">
          <Input v-model="baseInfoForm.budget" placeholder="请输入活动预算" :disabled="disabled" />
        </FormItem>
        <!-- 可选时间段 -->
        <FormItem label="可选时间段" :required="true" prop="weeksList">
          <Card class="tl">
            <CheckboxGroup v-model="baseInfoForm.weeksList" class="mt10 mb10">
              <Checkbox v-for="(day, i) in weekDay" :label="day.value" :key="i" :disabled="disabled">{{day.des}}</Checkbox>
            </CheckboxGroup>
          </Card>
        </FormItem>
        <!-- 活动内容 -->
        <FormItem label="活动内容" prop="detail">
          <Input v-model="baseInfoForm.detail" class="f13" type="textarea" :autosize="{minRows: 8, maxRows: 8}" placeholder="活动内容最多可输入1000字" :maxlength="1000" clearable :disabled="disabled" />
        </FormItem>
      </i-col>
    </Row>
    <!-- 父活动 -->
    <!-- <FormItem label="父活动" prop="parentId">
      <Select v-model="baseInfoForm.parentId" placeholder="请选择活父活动" clearable :disabled="disabled">
        <Option v-for="p in parentActivityList" :value="p.id" :label="p.name" :key="p.id"></Option>
      </Select>
    </FormItem> -->

    <!-- 活动形式 -->
    <!-- <FormItem label="活动形式" prop="actProperty" :required="true">
      <RadioGroup v-model="baseInfoForm.actProperty" class="pct100" type="button">
        <Radio class="pct50" label="offline" :disabled="disabled">线下活动</Radio>
        <Radio class="pct50" label="online" :disabled="disabled">线上活动</Radio>
      </RadioGroup>
    </FormItem> -->

    <Row type="flex" justify="end" v-if="!disabled" class="mt30 mb20">
      <Button class="mr20 w120" type="success" @click="saveActionHandler" :loading="saveLoading">保存</Button>
      <Button type="primary" class="w120" @click="nextStepActionHandler" :loading="nextLoading">下一步</Button>
    </Row>
    <!-- <FormItem v-if="!disabled" class="mt30">
    </FormItem> -->
  </Form>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep'
// import _keys from 'lodash/keys'
// import _pick from 'lodash/pick'
import moment from 'moment/moment'
import validRules from './valid-rules/baseInformation'
import weekDay from '../../data/week-day'
import * as ApiPublic from '@/api/public'
import * as ApiCreateActivity from '@/api/create-activity'
import DateRangePanel from './components/date-range-panel'
// import RuleList from '@/views/create-activity/components/rule-list/index'

export default {
  data () {
    return {
      validRules,
      weekDay,
      provinceList: [],
      cityList: [],
      activityOrganizer: [],
      activityCoOrganizer: [],
      parentActivityList: [],
      formControl: {
        daylong: true,
        consumeSMS: true
      },
      prevEndTime: '1997-01-01 00:00:00',
      baseInfoForm: {
        id: null,
        name: '',
        // TODO 登录时获取的 各种ID
        districtId: this.$store.getters.district_id, // '330108',
        city: this.$store.getters.city_id, // '330100',
        province: this.$store.getters.province_id, // '330000',
        bankId: this.$store.getters.bank_id, // '785110',
        companyId: this.$store.getters.company_id, // '68',
        budget: '',
        parentId: '',
        actProperty: 'offline',
        actType: 'common_act',
        startTime: null,
        endTime: null,
        weeksList: [0, 1, 2, 3, 4, 5, 6],
        detail: '',
        smsContent: '',
        includeTimesList: [],
        excludeTimesList: [],

        bankName: '',
        companyName: '',
        districtName: '',
        cityName: '',
        provinceName: ''
      },
      saveLoading: false,
      nextLoading: false
    }
  },

  props: {
    activityId: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },

  methods: {
    endTimeChangeHanlder (date) {
      let bif = this.baseInfoForm
      let stredDate = String(date)
      let beforeDate = stredDate.split(' ')[0]
      let afterDate = stredDate.split(' ')[1]
      let prevBeforeDate = this.prevEndTime.split(' ')[0]
      let prevAfterDate = this.prevEndTime.split(' ')[1]
      let result = ''

      if (!date) {
        bif.endTime = null
        return
      } else if (beforeDate === prevBeforeDate) {
        result = `${beforeDate} ${prevAfterDate}`
      } else if (afterDate !== prevAfterDate) {
        result = `${beforeDate} ${afterDate}`
      } else {
        result = `${beforeDate} 23:59:59`
      }

      bif.endTime = new Date(result)
      this.$forceUpdate()
    },
    async getListNames () {
      let {
        data: { bankName, companyName, districtName, cityName, provinceName }
      } = await ApiCreateActivity.getListNames(this.baseInfoForm.bankId, this.baseInfoForm.companyId, this.baseInfoForm.province, this.baseInfoForm.city, this.baseInfoForm.districtId)
      this.baseInfoForm.bankName = bankName
      this.baseInfoForm.companyName = companyName
      this.baseInfoForm.districtName = districtName
      this.baseInfoForm.cityName = cityName
      this.baseInfoForm.provinceName = provinceName
    },
    async getProvinceList () {
      let { data = [] } = await ApiPublic.getProvinceList()

      this.provinceList = data
    },
    async getParentActivityList (activityId = null) {
      let { data = [] } = await ApiCreateActivity.getParentActivityList()

      if (activityId) {
        this.parentActivityList = data.filter(({ id }) => String(id) !== String(activityId))
      } else {
        this.parentActivityList = data
      }
    },
    async getCityList (provinceId) {
      let { data = [] } = await ApiPublic.getCityListOnProvince(provinceId)

      this.cityList = data
    },
    async getOrganizer () {
      let { data = [] } = await ApiPublic.getBankList()

      this.activityOrganizer = data
    },
    async getCoOrganizer () {
      let { data = [] } = await ApiPublic.getCompanyList()

      this.activityCoOrganizer = data
    },
    async getActivityBaseInformation (activityId) {
      let {
        data: {
          bankId = null,
          budget = '',
          companyId = null,
          weeksList = [],
          status = 'draft',
          startTime = null,
          endTime = null
        },
        _rawData: { data }
      } = await ApiCreateActivity.getActivityBaseInformation(activityId)

      // this.baseInfoForm = _pick(data, _keys(this.baseInfoForm))  // pick 会把几个中文字段pick掉 失去响应式能力
      for (let key in this.baseInfoForm) {
        if (data[key] !== undefined) {
          this.baseInfoForm[key] = data[key]
        }
      }

      this.baseInfoForm.startTime = new Date(startTime)
      this.baseInfoForm.endTime = new Date(endTime)
      this.baseInfoForm.weeksList = weeksList.map(e => Number(e))
      this.baseInfoForm.bankId = bankId
      this.baseInfoForm.budget = budget
      this.baseInfoForm.companyId = companyId
      this.$emit('status', status)

      this.formControl.consumeSMS = this.baseInfoForm.smsContent.length > 0
      this.getListNames()

      // this.baseInfoForm.province && this.getCityList(this.baseInfoForm.province)
    },
    async saveActivityBaseInformation () {
      let validResult = await this.$refs.form.validate()

      // valid form has have error.
      if (!validResult) {
        this.$Notice.warning({ title: '警告', desc: '请检查表单中字段!' })

        return Promise.reject({ message: '表单校验失败!' })
      }

      try {
        let form = this.createBaseInfoForm()
        let {
          _rawData: { message = '保存成功!', data }
        } = await ApiCreateActivity.saveActivityBaseInformation(form)

        return Promise.resolve({ message, activityId: data })
      } catch (e) {
        console.error(e)
      }
    },
    async saveActionHandler () {
      this.saveLoading = true
      try {
        let { message, activityId } = await this.saveActivityBaseInformation()

        this.$Notice.success({ title: '成功', desc: message })

        this.$router.replace({ name: 'BaseInformation', query: { activityId } })
        this.baseInfoForm.id = activityId
        this.saveLoading = false
      } catch (e) {
        console.error(e)
        this.saveLoading = false
      }
    },
    async nextStepActionHandler () {
      this.nextLoading = true
      try {
        let { activityId } = await this.saveActivityBaseInformation()
        this.$router.push({ name: 'ActivityRules', query: { activityId } })
        this.nextLoading = false
      } catch (e) {
        this.nextLoading = false
        console.error(e)
      }
    },
    createBaseInfoForm () {
      let r = _cloneDeep(this.baseInfoForm)
      r.startTime = moment(new Date(r.startTime)).format('YYYY-MM-DD HH:mm:ss')
      r.endTime = moment(new Date(r.endTime)).format('YYYY-MM-DD HH:mm:ss')
      r.includeTimesList.push(r.startTime)
      r.includeTimesList.push(r.endTime)
      r.smsContent = this.formControl.consumeSMS ? r.smsContent : ''

      return r
    }
  },

  created () {
    let activityId = this.$route.query.activityId

    // this.getProvinceList()
    // this.getOrganizer()
    // this.getCoOrganizer()
    if (activityId) {
      this.baseInfoForm.id = activityId

      this.getActivityBaseInformation(activityId)
      // this.getParentActivityList(activityId)
    } else {
      this.getListNames()
      // this.getParentActivityList()
    }
  },

  components: { DateRangePanel }
}
</script>

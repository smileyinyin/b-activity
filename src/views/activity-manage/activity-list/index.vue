<template>
  <div class="activity-list-page">
    <p class="pr10 pb10 f14">活动列表</p>
    <Card>
      <Row>
        <i-col span="4">
          <router-link :to="{ name: 'BaseInformation' }">
            <Button type="success" class="w120 btn-add" icon="md-add" size="large">创建活动</Button>
          </router-link>
        </i-col>
        <i-col span="20">
          <Row type="flex" justify="end" align="middle">
            <!-- 活动 ID -->
            <Input class="mr10 w180" placeholder="请输入活动ID" clearable v-model="searchForm.id" :maxlength="10" />
            <!-- 活动名称 -->
            <Input class="mr10 w180" placeholder="请输入活动名称" clearable v-model="searchForm.name" />
            <!-- 商户名称 -->
            <!-- <Input class="mr10 w180" placeholder="请输入商户名称" clearable v-model="searchForm.storeName" /> -->
            <!-- 搜索按钮 -->
            <Button type="primary" @click="fetchActivityList">查询</Button>
          </Row>
        </i-col>
      </Row>
      <!-- 查询条件 2 -->
      <Row class="mt10" type="flex" justify="end" align="middle">
        <!-- 创建人 -->
        <Input class="mr10 w180" placeholder="请输入创建人" clearable v-model="searchForm.creater" />
        <!-- 商户 ID -->
        <!-- <Input class="mr10 w180" placeholder="请输入商户ID" clearable v-model="searchForm.storeId" :maxlength="10" /> -->
        <!-- 请选择活动模板 -->
        <Select class="mr10 w180" placeholder="请选择活动模板" v-model="searchForm.ruleType" clearable>
          <Option v-for="template in activityTemplates" :value="template.value" :key="template.value" :label="template.des"></Option>
        </Select>
        <!-- 看不见我 -->
        <Button class="opa0" type="primary">查询</Button>
      </Row>
      <!-- <Row class="mt10" type="flex" justify="end" align="middle"> -->
        <!-- 请选择分公司 -->
        <!-- <Select class="mr10 w180" placeholder="请选择分公司" v-model="searchForm.companyId" clearable>
          <Option v-for="company in companyList" :value="company.id" :key="company.id" :label="company.name"></Option>
        </Select> -->
        <!-- 请选择银行 -->
        <!-- <Select class="mr10 w180" placeholder="请选择银行" v-model="searchForm.bankId" clearable>
          <Option v-for="bank in bankList" :value="bank.id" :label="bank.name" :key="bank.id"></Option>
        </Select> -->
        <!-- 看不见我 -->
        <!-- <Button class="opa0" type="primary">查询</Button>
      </Row> -->
      <!-- 查询条件 4 -->
      <Row class="mt15 mb15" type="flex" justify="end" align="middle">
        <CheckboxGroup v-model="searchForm.statuses">
          <Checkbox :label="status.value" v-for="status in activityStatus" :key="status.value" :value="status.value">
            <span v-text="status.des"></span>
          </Checkbox>
        </CheckboxGroup>
      </Row>
      <!-- 表格 -->
      <Row class="mt10" type="flex" justify="center" align="middle">
        <i-col class="ova">
          <div style="min-width: 1200px">
            <Table stripe border size="small" :columns="activityListColumns" :data="activityList"> </Table>
          </div>
        </i-col>
      </Row>
      <!-- 分页器 -->
      <Row class="mt10" type="flex" justify="end" align="middle">
        <Page :total="pager.total" show-sizer :page-size="pager.size" :current.sync="pager.page" @on-change="fetchActivityList" @on-page-size-change="pageSizeChangeHandler"> </Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import activityListColumns from './data/activity-list-columns'
import activityStatus from './data/activity-status'
import activityTemplates from './data/activity-templates'
import _merge from 'lodash/merge'
import * as ApiPublic from '@/api/public'
import * as ApiActivityManage from '@/api/activity-manage'

export default {
  data () {
    return {
      pager: {
        total: 0,
        page: 1,
        size: 10
      },
      activityListColumns: activityListColumns.call(this),
      activityStatus,
      activityTemplates,
      activityList: [],
      bankList: [],
      companyList: [],
      searchForm: {
        id: '',
        name: '',
        storeId: '',
        storeName: '',
        creater: '',
        bankId: this.$store.getters.bank_id, // '785118', // TODO
        companyId: '',
        ruleType: null,
        statuses: []
      }
    }
  },
  created () {
    this.fetchActivityList()
    // this.getBankList()
    // this.getCompanyList()
    this.searchForm.statuses = activityStatus.map(({ value }) => value)
  },
  methods: {
    pageSizeChangeHandler (size) {
      this.pager.size = size
      this.fetchActivityList()
    },
    // 获取活动列表
    async fetchActivityList () {
      let reqPack = Object.create(null)
      _merge(reqPack, this.searchForm)
      _merge(reqPack, this.pager)
      reqPack.ruleType = reqPack.ruleType === '' ? null : reqPack.ruleType

      let {
        data = [],
        _rawData: { objectotalNumber = 0 }
      } = await ApiActivityManage.fetchActivityList(reqPack)

      this.activityList = data
      this.pager.total = objectotalNumber
    },
    // 删除活动
    deleteActivity ({ id }) {
      this.$Modal.confirm({
        title: '警告',
        content: `请问是否删除该活动`,
        onOk: async () => {
          await ApiActivityManage.deleteActivity(id)
          this.fetchActivityList()
          this.$Notice.success({ title: '成功', desc: '删除活动成功!' })
        }
      })
    },
    // 获取银行列表
    async getBankList () {
      let { data = [] } = await ApiPublic.getBankList()
      this.bankList = data
    },
    async getCompanyList () {
      let { data = [] } = await ApiPublic.getCompanyList()
      this.companyList = data
    },
    // 下线活动
    offlineActivity ({ id }) {
      this.$Modal.confirm({
        title: '警告',
        content: `请问是否下线该活动`,
        onOk: async () => {
          await ApiActivityManage.offlineActivity(id)
          this.fetchActivityList()
          this.$Notice.success({ title: '成功', desc: '下线活动成功!' })
        }
      })
    },
    // 编辑活动
    editorActivity ({ id }) {
      this.$router.push({ name: 'BaseInformation', query: { activityId: id } })
    },
    checkActivity ({ id }) {
      this.$router.push({ name: 'ActivityCheck', query: { activityId: id } })
    },
    async submitActivity2Check ({ id }) {
      await ApiActivityManage.submitToCheck(id)
      this.fetchActivityList()
      this.$Notice.success({ title: '成功', desc: '提交审核成功!' })
    }
  }
}
</script>

<style scoped>

</style>

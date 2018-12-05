<style scoped>
  .show-edit-btn { display: none; margin-left: -10px; }
  .ivu-table-cell:hover .show-edit-btn { display: inline-block; }
</style>

<template>
  <div>
    <Table ref="selection" :columns="columnsList" :data="thisTableData" border disabled-hover @on-selection-change="selectionChange"></Table>
  </div>
</template>

<script>
const deleteButton = (vm, h, currentRow, index, num) => {
  return h('Button', {
    style: {
      margin: '0 5px',
      width: '80px'
    },
    props: {
      type: 'error',
      placement: 'top'
    },
    on: {
      'click': () => {
        // console.log(vm.thisTableData[index].storeId)
        if (index === 0 && vm.edittingStore.length > 2) {
          if (num.length === 0) {
            vm.$emit('on-checked', 'none')
          }
          let n = 0
          for (var i = 0; i < num.length; i++) {
            let storeId = vm.thisTableData[num[i] - n].storeId
            vm.thisTableData.splice(num[i] - n, 1)

            vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index, storeId)
            n++
          }
          if (vm.thisTableData.length < 3 && vm.thisTableData.length > 1) {
            vm.thisTableData.splice(0, 1)
            // storeId = vm.thisTableData[0].storeId
          } else if (vm.thisTableData.length === 1) {
            vm.thisTableData = []
          }
          vm.$emit('input', vm.handleBackdata(vm.thisTableData))
        } else {
          console.log(vm.edittingStore)
          let storeId = vm.thisTableData[index].storeId
          vm.thisTableData.splice(index, 1)
          if (vm.thisTableData.length < 3) {
            vm.thisTableData.splice(0, 1)
          }
          vm.$emit('input', vm.handleBackdata(vm.thisTableData))
          vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index, storeId)
          console.log(vm.thisTableData)
        }
      }
    }
  }, index === 0 && vm.edittingStore.length > 2 ? '批量删除' : '删除')
}
const cellInput = (vm, h, param, item, index) => {
  return h('Input', {
    props: {
      type: 'text',
      value: vm.edittingStore[param.index][item.key],
      disabled: !!(vm.edittingStore[param.index].brokerFee === 0 && (item.key === 'brokerFeeRate' || item.key === 'brokerFeeUpLimit')),
      maxlength: 5
    },
    style: {
      width: '100%'
    },
    on: {
      'on-change'(event) {
        let key = item.key
        vm.edittingStore[param.index][key] = event.target.value
        if (param.index === 0) {
          vm.edittingStore.forEach(t => {
            t[key] = event.target.value
            console.log('1111', t)
            if (t.brokerFee === 0) {
              t.brokerFeeRate = ''
              t.brokerFeeUpLimit = ''
            }
          })
        }
      },
      'on-blur'(event) {
        vm.edittingStore.forEach(t => {
          t.saving = true
        })
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        vm.$emit('input', vm.handleBackdata(vm.thisTableData))
        vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index)
        let v = vm.thisTableData[param.index][param.column.key]
        vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key, v)
        console.log(vm.thisTableData[param.index][param.column.key])
      }
    }
  })
}
const cellSelect = (vm, h, param, item, index) => {
  return h('div', [
    h('Select', {
      props: {
        value: vm.edittingStore[param.index][item.key]
      },
      style: {
        width: '160px'
      },
      on: {
        'on-change'(event) {
          let key = item.key
          vm.edittingStore[param.index][key] = event
          if (param.index === 0) {
            vm.edittingStore.forEach(t => {
              t[key] = event
              if (t.brokerFee === 0) {
                t.brokerFeeRate = ''
                t.brokerFeeUpLimit = ''
              }
            })
          }
          if (vm.edittingStore[param.index].brokerFee === 0) {
            vm.edittingStore[param.index].brokerFeeRate = ''
            vm.edittingStore[param.index].brokerFeeUpLimit = ''
          }

          vm.edittingStore.forEach(t => {
            t.saving = true
          })
          vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
          vm.$emit('input', vm.handleBackdata(vm.thisTableData))
          vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index)
        }
      }
    },
    item.option.map(t => {
      return h('Option', {
        props: {
          value: t.k
        }
      }, t.txt)
    })
    )
  ])
}

export default {
  name: 'canEditTable',
  props: {
    refs: String,
    columnsList: Array,
    value: Array,
    url: String,
    editIncell: {
      type: Boolean,
      default: false
    },
    hoverShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [],
      thisTableData: [],
      edittingStore: [],
      num: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    //  监听表格多选选中的值
    selectionChange() {
      let obj = JSON.parse(JSON.stringify(this.$refs.selection.objData))
      let arr = []
      for (var i in obj) {
        arr.push(obj[i])
      }

      arr[0]._disabled = true

      this.num = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]._isChecked) {
          this.num.push(i)
        }
      }
    },
    init() {
      //  筛选出可编辑项
      let vm = this
      let editableCell = this.columnsList.filter(item => {
        if (item.editable) {
          if (item.editable === true) {
            return item
          }
        }
      })
      let cloneData = JSON.parse(JSON.stringify(this.value))
      let res = []
      res = cloneData.map((item, index) => {
        let isEditting = false
        if (this.thisTableData[index]) {
          if (this.thisTableData[index].editting) {
            isEditting = true
          } else {
            for (const cell in this.thisTableData[index].edittingCell) {
              if (this.thisTableData[index].edittingCell[cell] === true) {
                isEditting = true
              }
            }
          }
        }
        if (isEditting) {
          return this.thisTableData[index]
        } else {
          this.$set(item, 'editting', false)
          let edittingCell = {}
          editableCell.forEach(item => {
            edittingCell[item.key] = false
          })
          this.$set(item, 'edittingCell', edittingCell)
          return item
        }
      })
      this.thisTableData = res
      this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData))
      this.columnsList.forEach(item => {
        if (item.editable) {
          if (item.editselect) {
            item.render = (h, param) => {
              let currentRow = this.thisTableData[param.index]
              if (!currentRow.editting) {
                if (this.editIncell) {
                  return h('Row', {
                    props: {
                      type: 'flex',
                      align: 'middle',
                      justify: 'center'
                    }
                  }, [
                    cellSelect(this, h, param, item)
                  ])
                } else {
                  return h('span', currentRow[item.key])
                }
              } else {
                return h('Select', {
                  props: {
                    value: currentRow[item.key]
                  },
                  on: {
                    'on-change'(event) {
                      let key = param.column.key
                      vm.edittingStore[param.index][key] = event.target.value
                    }
                  }
                },
                item.option.map(t => {
                  return h('Option', {
                    props: {
                      value: t.k
                    }
                  }, t.txt)
                }))
              }
            }
          } else {
            item.render = (h, param) => {
              let currentRow = this.thisTableData[param.index]
              if (!currentRow.editting) {
                if (this.editIncell) {
                  return h('Row', {
                    props: {
                      type: 'flex',
                      align: 'middle',
                      justify: 'center'
                    }
                  }, [
                    cellInput(this, h, param, item)
                  ])
                } else {
                  return h('span', currentRow[item.key])
                }
              } else {
                return h('Input', {
                  props: {
                    type: 'text',
                    value: currentRow[item.key]
                  },
                  on: {
                    'on-change'(event) {
                      let key = param.column.key
                      vm.edittingStore[param.index][key] = event.target.value
                    }
                  }
                })
              }
            }
          }
        }
        if (item.handle) {
          item.render = (h, param) => {
            let currentRowData = this.thisTableData[param.index]
            let children = []
            item.handle.forEach(item => {
              if (item === 'delete') {
                children.push(deleteButton(this, h, currentRowData, param.index, this.num))
              }
            })
            return h('div', children)
          }
        }
      })
    },

    //  删除按钮渲染
    handleBackdata(data) {
      let clonedData = JSON.parse(JSON.stringify(data))
      clonedData.forEach(item => {
        delete item.editting
        delete item.edittingCell
        delete item.saving
      })
      return clonedData
    }
  },
  watch: {
    value(data) {
      this.init()
    }
  }
}
</script>

export default [
  // 模拟测试
  {
    path: 'simulation-test',
    name: 'simulationTest',
    meta: {
      title: '模拟测试'
    },
    component: () => import('@/views/simulation-test/sub-pages/simulation-test')
  }
]

import { createApp } from '@/main'

const { app, router, store } = createApp()

//  当使用template，context.state将作为window.__INITIAL_STATE__状态，自动嵌入到html
//  在客户端在挂载到应用程序之前store就应该获取到状态
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => { //  等到router将可能的异步组件和钩子函数解析完
  router.beforeResolve((to, from, next) => { //  在导航被确认之前同时在所有组件内守卫和异步路由组件被解析之后调用
    const matched = router.getMatchedComponents(to) //  返回目标位置或当前路由匹配的组件数组
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => { //  取出to和from相同项
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    //  由于此函数会在组件实例化之前调用，所以无法访问this，要将store和路由信息传递进去
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

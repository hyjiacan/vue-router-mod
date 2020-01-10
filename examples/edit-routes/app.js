import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

// 2. Define route components
const Home = { template: '<div>home</div>' }
const Old = { template: '<div>old</div>', name: 'Old' }
const New = { template: '<div>new</div>', name: 'New' }

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/test', component: Old }
  ]
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
  router,
  data: () => ({ component: Old, message: null }),
  template: `
    <div id="app">
      <h1>Edit routes</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/test">/test</router-link></li>
      </ul>
      <button id="replace-btn" @click="replaceRoute">Switch /test</button>
      <button id="remove-btn" @click="removeRoute">Remove /test</button>
      <pre> Current component for <b>/test</b>: <span id="name">{{ component.name }}</span></pre>
      <pre style="color: red;" id="message"> {{message}} </pre>
      <router-view class="view"></router-view>
    </div>
  `,

  methods: {
    replaceRoute () {
      try {
        const component = this.component === Old ? New : Old
        this.$router.replaceRoutes({
          path: '/test',
          component: component
        })
        this.component = component
        if (this.$route.path !== '/') {
          this.$router.replace('/')
        }
      } catch (e) {
        this.message = e.message
      }
    },
    removeRoute () {
      try {
        this.$router.removeRoute('/test')
      } catch (e) {
        this.message = e.message
      }
    }
  }
}).$mount('#app')

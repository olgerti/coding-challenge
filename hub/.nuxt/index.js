import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '~/.nuxt/layouts.Error.50ec2a52.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_srcplugin4375f3ce_38e84406 from 'nuxt_plugin_srcplugin4375f3ce_38e84406' // Source: .\\src.plugin.4375f3ce.js (mode: 'all')
import nuxt_plugin_srcplugin3a962260_01386e84 from 'nuxt_plugin_srcplugin3a962260_01386e84' // Source: .\\src.plugin.3a962260.js (mode: 'all')
import nuxt_plugin_srcplugina96fd7c6_9782b24a from 'nuxt_plugin_srcplugina96fd7c6_9782b24a' // Source: .\\src.plugin.a96fd7c6.js (mode: 'all')
import nuxt_plugin_srcplugin458e62b4_24d172e6 from 'nuxt_plugin_srcplugin458e62b4_24d172e6' // Source: .\\src.plugin.458e62b4.js (mode: 'all')
import nuxt_plugin_srcplugin0d4618d4_11f161bc from 'nuxt_plugin_srcplugin0d4618d4_11f161bc' // Source: .\\src.plugin.0d4618d4.js (mode: 'all')
import nuxt_plugin_srcplugin6a304ba6_d5cabe84 from 'nuxt_plugin_srcplugin6a304ba6_d5cabe84' // Source: .\\src.plugin.6a304ba6.js (mode: 'all')
import nuxt_plugin_srcpluginb2a0af6a_483aed9a from 'nuxt_plugin_srcpluginb2a0af6a_483aed9a' // Source: .\\src.plugin.b2a0af6a.js (mode: 'all')
import nuxt_plugin_srcplugin5bdd5d5a_b565ac3e from 'nuxt_plugin_srcplugin5bdd5d5a_b565ac3e' // Source: .\\src.plugin.5bdd5d5a.js (mode: 'all')
import nuxt_plugin_axios_7f668544 from 'nuxt_plugin_axios_7f668544' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_srcpluginc7242184_0e55ae90 from 'nuxt_plugin_srcpluginc7242184_0e55ae90' // Source: .\\src.plugin.c7242184.js (mode: 'all')
import nuxt_plugin_auth_f8952928 from 'nuxt_plugin_auth_f8952928' // Source: .\\auth.js (mode: 'all')
import nuxt_plugin_acl_79bdafba from 'nuxt_plugin_acl_79bdafba' // Source: ..\\plugins\\acl.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":(titleChunk) => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `GetCandy // ${titleChunk} ` : 'GetCandy';
    },"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"GetCandy Hub"}],"link":[{"rel":"shortcut icon","type":"image\u002Fpng","href":"\u002Ffavicon.png"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_srcplugin4375f3ce_38e84406 === 'function') {
    await nuxt_plugin_srcplugin4375f3ce_38e84406(app.context, inject)
  }

  if (typeof nuxt_plugin_srcplugin3a962260_01386e84 === 'function') {
    await nuxt_plugin_srcplugin3a962260_01386e84(app.context, inject)
  }

  if (typeof nuxt_plugin_srcplugina96fd7c6_9782b24a === 'function') {
    await nuxt_plugin_srcplugina96fd7c6_9782b24a(app.context, inject)
  }

  if (typeof nuxt_plugin_srcplugin458e62b4_24d172e6 === 'function') {
    await nuxt_plugin_srcplugin458e62b4_24d172e6(app.context, inject)
  }

  if (typeof nuxt_plugin_srcplugin0d4618d4_11f161bc === 'function') {
    await nuxt_plugin_srcplugin0d4618d4_11f161bc(app.context, inject)
  }

  if (typeof nuxt_plugin_srcplugin6a304ba6_d5cabe84 === 'function') {
    await nuxt_plugin_srcplugin6a304ba6_d5cabe84(app.context, inject)
  }

  if (typeof nuxt_plugin_srcpluginb2a0af6a_483aed9a === 'function') {
    await nuxt_plugin_srcpluginb2a0af6a_483aed9a(app.context, inject)
  }

  if (typeof nuxt_plugin_srcplugin5bdd5d5a_b565ac3e === 'function') {
    await nuxt_plugin_srcplugin5bdd5d5a_b565ac3e(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_7f668544 === 'function') {
    await nuxt_plugin_axios_7f668544(app.context, inject)
  }

  if (typeof nuxt_plugin_srcpluginc7242184_0e55ae90 === 'function') {
    await nuxt_plugin_srcpluginc7242184_0e55ae90(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_f8952928 === 'function') {
    await nuxt_plugin_auth_f8952928(app.context, inject)
  }

  if (typeof nuxt_plugin_acl_79bdafba === 'function') {
    await nuxt_plugin_acl_79bdafba(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }

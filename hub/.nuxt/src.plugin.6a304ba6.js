import CollectionIndex from './collections/pages/CollectionIndex.vue'
import CollectionDetails from './collections/pages/edit/CollectionDetails.vue'
import CollectionMedia from './collections/pages/edit/CollectionMedia.vue'
import CollectionAvailability from './collections/pages/edit/CollectionAvailability.vue'
import CollectionAssociations from './collections/pages/edit/CollectionAssociations.vue'
import CollectionRoutes from './collections/pages/edit/CollectionRoutes.vue'
import { state, mutations, actions } from './collections/store/collections.js';

export default ({ app }, inject) => {
  const options = {
  "preview_url": "http://storefront.test/collections/preview/:id"
}

  const routes = [
    {
      path: '/catalogue-manager/collections',
      name: 'collections',
      component: CollectionIndex,
      meta: {
        permissions: ['manage-catalogue', 'manage-collections']
      }
    },
    {
        path: '/catalogue-manager/collections/:id',
        name: 'collections.edit.details',
        component: CollectionDetails,
        meta: {
          permissions: ['manage-catalogue', 'manage-collections']
        }
    },
    {
        path: '/catalogue-manager/collections/:id/media',
        name: 'collections.edit.media',
        component: CollectionMedia,
        meta: {
          permissions: ['manage-catalogue', 'manage-collections']
        }
    },
    {
        path: '/catalogue-manager/collections/:id/availability',
        name: 'collections.edit.availability',
        component: CollectionAvailability,
        meta: {
          permissions: ['manage-catalogue', 'manage-collections']
        }
    },
    {
        path: '/catalogue-manager/collections/:id/associations',
        name: 'collections.edit.associations',
        component: CollectionAssociations,
        meta: {
          permissions: ['manage-catalogue', 'manage-collections']
        }
    },
    {
        path: '/catalogue-manager/collections/:id/routes',
        name: 'collections.edit.routes',
        component: CollectionRoutes,
        meta: {
          permissions: ['manage-catalogue', 'manage-collections']
        }
    }
  ]

  routes.forEach(route => {
    app.router.addRoute(route)
  });

  // Add our store module
  app.store.registerModule('collections', {
    namespaced: true,
    state,
    mutations,
    actions
  })

  app.store.commit('collections/setConfig', options)

  app.store.dispatch('addNavItems', {
    section: 'catalogue-manager',
    items: [
      {
        label: 'Collections',
        position: 20,
        access: ['manage-catalogue', 'manage-collections'],
        route: {
          name: 'collections'
        }
      }
    ]
  })

//   app.$hooks.hook('products.associations.tabs', (items) => {
//     items.push({
//         title: 'Categories',
//         component: CategoryAssociations
//     })
//   })

  // app.$hooks.hook('tree-test', async (items) => {
  //   items.push('four');
  // })
}

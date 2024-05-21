const PropertiesRoutes = [
  {
    path: '/properties',
    name: 'properties-list',
    component: () => import('@/views/properties/PropertyListView.vue'),
    meta: {
      title: 'Properties',
      requiresAuth: true
    }
  },
  {
    path: '/properties/create',
    name: 'property-create',
    component: () => import('@/views/properties/PropertyFormView.vue'),
    meta: {
      title: 'Create Property',
      requiresAuth: true
    }
  },
  {
    path: '/properties/:id',
    name: 'property-details',
    component: () => import('@/views/properties/PropertyDetailView.vue'),
    meta: {
      title: 'Property Details',
      requiresAuth: true
    }
  }
]

export default PropertiesRoutes

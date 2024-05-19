const PropertiesRoutes = [
  {
    path: '/properties',
    name: 'properties-list',
    component: () => import('@/views/properties/PropertyListView.vue')
  },
  {
    path: '/properties/create',
    name: 'property-create',
    component: () => import('@/views/properties/PropertyFormView.vue')
  },
  {
    path: '/properties/:id',
    name: 'property-details',
    component: () => import('@/views/properties/PropertyDetailView.vue')
  }
]

export default PropertiesRoutes

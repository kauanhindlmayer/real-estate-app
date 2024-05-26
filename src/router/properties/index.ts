const PropertiesRoutes = [
  {
    path: '/properties',
    name: 'properties-list',
    component: () => import('@/views/properties/PropertyList.vue'),
    meta: {
      title: 'Properties'
    }
  },
  {
    path: '/properties/advertise',
    name: 'property-advertise',
    component: () => import('@/views/properties/PropertyCreate.vue'),
    meta: {
      title: 'Advertise'
    }
  },
  {
    path: '/properties/:id',
    name: 'property-details',
    component: () => import('@/views/properties/PropertyDetails.vue'),
    meta: {
      title: 'Details'
    }
  }
]

export default PropertiesRoutes

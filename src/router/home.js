export default {
  path: '/home',
  name: 'home',
  redirect: '/home/summary',
  component: () => import('@/components/AppLayout.vue'),
  children: [
    {
      path: '/home/summary',
      name: 'summary',
      component: () => import('@views/home/summary.vue')
    }
  ]
}

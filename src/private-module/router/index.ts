 
import PrivateLayout  from '../layout/PrivateLayout.vue'

export default { 
    component: PrivateLayout, 
    redirect: { path:"" },
    children: [
        {
            path: "",
            name: "home",
            meta: { requiresAuth: true },
            component: () => import('../Views/Home.vue'),
        },
        {
            path: "politicas",
            name: "politicas",
            meta: { requiresAuth: true },
            component: () => import('../Views/Politicas.vue'),
        }
    ]
}
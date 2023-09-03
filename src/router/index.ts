import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{ path: '/', component: () => import('../pages/PageMain.vue') },
	{ path: '/upload', component: () => import('../pages/UploadPage.vue') },
	{ path: '/recognition', component: () => import('../pages/RecognitionPage.vue') },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

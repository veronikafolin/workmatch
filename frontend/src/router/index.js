import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import CompanyHomeView from '../views/company/CompanyHomeView.vue'
import StudentHomeView from '../views/student/StudentHomeView.vue'
import StudentDetailView from '../views/company/CompanyStudentDetailView.vue'
import CompanyNotificationView from '../views/company/CompanyNotificationView.vue'
import CompanyProfileView from '../views/company/CompanyProfileView.vue'
import CompanyJobOffersView from '../views/company/CompanyJobOffersView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/companyhome',
      name: 'companyhome',
      component: CompanyHomeView
    },
    {
      path: '/companynotification',
      name: 'companynotification',
      component: CompanyNotificationView
    },
    {
      path: '/companyprofile',
      name: 'companyprofile',
      component: CompanyProfileView
    },
    {
      path: '/companyjoboffers',
      name: 'companyjoboffers',
      component: CompanyJobOffersView
    },
    {
      path: '/studenthome',
      name: 'studenthome',
      component: StudentHomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/studentdetail:id',
      name: 'studentdetail',
      component: StudentDetailView,
    }
  ]
})

export default router

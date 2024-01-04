import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import CompanyNotificationView from '../views/company/CompanyNotificationView.vue'
import CompanyProfileView from '../views/company/CompanyProfileView.vue'
import CompanyJobOffersView from '../views/company/CompanyJobOffersView.vue'
import CompanyStudentListView from '../views/company/CompanyStudentListView.vue'
import StudentJobOffersView from '../views/student/StudentJobOffersView.vue'
import StudentNotificationView from '../views/student/StudentNotificationView.vue'
import StudentProfileView from '../views/student/StudentProfileView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/companyhome',
      name: 'companyhome',
      component: CompanyStudentListView
    },
    {
      path: '/companyjoboffers',
      name: 'companyjoboffers',
      component: CompanyJobOffersView
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
      path: '/studenthome',
      name: 'studenthome',
      component: StudentJobOffersView
    },
    {
      path: '/studentnotification',
      name: 'studentnotification',
      component: StudentNotificationView
    },
    {
      path: '/studentprofile',
      name: 'studentprofile',
      component: StudentProfileView
    }
  ]
})

export default router

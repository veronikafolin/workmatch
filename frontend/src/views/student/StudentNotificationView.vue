<script setup>
import CompanyDetail from '../../components/student/CompanyDetail.vue'
import StudentMenu from '../../components/student/StudentMenu.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
    return {
      notifications: [],
      dialogVisible: false,
      companies: [],
      company: ''
    };
  },
  methods: {
    requestNotifications(){
      let userId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/notifications?id=${userId}`)
          .then(res => {
            this.notifications = res.data;
          });
    },
    requestCompanies(){
      axios
          .get("http://localhost:3000/api/companies")
          .then(res => { this.companies = res.data });
    },
    getCompany(companyId){
      return this.companies.find(company => {
        return company._id === companyId;})
    }
    },
    beforeMount() {
      this.requestNotifications();
      this.requestCompanies();
    }
}

</script>


<template>
  <main>
    <nav>
      <StudentMenu/>
    </nav>

    <div class="card justify-content-center">

      <Card v-for="notification in notifications">
        <template #title> {{notification.title}} </template>
        <template #subtitle>
          when: {{notification.timestamp}} <br>
          from: {{notification.senderUsername}}
        </template>
        <template #footer>
          <Button label="Show company" icon="pi pi-external-link" @focus="this.company=getCompany(notification.from);" @click="dialogVisible = true"/>
        </template>
      </Card>

      <CompanyDetail v-model:visible="dialogVisible" :company=this.company></CompanyDetail>

    </div>

  </main>
</template>



<style>
.p-card {
  margin-top: 30px;
}
</style>
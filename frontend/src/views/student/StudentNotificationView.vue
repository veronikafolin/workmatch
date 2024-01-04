<script setup>
import CompanyDetail from '../../components/student/CompanyDetail.vue'
import StudentMenu from '../../components/student/StudentMenu.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
    return {
      messages: [],
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
    },
    markNotificationAsRead(notification){
      axios
          .put('http://localhost:3000/api/markNotificationAsRead', {
            id: notification._id,
            update: {
              from: notification.from,
              senderUsername: notification.senderUsername,
              to: notification.to,
              title: notification.title,
              description: notification.description,
              read: true
            }
          }).then(res => {
            let response = res.data
            if (response.message.includes('Error')) {
              this.messages.push({severity: 'error', content: response.message})
            } else {
              this.requestNotifications();
            }
          }
      );
    },
    setColorNotification(read){
      if (read) {
        return "notification-read"
      } else {
        return "notification-unread"
      }
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
        <template #title>
          <span :class="setColorNotification(notification.read)">
            {{notification.title}}
          </span>
        </template>
        <template #subtitle>
          when: {{notification.timestamp}}
        </template>
        <template #footer>
          <div class="button-container justify-content-start">
            <Button label="More info" icon="pi pi-external-link" @focus="this.company=getCompany(notification.from);" @click="dialogVisible = true"/>
            <Button label="Mark as read" icon="pi pi-eye" @click="markNotificationAsRead(notification); setColorNotification(notification.read);" :disabled="notification.read" />
          </div>
         </template>

        <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>

      </Card>

      <CompanyDetail v-model:visible="dialogVisible" :company=this.company></CompanyDetail>

    </div>

  </main>
</template>

<style>

.notification-unread {
  background-color: var(--red-500);
}

.notification-read {
  background-color: white;
}

</style>
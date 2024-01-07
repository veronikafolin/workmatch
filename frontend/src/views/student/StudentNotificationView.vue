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
      company: '',
      imageUrl: ''
    };
  },
  computed: {
    readNotifications() {
      return this.notifications.filter(notification => notification.read);
    },
    unReadNotifications() {
      return this.notifications.filter(notification => !notification.read);
    }
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
    },
    async getProfileImage(studentId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/getImage?id=${studentId}`, {
          responseType: 'arraybuffer',
        });
        // Convert binary data to Base64 for image display
        const base64Image = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );
        // Create the image URL using Base64 representation
        this.imageUrl = `data:image/png;base64,${base64Image}`; // Adjust based on image type
      } catch (error) {
        console.error('Error fetching image:', error);
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

    <div class="card justify-content-center flex flex-column gap-3">

      <span class="notification-section">To read</span>

      <span class="notification-section-message" v-if="unReadNotifications.length === 0">
        Nothing to read!
      </span>

      <Card v-for="notification in unReadNotifications" :class="setColorNotification(notification.read)">
        <template #title>
          {{notification.title}}
        </template>
        <template #subtitle>
          when: {{notification.timestamp}}
        </template>
        <template #footer>
          <div class="button-container justify-content-end">
            <Button class="button-more-info" label="More info" icon="pi pi-external-link" @focus="this.company=getCompany(notification.from); this.imageUrl=getProfileImage(company._id);" @click="dialogVisible = true"/>
            <Button label="Mark as read" icon="pi pi-eye" @click="markNotificationAsRead(notification); setColorNotification(notification.read);" :disabled="notification.read" />
          </div>
        </template>

        <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>
      </Card>

      <span class="notification-section" v-if="readNotifications.length !== 0">Read</span>

      <Card v-for="notification in readNotifications" :class="setColorNotification(notification.read)">
        <template #title>
          {{notification.title}}
        </template>
        <template #subtitle>
          when: {{notification.timestamp}}
        </template>
        <template #footer>
          <div class="button-container justify-content-end">
            <Button class="button-more-info" label="More info" icon="pi pi-external-link" @focus="this.company=getCompany(notification.from); this.imageUrl=getProfileImage(company._id);" @click="dialogVisible = true"/>
            <Button label="Mark as read" icon="pi pi-eye" @click="markNotificationAsRead(notification); setColorNotification(notification.read);" :disabled="notification.read" />
          </div>
        </template>

        <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>
      </Card>

      <CompanyDetail v-model:visible="dialogVisible" :company=this.company :imageUrl=this.imageUrl></CompanyDetail>

    </div>

  </main>

</template>
<script setup></script>

<script>
import axios from "axios";

export default {
    props: {
      company: {type:Object}
    },
    data() {
      return {
      }
    },
    methods:{
      sendNotificationToCompany(companyId){
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;

        const notification = {
          from: localStorage.userId,
          senderUsername: localStorage.username,
          to: companyId,
          timestamp: dateTime,
          title: "A student is interested in your company",
          read: false
        }

        this.$socket.emit('notification', notification);

        axios
            .post('http://localhost:3000/api/saveNotification', {
              notification: notification,
            }).then(res => {
              let response = res.data
              if (response.message.includes('Error')) {
                console.log("Error on saving the notification.")
              } else {
                this.$toast.add({ severity: 'info', summary: 'New notification', detail: "Notification sent to the company.", life: 3000 });
              }
            }
        );
      }
    }
}
</script>

<template>

  <Dialog modal :style="{ width: '50vw' }">
    <p class="text-900 font-medium mb-2 text-xl"> {{company.name}} </p>
    <p class="mt-0 mb-4 p-0 line-height-3">
      Email: {{company.email}} <br>
      city: {{company.city}} <br>
      address: {{company.address}} <br>
      phone number: {{company.phone_number}}
    </p>
    <p>
      {{company.description}}
    </p>
    <template #footer>
      <Toast />
      <Button label="I'm interested!" icon="pi pi-thumbs-up" @click=sendNotificationToCompany(company._id) text />
    </template>
  </Dialog>

</template>

<style scoped>

.p-float-label {
    margin-top: 15px;
    text-align: left;
  }

</style>
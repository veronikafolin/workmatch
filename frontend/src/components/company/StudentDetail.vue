<script setup></script>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
    props: {
      student: {type:Object},
      school: {type:Object}
    },
    data() {
      return {
        socket: io()
      }
    },
    methods:{
      sendNotificationToStudent(studentId){
        this.socket.emit('notification', {notification: "prova"})
        this.$toast.add({ severity: 'info', summary: 'New notification', detail: "Notification sended to the student.", life: 3000 });
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;
        axios
            .post('http://localhost:3000/api/saveNotification', {
              notification: {
                from: localStorage.userId,
                senderUsername: localStorage.username,
                to: studentId,
                timestamp: dateTime,
                title: "A company is interested in your profile",
                message: "Prova"
              }
            }).then(res => {
              let response = res.data
              if (response.message.includes('Error')) {
                console.log("Error on saving the notification.")
              } else {
                console.log("The notification has been saved.")
              }
            }
        );
      }
    }
}
</script>

<template>

  <Dialog modal :style="{ width: '50vw' }">
    <p class="text-900 font-medium mb-2 text-xl"> {{student.name}} {{student.surname}} </p>
    <p class="mt-0 mb-4 p-0 line-height-3">
      Email: {{student.email}}
    </p>
    <p>
      School: {{school.name}} <br>
      School type: {{school.type}} <br>
      Curriculum: {{student.curriculum}} <br>
      Grade: {{student.grade}}
    </p>
    <template #footer>
      <Toast />
      <Button label="I'm interested!" icon="pi pi-thumbs-up" @click=sendNotificationToStudent(student._id) text />
    </template>
  </Dialog>

</template>

<style scoped>

.p-float-label {
    margin-top: 15px;
    text-align: left;
  }

</style>
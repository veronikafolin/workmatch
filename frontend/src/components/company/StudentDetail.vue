<script setup></script>

<script>
import axios from "axios";

export default {
    props: {
      student: {type:Object},
      school: {type:Object},
      imageUrl: {type: String}
    },
    data() {
      return {
      }
    },
    methods:{
      sendNotificationToStudent(studentId){
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;

        const notification = {
          from: localStorage.userId,
          senderUsername: localStorage.username,
          to: studentId,
          timestamp: dateTime,
          title: localStorage.username + " is interested in your profile.",
          read: false
        }

        axios
            .post('http://localhost:3000/api/saveNotification', {
              notification: notification,
            }).then(res => {
              let response = res.data
              if (response.message.includes('Error')) {
                console.log("Error on saving the notification.")
              } else {
                this.$toast.add({ severity: 'info', summary: 'New notification', detail: "You have notified the student that you are interested in.", life: 3000 });
              }
            }
        );
      }
    }
}
</script>

<template>

  <Dialog modal :style="{ width: '50vw' }">
    <div>
      <img :src="imageUrl" alt="Image" />
    </div>
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
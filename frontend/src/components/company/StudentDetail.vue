<script setup></script>

<script>
import axios from "axios";

export default {
    props: {
      student: {type:Object},
      school: {type:Object},
      imageUrl: {type: String},
      interests: {type: Array}
    },
    data() {
      return {

      }
    },
    methods:{
      requestInterests(){
        let userId = localStorage.userId;
        axios
            .get(`http://localhost:3000/api/interests?id=${userId}`)
            .then(res => {
              this.interests = res.data;
            });
      },
      alreadyInterested(studentId){
        return this.interests.some(
            notification => notification.to === studentId
        );
      },
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
                this.requestInterests();
                this.$emit('send-data', response);
                this.$toast.add({ severity: 'info', summary: 'New notification', detail: "You have notified the student that you are interested in.", life: 3000 });
              }
            }
        );
      }
    },
  beforeMount() {
      this.requestInterests();
  }
}
</script>

<template>

  <Dialog modal class="card justify-content-center profile-card flex flex-column align-items-center">

    <template #header>
      <h2>{{student.name}} {{student.surname}}</h2>
    </template>

    <div>
      <img id="profileImage" :src="this.imageUrl" alt="Image" />
    </div>

    <div class="card-profile-content">
      <br>
      <strong> Username: </strong> {{student.username}} <br>
      <strong> E-mail: </strong> {{student.email}} <br>
      <strong> School: </strong> {{school.name}} <br>
      <strong> School type: </strong> {{school.type}} <br>
      <strong> Grade: </strong> {{student.grade}} <br>
      <strong> Curriculum: </strong> {{student.curriculum}}
    </div>

    <template #footer>
      <div class="button-container justify-content-end">
        <Button label="I'm interested!" icon="pi pi-thumbs-up" @click="sendNotificationToStudent(student._id); " text :disabled="this.alreadyInterested(student._id)" />
      </div>
    </template>

    <Toast />

  </Dialog>

</template>
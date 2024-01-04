<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
import StudentDetail from '../../components/company/StudentDetail.vue'
import StudentImage from '../../components/company/StudentImage.vue'
</script>

<script>

import axios from "axios";
import path from "path";

export default {
  data() {
        return {
          dialogVisible: false,
          students: [],
          schools: [],
          school: '',
          student: '',
          imageUrl: '',
          imageVisible: false
        };
    },
  methods:{
    requestStudents(){
      axios
          .get("http://localhost:3000/api/students")
          .then(res => { this.students = res.data });
    },
    requestSchools(){
      axios
          .get("http://localhost:3000/api/schools")
          .then(res => { this.schools = res.data });
    },
    getSchool(schoolId){
      return this.schools.find(school => {
        return school._id === schoolId;})
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
              this.$toast.add({ severity: 'info', summary: 'New notification', detail: "You have notified the student that you are interested in.", life: 3000 });
            }
          }
      );
    }
  },
    beforeMount() {
      this.requestSchools();
      this.requestStudents();
    }
}

</script>


<template>

  <main>

    <nav>
        <CompanyMenu/>
    </nav>

    <div class="card justify-content-center cards-container">

      <Card class="single-card" v-for="student in students">

        <template #title> {{student.name}} {{student.surname}} </template>

        <template #subtitle> {{student.email}} </template>

        <template #content >
          <StudentImage :imageUrl=this.imageUrl></StudentImage>
          <strong>School: </strong> {{this.getSchool(student.school)["name"]}} <br>
          <strong>School type: </strong> {{this.getSchool(student.school)["type"]}} <br>
          <strong>Curriculum: </strong> {{student.curriculum}} <br>
          <strong>Grade: </strong> {{student.grade}}
        </template>

        <template #footer>
          <Button label="I'm interested!" icon="pi pi-thumbs-up" @click="sendNotificationToStudent(student._id); " text />
        </template>
      </Card>


    </div>

    <Toast/>

  </main>
</template>
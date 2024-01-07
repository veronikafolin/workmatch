<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
import StudentDetail from '../../components/company/StudentDetail.vue'
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
          curriculums: [],
          curriculumSelected: null,
          interests: []
        };
    },
  computed: {
    studentFiltered(){
      if (this.curriculumSelected !== null){
        return this.students.filter(student => {
          return student.curriculum === this.curriculumSelected;
        } )
      } else {
        return this.students;
      }
    }
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
    requestCurriculums(){
      axios
          .get("http://localhost:3000/api/curriculums")
          .then(res => { this.curriculums = res.data });
    },
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
              this.requestInterests();
              this.$toast.add({ severity: 'info', summary: 'New notification', detail: "You have notified the student that you are interested in.", life: 3000 });
            }
          }
      );
    },
    receiveChangesFromChild(data) {
      this.requestInterests();
    }
  },
    beforeMount() {
      this.requestSchools();
      this.requestStudents();
      this.requestCurriculums();
      this.requestInterests();
    }
}

</script>


<template>

  <main>

    <nav>
        <CompanyMenu/>
    </nav>

    <div id="filter-dropdown" class="card flex justify-content-end">
      <span class="p-float-label">
        <Dropdown id="curriculums-selector" v-model="this.curriculumSelected" :options="this.curriculums" class="w-full md:w-14rem" editable showClear />
        <label for="curriculums-selector">Filter by curriculum </label>
      </span>
    </div>

    <div class="card cards-container">

      <Card class="single-card" v-for="student in studentFiltered">

        <template #title> {{student.name}} {{student.surname}} </template>

<!--        <template #subtitle> {{student.email}} </template>-->

        <template #content >
          <strong>School: </strong> {{this.getSchool(student.school)["name"]}} <br>
          <strong>School type: </strong> {{this.getSchool(student.school)["type"]}} <br>
          <strong>Curriculum: </strong> {{student.curriculum}} <br>
<!--          <strong>Grade: </strong> {{student.grade}}-->
        </template>

        <template #footer>
          <div class="button-container justify-content-end">
            <Button class="button-more-info" label="More info" icon="pi pi-external-link" @focus="this.student=student; this.school=this.getSchool(student.school); this.imageUrl=getProfileImage(student._id);" @click="dialogVisible = true"/>
            <Button label="I'm interested!" icon="pi pi-thumbs-up" @click="sendNotificationToStudent(student._id); " text :disabled="this.alreadyInterested(student._id)" />
          </div>
        </template>

      </Card>

      <StudentDetail @send-data="receiveChangesFromChild" v-model:visible="dialogVisible" :student=this.student :school=this.school :imageUrl=this.imageUrl :interests=this.interests ></StudentDetail>

    </div>

    <Toast/>

  </main>
</template>
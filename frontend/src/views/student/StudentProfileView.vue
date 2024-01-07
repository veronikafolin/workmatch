<script setup>
import StudentMenu from '../../components/student/StudentMenu.vue'
import UpdateProfileFormStudent from '../../components/student/UpdateProfileFormStudent.vue'</script>

<script>

import axios from "axios";
import router from "../../router";

export default{
  data(){
    return {
      student: '',
      schools: [],
      school: '',
      modifyProfile: false,
      profileDeleted: false,
      messages: [],
      imageUrl: ''
    };
  },
  methods:{
    requestStudent() {
      let studentId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/student?id=${studentId}`)
          .then(res => {
            this.student = res.data;
          });
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
    deleteProfile(){
      let userId = localStorage.userId;
      let userType = localStorage.userType.toLowerCase();
      axios
          .delete(`http://localhost:3000/api/deleteProfile?id=${userId}&userType=${userType}`)
          .then(res => {
                let response = res.data
                if (response.message.includes('Error')) {
                  this.messages.push({severity: 'error', content: response.message})
                } else {
                  let content = response.message + "You will shortly be redirected to the log in page."
                  this.messages.push({severity: 'success', content: content})
                  this.profileDeleted = true
                  setTimeout(() => router.replace('/'), 3000);
                }
              }
          )
    },
    confirmDelete() {
      this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
          this.deleteProfile();
        },
        reject: () => {

        }
      });
    },
    async getProfileImage() {
      let studentId = localStorage.userId;
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
    receiveChangesFromChild(data) {
      // Handle the received data from the child component
      this.messages.push({severity: 'success', content: data.message})
      this.requestStudent();
      this.modifyProfile = false;
    }
  },
  beforeMount() {
    this.requestStudent();
    this.requestSchools();
    this.getProfileImage();
  }
}

</script>

<template>
  <main>

    <nav>
      <StudentMenu/>
    </nav>

    <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>

    <div class="card justify-content-center">

      <Card class="profile-card flex flex-column align-items-center">
        <template #title> {{student.name}} {{student.surname}}</template>
        <template #content>
          <div>
            <img id="profileImage" :src="this.imageUrl" alt="Image" />
          </div>
          <br>
          <strong> Username: </strong> {{student.username}} <br>
          <strong> E-mail: </strong> {{student.email}} <br>
          <strong> School: </strong> {{getSchool(student.school)?.name}} <br>
          <strong> School type: </strong> {{getSchool(student.school)?.type}} <br>
          <strong> Grade: </strong> {{student.grade}} <br>
          <strong> Curriculum: </strong> {{student.curriculum}}
        </template>
        <template #footer>
          <div class="button-container">
            <Button label="Edit" icon="pi pi-pencil" @click="modifyProfile = true" />
            <Button id="button-danger" @click="confirmDelete()" icon="pi pi-trash" label="Delete" />
          </div>
        </template>
      </Card>

      <Dialog v-model:visible="modifyProfile" id="modify-profile-form">
        <UpdateProfileFormStudent @send-data="receiveChangesFromChild"></UpdateProfileFormStudent>
      </Dialog>

    </div>

    <div v-if="profileDeleted" class="card flex justify-content-center">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
                       animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>

  </main>
</template>
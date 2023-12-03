<script setup>
import StudentMenu from '../../components/student/StudentMenu.vue'
import UpdateProfileFormStudent from '../../components/student/UpdateProfileFormStudent.vue'
</script>

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
      deleteProfile: false,
      messages: []
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
        return school._id === schoolId;})?.name
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
                  this.deleteProfile = true
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
          this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          this.deleteProfile();
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    }
  },
  beforeMount() {
    this.requestStudent();
    this.requestSchools();
  }
}

</script>

<template>
  <main>

    <nav>
      <StudentMenu/>
    </nav>

    <div class="card justify-content-center">

      <Card>
        <template #title> {{student.name}} {{student.surname}}</template>
        <template #content>
          E-mail: {{student.email}} <br>
          School: {{getSchool(student.school)}} <br>
          Grade: {{student.grade}} <br>
          Curriculum: {{student.curriculum}}
        </template>
        <template #footer>
          <Button label="Modify" icon="pi pi-pencil" @click="modifyProfile = true" />
          <Toast />
          <ConfirmDialog></ConfirmDialog>
          <Button @click="confirmDelete()" icon="pi pi-times" label="Delete profile"></Button>
        </template>
      </Card>

      <Dialog v-model:visible="modifyProfile" modal :style="{ width: '50vw' }">
        <UpdateProfileFormStudent></UpdateProfileFormStudent>
      </Dialog>

    </div>

    <div v-if="deleteProfile" class="card flex justify-content-center">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
                       animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>

    <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

  </main>
</template>
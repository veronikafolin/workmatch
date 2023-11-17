<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
import StudentDetail from '../../components/company/StudentDetail.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
    return {
      notifications: [],
      dialogVisible: false,
      students: [],
      schools: [],
      student: '',
      school: ''
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
    getStudent(studentId){
      return this.students.find(student => {
        return student._id === studentId;})
    }
  },
  beforeMount() {
    this.requestNotifications();
    this.requestStudents();
    this.requestSchools();
  }
}

</script>


<template>
  <main>
    <nav>
      <CompanyMenu/>
    </nav>

    <div class="card justify-content-center">

      <Card v-for="notification in notifications">
        <template #title> {{notification.title}} </template>
        <template #subtitle>
          when: {{notification.timestamp}} <br>
          from: {{notification.senderUsername}}
        </template>
        <template #footer>
          <Button label="Show" icon="pi pi-external-link" @focus="this.student=getStudent(notification.from); this.school=this.getSchool(this.student.school);" @click="dialogVisible = true"/>
        </template>
      </Card>

      <StudentDetail v-model:visible="dialogVisible" :student=this.student :school=this.school></StudentDetail>

    </div>

  </main>
</template>



<style>
.p-card {
  margin-top: 30px;
}
</style>
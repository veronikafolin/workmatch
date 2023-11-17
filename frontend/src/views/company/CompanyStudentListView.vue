<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
import StudentDetail from '../../components/company/StudentDetail.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
        return {
          dialogVisible: false,
          students: [],
          schools: [],
          school: '',
          student: ''
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
    }
  },
    beforeMount() {
      this.requestSchools();
    },
    mounted() {
      this.requestStudents();
    }
}

</script>


<template>
  <main>
    <nav>
        <CompanyMenu/>
    </nav>

    <div class="card justify-content-center">

      <Card v-for="student in students">
        <template #title> {{student.name}} {{student.surname}} </template>
        <template #footer>
          <Button label="Show" icon="pi pi-external-link" @focus="this.school=this.getSchool(student.school); this.student=student;" @click="dialogVisible = true"/>
        </template>
      </Card>

      <StudentDetail v-model:visible="dialogVisible" :student=this.student :school=this.school></StudentDetail>

    </div>

  </main>
</template>

<style>
</style>
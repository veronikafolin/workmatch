<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
        return {
          students: [],
          schools: []
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
        return school._id === schoolId;
      });
    }
  },
  mounted(){
    this.requestStudents();
  },
  beforeMount() {
    this.requestSchools();
  }
}

</script>


<template>
  <main>
    <nav>
        <CompanyMenu/>
    </nav>

    <Card v-for="student in students">
        <template #title>
            {{student.name}} {{student.surname}}
        </template>
        <template #content>
            School: {{getSchool(student.school)["name"]}} <br>
            School type: {{getSchool(student.school)["type"]}} <br>
            Curriculum: {{student.curriculum}}
        </template>
        <template #footer>
          <router-link v-bind:to="{name: 'studentdetail', params: { id: student._id }}" custom v-slot="{navigate}">
            <Button label="See more" class="p-button-raised p-button-rounded" @click="navigate" role="link"/>
          </router-link>
        </template>
    </Card>

  </main>
</template>



<style>
.p-card {
  margin-top: 30px;
}
</style>
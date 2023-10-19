<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
        return {
          visible: false,
          students: [],
          schools: [],
          school: ''
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

    <div class="card justify-content-center" v-for="student in students">

      <Card>
        <template #title> {{student.name}} {{student.surname}} </template>
        <template #subtitle> e-mail: {{student.email}} </template>
        <template #content>
          School: {{getSchool(student.school)["name"]}} <br>
          School type: {{getSchool(student.school)["type"]}} <br>
          Curriculum: {{student.curriculum}}
        </template>
        <template #footer>
          <Button label="Show" icon="pi pi-external-link" @click="visible = true" />
        </template>
      </Card>

      <Dialog v-model:visible="visible" modal header="Dettaglio studente" :style="{ width: '50vw' }">
        <p>
          Name: {{student.name}} {{student.surname}} <br>
          Email: {{student.email}} <br>
          School: {{getSchool(student.school)["name"]}} <br>
          School type: {{getSchool(student.school)["type"]}} <br>
          Curriculum: {{student.curriculum}} <br>
          Grade: {{student.grade}}
        </p>
        <template #footer>
          <Button label="I'm interested!" icon="pi pi-thumbs-up" @click="visible = false" text />
        </template>
      </Dialog>

    </div>

  </main>
</template>

<style>
</style>
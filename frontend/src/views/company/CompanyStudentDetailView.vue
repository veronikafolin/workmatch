<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
        return {
          student: [],
          school: []
        };
    },
  methods:{
    requestStudent(){
        let studentId = this.$route.params.id;
        axios
            .get(`http://localhost:3000/api/student?id=${studentId}`)
            .then(res => { this.student = res.data; });
    },
    requestSchool(){
          let schoolID = this.student.school
          axios
              .get(`http://localhost:3000/api/school?id=${schoolID}`)
              .then(res => { this.school = res.data });
    }},
    beforeMount() {
      this.requestStudent();
      this.requestSchool();
    }
  }

</script>


<template>
  <main>
    <nav>
        <CompanyMenu/>
    </nav>

    <div class="card flex align-items-center justify-content-center">
      <Card>
        <template #title> {{student.name}} {{student.surname}} </template>
        <template #subtitle> e-mail: {{student.email}} </template>
        <template #content>
          School: {{school["name"]}} <br>
          School type: {{school["type"]}} <br>
          Curriculum: {{student.curriculum}}
        </template>
        <template #footer>
          <Button icon="pi pi-heart" label="I'm interested!" />
        </template>
      </Card>
    </div>

  </main>
</template>



<style>
</style>
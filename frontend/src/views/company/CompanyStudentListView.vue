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
          student: '',
          imageUrl: ''
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
          <Button label="Show student" icon="pi pi-external-link" @focus="this.school=this.getSchool(student.school); this.student=student; this.imageUrl=getProfileImage(student._id);" @click="dialogVisible = true"/>
        </template>
      </Card>

      <StudentDetail v-model:visible="dialogVisible" :student=this.student :school=this.school :imageUrl=this.imageUrl ></StudentDetail>

    </div>

  </main>
</template>

<style>
</style>
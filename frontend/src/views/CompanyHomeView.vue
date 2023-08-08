<script setup>
import CompanyMenu from '../components/CompanyMenu.vue'
</script>

<script>

export default {
  data() {
        return {
          students: [],
        };
    },
  methods:{
    requestStudents(){
      axios
        .get("http://localhost:3000/api/students")
        .then(res => { this.students = res.data });
    }
  },
  mounted(){
    this.requestStudents();
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
            School: {{student.school.name}} <br>
            School type: {{student.school.type}} <br>
            Grade: {{student.grade}}
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
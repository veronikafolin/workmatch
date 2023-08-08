<script setup>
import CompanyMenu from '../components/CompanyMenu.vue'
</script>

<script>

export default {
  data() {
        return {
          student: []
        };
    },
  methods:{
    requestStudent(){
        let studentId = this.$route.params.id
        axios
            .get(`http://localhost:3000/api/student?id=${studentId}`)
            .then(res => { this.student = res.data });
    }
  },
  mounted(){
    this.requestStudent()
  }
}

</script>


<template>
  <main>
    <nav>
        <CompanyMenu/>
    </nav>
    {{student.name}} {{student.surname}} {{student.school}}
    
  </main>
</template>



<style>
</style>
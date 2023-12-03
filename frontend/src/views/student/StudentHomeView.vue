<script setup>
import StudentMenu from '../../components/student/StudentMenu.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
    return {
        student: '',
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
    }
  },
  beforeMount(){
    this.requestStudent();
  }
}

</script>


<template>
  <main>
    <nav>
        <StudentMenu/>
    </nav>

    <div>
      <h1>Welcome {{student.name}}!</h1>
    </div>

  </main>
</template>



<style>
.p-card {
  margin-top: 30px;
}
</style>
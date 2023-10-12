<script setup>
import StudentMenu from '../../components/student/StudentMenu.vue'
</script>

<script>

export default {
  data() {
    return {
          message: "",
        };
    },
  methods:{
    requestMessage(){
      axios
        .get(`http://localhost:3000/api/message?id=${localStorage.userId}`, { headers: {Authorization: localStorage.token }})
        .then(res => {
          this.message = res.data.message });
    }
  },
  mounted(){
    this.requestMessage()
  }
}

</script>


<template>
  <main>
    <nav>
        <StudentMenu/>
    </nav>
    Message from backend: {{ this.message }}
  </main>
</template>



<style>
.p-card {
  margin-top: 30px;
}
</style>
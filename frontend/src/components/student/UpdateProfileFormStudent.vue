<script setup></script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      schools: null,
      filteredSchools: null,
      form: {
        name: '',
        surname: '',
        email: '',
        grade: '',
        school: '',
        curriculum: ''
      }
    };
  },
  methods:{
    updateProfile(){
      axios
          .put('http://localhost:3000/api/updateProfile', {
            id: localStorage.userId,
            userType: localStorage.userType,
            update: {
              name: this.form.name,
              surname: this.form.surname,
              email: this.form.email,
              grade: this.form.grade,
              school: this.form.school,
              curriculum: this.form.curriculum
            }
          }).then(res => {
            let response = res.data
            if (response.message.includes('Error')) {
              this.messages.push({severity: 'error', content: response.message})
            } else {
              this.messages.push({severity: 'success', content: response.message})
            }
          }
      );
    },
    requestStudent() {
      let studentId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/student?id=${studentId}`)
          .then(res => {
            let student = res.data;
            this.form.name = student.name;
            this.form.surname = student.surname;
            this.form.email = student.email;
            this.form.grade = student.grade;
            this.form.school = this.getSchool(student.school);
            this.form.curriculum = student.curriculum;
          });
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
    search(event){
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredSchools = [...this.schools];
        } else {
          this.filteredSchools = this.schools.filter((school) => {
            return school.name.toLowerCase().includes(event.query.toLowerCase());
          });
        }
      }, 250);
    }
  },
  beforeMount() {
    this.requestSchools();
    this.requestStudent();
  }
}
</script>

<template>
  <form @submit.prevent="updateProfile">
    <div class="card flex flex-column justify-content-center gap-2">

        <label for="name">Name</label>
        <InputText id="name" type="text" v-model="form.name"/>

        <label for="surname">Surname </label>
        <InputText id="surname" type="text" v-model="form.surname"/>

        <label for="email">Email </label>
        <InputText id="email" type="text" v-model="form.email"/>

        <label for="grade">Grade </label>
        <InputText id="grade" type="text" v-model="form.grade"/>

        <label for="school">School </label>
        <AutoComplete id="school" v-model="form.school" optionLabel="name" :suggestions="filteredSchools"  @complete="search"/>

        <label for="curriculum">Curriculum </label>
        <Dropdown id="curriculum" v-model="form.curriculum" :placeholder=form.curriculum :options="form.school.curriculums" class="w-full md:w-14rem" />

        <Button type="submit"> Submit </Button>
        <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

    </div>
  </form>
</template>

<style scoped>

.p-float-label {
  margin-top: 15px;
  text-align: left;
}

</style>
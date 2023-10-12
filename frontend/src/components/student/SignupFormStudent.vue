<script setup>
</script>

<script>
import axios from "axios";

export default {
    data() {
        return {
            schools: null,
            filteredSchools: null,
            curriculums: null,
            form: {
                name: '',
                surname: '',
                email: '',
                username: '',
                password: '',
                grade: '',
                school: '',
                curriculum: ''
            }
        }
    },
    mounted(){
      this.requestSchools();
    },
    methods:{
        registerStudent(){
            axios
                .post('http://localhost:3000/api/signup', {
                    type: "student",
                    user: {
                        name: this.form.name,
                        surname: this.form.surname,
                        email: this.form.email,
                        username: this.form.username,
                        password: this.form.password,
                        grade: this.form.grade,
                        school: this.form.school,
                        curriculum: this.form.curriculum,
                    }
                }).then(res => console.log(res));
        },
        requestSchools(){
          axios
              .get("http://localhost:3000/api/schools")
              .then(res => { this.schools = res.data });
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
    }
}
</script>

<template>
    <form @submit.prevent="registerStudent">

        <div class="p-form-group-inline">
            <div class="p-float-label">
                <InputText id="name" type="text" v-model="form.name" required/>
                <label for="name">Name </label>
            </div>
            <div class="p-float-label">
                <InputText id="surname" type="text" v-model="form.surname" required/>
                <label for="surname">Surname </label>
            </div>
            <div class="p-float-label">
                <InputText id="email" type="text" v-model="form.email" required/>
                <label for="email">Email </label>
            </div>
            <div class="p-float-label">
                <AutoComplete id="school" v-model="form.school" optionLabel="name" :suggestions="filteredSchools"  @complete="search"/>
                <label for="school">School </label>
            </div>
            <div class="p-float-label">
              <Dropdown v-model="form.curriculum" :options="this.form.school.curriculums" class="w-full md:w-14rem" />
              <label for="school">Curriculum </label>
            </div>
            <div class="p-float-label">
                <InputText id="grade" type="text" v-model="form.grade" required/>
                <label for="grade">Grade </label>
            </div>
            <div class="p-float-label">
              <InputText id="username" type="text" v-model="form.username" required/>
              <label for="username">Username </label>
            </div>
            <div class="p-float-label">
              <PasswordComp id="password" v-model="form.password" toggleMask />
              <label for="password">Password </label>
            </div>
        </div>
        <Button type="submit"> Submit </Button>
    </form>
</template>

<style scoped>

.p-float-label {
    margin-top: 15px;
    text-align: left;
  }

</style>
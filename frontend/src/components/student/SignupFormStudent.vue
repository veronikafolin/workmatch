<script setup>
</script>

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
                }).then(res => {
                  let response = res.data
                  if (response.message.includes('Error')) {
                    this.messages.push({severity: 'error', content: response.message})
                  } else {
                    this.messages.push({severity: 'success', content: response.message})
                    setTimeout(() => router.replace({name: `home`}), 1000);
                  }
                }
            );
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

    <form @submit.prevent="registerStudent" class="flex flex-column gap-3 align-items-center">

        <span class="p-input">
            <InputText id="name" type="text" v-model="form.name" placeholder="Name" required/>
        </span>

        <span class="p-input">
            <InputText id="surname" type="text" v-model="form.surname" placeholder="Surname" required/>
        </span>

        <span class="p-input">
            <InputText id="email" type="text" v-model="form.email" placeholder="Email" required/>
        </span>

        <span class="p-input">
              <AutoComplete id="school" v-model="form.school" optionLabel="name" placeholder="School" :suggestions="filteredSchools"  @complete="search"/>
        </span>

        <span class="p-input">
          <Dropdown id="curriculum" v-model="form.curriculum" placeholder="Curriculum" :options="this.form.school.curriculums" class="w-full md:w-14rem" />
        </span>

        <span class="p-input">
            <InputText id="grade"  type="number" placeholder="Grade" min="60" max="100" v-model="form.grade" required/>
        </span>

        <span class="p-input">
          <InputText id="username" type="text" v-model="form.username" placeholder="Username" required/>
        </span>

        <span class="p-input">
          <Password id="password" v-model="form.password" placeholder="Password" toggleMask required/>
        </span>

        <Button class="w-full" type="submit" label="Submit"/>

        <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

    </form>

</template>
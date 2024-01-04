<script setup></script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      schools: null,
      filteredSchools: null,
      userId: localStorage.userId,
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
              this.$emit('send-data', response);
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
    },
    onAdvancedUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
  },
  beforeMount() {
    this.requestSchools();
    this.requestStudent();
  }
}
</script>

<template>

  <form @submit.prevent="updateProfile" class="flex flex-column gap-3 align-items-center">

    <span class="title_form">Edit Profile</span>

    <span class="p-float-label">
        <InputText id="name" type="text" placeholder="Name" v-model="form.name"/>
        <label for="name">Name </label>
    </span>

    <span class="p-float-label">
        <InputText id="surname" type="text" v-model="form.surname"/>
        <label for="surname">Surname </label>
    </span>

    <span class="p-float-label">
        <InputText id="email" type="text" v-model="form.email"/>
        <label for="email">Email </label>
    </span>

    <span class="p-float-label">
        <InputText id="grade" type="number" min="60" max="100" v-model="form.grade" />
        <label for="grade">Grade </label>
    </span>

    <span class="p-float-label">
        <AutoComplete id="school" v-model="form.school" optionLabel="name" :suggestions="filteredSchools"  @complete="search"/>
        <label for="school">School </label>
    </span>

    <span class="p-float-label">
        <Dropdown id="curriculum" v-model="form.curriculum" :placeholder=form.curriculum :options="form.school.curriculums" class="w-full md:w-14rem" editable />
        <label for="curriculum">Curriculum </label>
    </span>

    <div class="card">
      <Toast />
      <FileUpload id="image" name="image" :url="`http://localhost:3000/api/uploadImage?id=${userId}`" @upload="onAdvancedUpload($event)" accept="image/*" :maxFileSize="1000000">
        <template #empty>
          <p>Drag and drop files here to upload.</p>
        </template>
      </FileUpload>
    </div>

    <Button type="submit" label="Submit" />
    <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>

  </form>
</template>
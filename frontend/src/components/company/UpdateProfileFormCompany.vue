<script setup></script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      userId: localStorage.userId,
      form: {
        name: '',
        city: '',
        address: '',
        description: '',
        phone_number: '',
        email: ''
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
              city: this.form.city,
              address: this.form.address,
              description: this.form.description,
              phone_number: this.form.phone_number,
              email: this.form.email
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
      this.deleteOldImageProfile();
    },
    deleteOldImageProfile(){
      let companyId = localStorage.userId;
      axios
          .delete(`http://localhost:3000/api/deleteImage?id=${companyId}`)
          .then(res => {
                let response = res.data
                if (response.message.includes('Error')) {
                  this.messages.push({severity: 'error', content: response.message})
                } else {
                  this.$emit('send-data', response);
                }
              }
          );
    },
    requestCompany() {
      let companyId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/company?id=${companyId}`)
          .then(res => {
            let company = res.data;
            this.form.name = company.name;
            this.form.city = company.city;
            this.form.address = company.address;
            this.form.description = company.description;
            this.form.phone_number = company.phone_number;
            this.form.email = company.email;
          });
    },
    onAdvancedUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
  },
  beforeMount() {
    this.requestCompany();
  }
}
</script>

<template>

  <form id="update-company-form" @submit.prevent="updateProfile" class="flex flex-column">

    <span class="title_form">Edit Profile</span>

    <span class="p-float-label">
      <InputText id="name" type="text" v-model="form.name" placeholder="Name"/>
      <label for="name">Name</label>
    </span>

    <span class="p-float-label">
      <InputText id="city" type="text" v-model="form.city" placeholder="City"/>
      <label for="city">City </label>
    </span>

    <span class="p-float-label">
      <InputText id="address" type="text" v-model="form.address" placeholder="City"/>
      <label for="address">Address </label>
    </span>

    <span class="p-float-label">
      <TextArea id="description" type="text" v-model="form.description" placeholder="Description"/>
      <label for="description">Description </label>
    </span>

    <span class="p-float-label">
      <InputText id="phone_number" type="text" v-model="form.phone_number" placeholder="Phone number"/>
      <label for="phone_number">Phone number </label>
    </span>

    <span class="p-float-label">
      <InputText id="email" type="text" v-model="form.email" placeholder="Email"/>
      <label for="email">Email </label>
    </span>

    <div class="card">
      <Toast />
      <FileUpload id="image" name="image" :url="`http://localhost:3000/api/uploadImage?id=${userId}`" @upload="onAdvancedUpload($event)" accept="image/*" :maxFileSize="1000000">
        <template #empty>
          <p>Drag and drop files here to upload.</p>
        </template>
      </FileUpload>
    </div>

    <Button id="submit-btn" label="Submit" type="submit"/>
    <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>

  </form>
</template>
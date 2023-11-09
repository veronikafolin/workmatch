<script setup></script>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
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
              this.messages.push({severity: 'success', content: response.message})
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
    }
  },
  beforeMount() {
    this.requestCompany();
  }
}
</script>

<template>
  <form @submit.prevent="updateProfile">
    <div class="card flex flex-column justify-content-center gap-2">

        <label for="name">Name</label>
        <InputText id="name" type="text" v-model="form.name"/>

        <label for="city">City </label>
        <InputText id="city" type="text" v-model="form.city"/>

        <label for="address">Address </label>
        <InputText id="address" type="text" v-model="form.address"/>

        <label for="description">Description </label>
        <TextArea id="description" type="text" v-model="form.description"/>

        <label for="phone_number">Phone number </label>
        <InputText id="phone_number" type="text" v-model="form.phone_number"/>

        <label for="email">Email </label>
        <InputText id="email" type="text" v-model="form.email"/>

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
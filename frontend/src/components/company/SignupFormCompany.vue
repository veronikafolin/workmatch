<script setup>
import router from "@/router";
</script>

<script>
export default {
    data() {
        return {
            messages: [],
            form: {
                name: '',
                city: '',
                username: '',
                password: '',
                address: '',
                description: '',
                phone_number: '',
                email: ''
            }
        }
    },
    methods:{
        registerCompany(){
            axios
                .post('http://localhost:3000/api/signup', {
                    type: "company",
                    user: {
                        name: this.form.name,
                        city: this.form.city,
                        username: this.form.username,
                        password: this.form.password,
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
                    setTimeout(() => router.replace({name: `home`}), 1000);
                  }
                }
            );
        }
    }
}
</script>

<template>
    <form @submit.prevent="registerCompany">

        <div class="p-form-group-inline">
            <div class="p-float-label">
                <InputText id="name" type="text" v-model="form.name" required/>
                <label for="name">Name </label>
            </div>
            <div class="p-float-label">
                <InputText id="city" type="text" v-model="form.city" required/>
                <label for="city">City </label>
            </div>
            <div class="p-float-label">
                <InputText id="address" type="text" v-model="form.address" required/>
                <label for="address">Address </label>
            </div>
            <div class="p-float-label">
              <TextArea id="description" type="text" v-model="form.description" required/>
              <label for="description">Description </label>
            </div>
            <div class="p-float-label">
              <InputText id="phone_number" type="text" v-model="form.phone_number" required/>
              <label for="phone_number">Phone number </label>
            </div>
            <div class="p-float-label">
              <InputText id="email" type="text" v-model="form.email" required/>
              <label for="email">Email </label>
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
        <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>
    </form>
</template>
<style scoped>

.p-float-label {
    margin-top: 15px;
    text-align: left;
  }

</style>
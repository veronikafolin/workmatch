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
    <form @submit.prevent="registerCompany" class="flex flex-column gap-3 align-items-center">

      <span class="p-input">
            <InputText id="name" type="text" v-model="form.name" placeholder="Name" required/>
      </span>

      <span class="p-input">
            <InputText id="city" type="text" v-model="form.city" placeholder="City" required/>
      </span>

      <span class="p-input">
            <InputText id="address" type="text" v-model="form.address" placeholder="Address" required/>
      </span>

      <span class="p-input">
            <TextArea id="description" type="text" v-model="form.description" placeholder="Description" required/>
      </span>

      <span class="p-input">
            <InputText id="phone_number" type="text" v-model="form.phone_number" placeholder="Phone number" required/>
      </span>

      <span class="p-input">
            <InputText id="email" type="text" v-model="form.email" placeholder="Email" required/>
      </span>

      <span class="p-input">
            <InputText id="username" type="text" v-model="form.username" placeholder="Username" required/>
      </span>

      <span class="p-input">
            <Password id="password" v-model="form.password" toggleMask placeholder="Password" required/>
      </span>

      <Button class="w-full" type="submit" label="Submit"/>

      <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

    </form>

</template>
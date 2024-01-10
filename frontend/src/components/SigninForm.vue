<script setup>
</script>

<script>
import Button from "primevue/button";
import router from "../router";
import axios from "axios";

export default {
    data() {
        return {
            selectedRole: "",
            roles:[
                'Student',
                'Company'
            ],
            form: {
                username: "",
                password: ""
            },
            messages: []
        };
    },
    methods: {
        signin() {
            this.messages = []
            axios
                .post("http://localhost:3000/api/login", {
                type: this.selectedRole,
                user: {
                    username: this.form.username,
                    password: this.form.password
                }
            }).then(res => {
                let response = res.data
                if(response.message.includes('Error')){
                    this.messages.push({severity: 'error', content: 'Login error! Please retry'})
                }else{
                    localStorage.token = response.token
                    localStorage.userId = response.id
                    localStorage.userType = this.selectedRole
                    localStorage.username = this.form.username
                    if(this.selectedRole === "Student"){
                      router.replace({name: `studenthome`})
                    } else {
                      router.replace({name: `companyhome`})
                    }
                }
            });
        }
    },
  components: { Button }
}
</script>

<template>

    <div id="login" class="card flex justify-content-center shadow-2">

        <form @submit.prevent="signin" class="flex flex-column gap-3 align-items-center">

            <span class="title_form">Login</span>

            <span class="p-input-icon-left">
                <i class="pi pi-user" />
                <InputText id="username" type="text" v-model="form.username" placeholder="Username" required/>
            </span>

            <span class="p-input-icon-left">
                <i class="pi pi-lock" />
                <InputText id="password" type="password" v-model="form.password" :feedback="false" placeholder="Password" required/>
            </span>

            <span class="p-input-icon-left role-selector-container">
              <label class="label" for="roleselector">Select your role: </label>
              <SelectButton id="roleselector" v-model="selectedRole" :options="roles" aria-labelledby="single"/>
            </span>


            <Button class="w-full" type="submit" label="Login" />

            <a href="/signup" class="w-full">
              <Button class="w-full" label="Sign Up" id="button-signup"/>
            </a>

            <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

        </form>

    </div>

</template>
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
                    router.replace({name: `${this.selectedRole.toLowerCase()}home`})
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

<!--            <span class="p-input-icon-left">-->
<!--                <Dropdown id="roleselector" v-model="selectedRole" :options="roles" placeholder="Select your role" class="w-full" />-->
<!--            </span>-->

            <span class="p-input-icon-left role-selector-container">
              <label class="label" for="roleselector">Please select your role: </label>
              <SelectButton id="roleselector" v-model="selectedRole" :options="roles" aria-labelledby="single"/>
            </span>

            <Button class="w-full" type="submit" label="Login" />

            <RouterLink to="/signup">Don't have an account yet? Sign Up</RouterLink>

            <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

        </form>

    </div>

</template>

<style>

.title_form{
  font-weight: bold;
  font-size: 200%;
  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
}

.label{
  font-family: 'Roboto', Arial, sans-serif;
}

#login {
    margin: auto;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 40%;
}

#roleselector{
    margin-bottom: 10px;
    margin-top: 10px;
}

.role-selector-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 10px;
}

.p-input-icon-left {
  width: 100%;
}

@media screen and (max-width: 1000px) {

    #login {
        width: 80%;
    }

}

</style>
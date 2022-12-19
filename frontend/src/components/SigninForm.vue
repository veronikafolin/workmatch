<script setup>
import Button from 'primevue/button';
import router from "@/router";
</script>

<script>
export default {
    data() {
        return {
            selectedRole: "",
            roles:[
                'Student',
                'Company',
                'School'
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
                    router.replace({name: `${this.selectedRole.toLowerCase()}home`})
                }
            });
        },
        resetForm() {
            this.form.username = ""
            this.form.password = ""
        }
    },
    components: { Button }
}
</script>

<template id="loginsection">
    <div id="login" class="surface-card p-4 shadow-2 border-round">
    
        <img src="../assets/logo.png" id="logo" class="center" alt="Workmatch logo"/>

        <form id="loginform" @submit.prevent="signin" class="text-center">
            <div>
                <label for="username" class="block text-900 font-medium mb-2">Username </label>
                <InputText id="username" type="text" class="mb-3" v-model="form.username" required/>
            </div>
            <div class="text-center">
                <label for="password" class="block text-900 font-medium mb-2">Password </label>
                <InputText id="password" type="password" class="mb-3" v-model="form.password" :feedback="false" required/>
            </div>
            <div>
                <label for="roleselector" class="block text-900 font-medium mb-2">Please select your role </label>
                <SelectButton id="roleselector" v-model="selectedRole" :options="roles" aria-labelledby="single"/>
            </div>
            <Button id="loginBtn" type="submit" label="Login" icon="pi pi-check" />
            <div>
                <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>
            </div>
        </form>
    </div>
</template>

<style>

#login {
    margin: auto;
    width: 50%;
}
#roleselector{
    margin-bottom: 10px;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#logo{
    width: 350px;
}

@media screen and (max-width: 500px){
    #title{
    font-family:Georgia, 'Times New Roman', Times, serif;
    font-size:20pt;
    font-style: italic;
    }

    #login {
        width: 90%;
    }

    #logo{
    width: 200px;
    }

    #username, #password{
        width:180px;
        height: 40px;
    }

    .p-button{
        font-size: 8pt !important;
    }

}

@media screen and (min-width: 501px) and (max-width: 1000px){
    #logo{
        width: 260px;
    }
}

</style>
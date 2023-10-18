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

        <form id="loginform" @submit.prevent="signin" class="center">
          <div class="p-form-group-inline">
            <div class="p-float-label">
                  <InputText id="username" type="text" v-model="form.username" required/>
                  <label for="username">Username</label>
              </div>
              <div class="p-float-label">
                  <InputText id="password" type="password" v-model="form.password" :feedback="false" required/>
                  <label for="password">Password</label>
              </div>
              <div>
                  <SelectButton id="roleselector" v-model="selectedRole" :options="roles" aria-labelledby="single"/>
                  <label for="roleselector">Please select your role </label>
              </div>
                <Button id="loginBtn" type="submit" label="Login" icon="pi pi-check" />
                <RouterLink to="/signup">Don't have an account yet? Sign Up</RouterLink>
              <div>
                  <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>
              </div>
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
<script setup>
import Button from 'primevue/button';

 </script>

<script>
export default {
    data() {
        return {
            form: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        signin() {
            axios
                .post("http://localhost:3000/api/login", {
                user: {
                    username: this.form.username,
                    password: this.form.password
                }
            }).then(res => console.log(res));
        }
    },
    components: { Button }
}
</script>

<template id="loginsection">
    <div id="login" class="surface-card p-4 shadow-2 border-round">
        <h1 class="text-center mb-5" >WorkMatch</h1>
        <div class="text-center mb-5">
            Welcome on WorkMatch!
        </div>
        <form id="loginform " @submit.prevent="signin" class="text-center">
            <div>
                <label for="username" class="block text-900 font-medium mb-2">Username </label>
                <InputText id="username" type="text" class="mb-3" v-model="form.username" required/>
            </div>
            <div class="text-center">
                <label for="password" class="block text-900 font-medium mb-2">Password </label>
                <InputText id="password" type="password" class="mb-3" v-model="form.password" :feedback="false" required/>
            </div>
            <Button type="submit" label="Login" icon="pi pi-check" />
        </form>
    </div>
    
</template>

<style>

#login {
    margin: auto;
    width: 50%;
}
</style>
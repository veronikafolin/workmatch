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
    <h1>WorkMatch</h1>
    <div>
        Welcome on WorkMatch!
    </div>
    <form id="loginform " @submit.prevent="signin">
        <div>
            Username:
            <input type="text" v-model="form.username" required/>
        </div>
        <div>
            Password:
            <input type="password" v-model="form.password" required/>
        </div>
        <Button type="submit" label="Submit" icon="pi pi-check" />
    </form>
</template>
<style>
#loginsection{
    align-items: center;
}
#loginform {
    display: block;
    justify-content: center;
    align-items: center;
}
</style>
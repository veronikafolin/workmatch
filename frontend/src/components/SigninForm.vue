<script setup></script>

<script>
export default {
    data(){
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        signin(){
            axios
                .post('http://localhost:3000/api/login', {
                    user: {
                        username: this.form.username,
                        password: this.form.password
                    }
                }).then(res => console.log(res))
        }
    }
}
</script>

<template>
    <form @submit.prevent="signin">
        <div>
            Username:
            <input type="text" v-model="form.username" required/>
        </div>
        <div>
            Password:
            <input type="password" v-model="form.password" required/>
        </div>
        <button type="submit"> Submit </button>
    </form>
</template>
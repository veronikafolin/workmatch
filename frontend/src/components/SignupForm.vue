<script setup></script>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                surname: '',
                email: '',
                username: '',
                password: '',
                schoolName: '',
                schoolType: '',
                grade: ''
            }
        }
    },
    methods:{
        registerStudent(){
            axios
                .post('http://localhost:3000/api/signup', {
                    user: {
                        name: this.form.name,
                        surname: this.form.surname,
                        email: this.form.email,
                        username: this.form.username,
                        password: this.form.password,
                        grade: this.form.grade,
                        school: {
                            name: this.form.schoolName,
                            type: this.form.schoolType
                        }
                    }
                }).then(res => console.log(res));
        }
    }
}
</script>

<template>
    <form @submit.prevent="registerStudent">
        <div>
            Name: 
            <input type="text" v-model="form.name" required/>
        </div> 
        <div>
            Surname: 
            <input type="text" v-model="form.surname" required/>
        </div>
        <div>
            Email: 
            <input type="text" v-model="form.email" required/>
        </div>
        <div>
            Username: 
            <input type="text" v-model="form.username" required/>
        </div>
        <div>
            Password: 
            <input type="password" v-model="form.password" required/>
        </div>
        <div>
            School Name: 
            <input type="text" v-model="form.schoolName" required/>
        </div> 
        <div>
            School Type: 
            <input type="text" v-model="form.schoolType" required/>
        </div>
        <div>
            Grade: 
            <input type="number" min="60" max="100" v-model="form.grade" required/>
        </div>
        <button type="submit"> Submit </button>
    </form>
</template>
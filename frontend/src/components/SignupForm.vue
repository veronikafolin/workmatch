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
                    type: "student",
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

        <div class="p-form-group-inline">
            <div clsss="p-float-label">
                <label for="name" class="p-sr-only">Name </label>
                <InputText id="name" type="text" v-model="form.name" placeholder="Name" required/>
            </div>
            <div clsss="p-float-label">
                <label for="surname" class="p-sr-only">Surname </label>
                <InputText id="surname" type="text" v-model="form.surname" placeholder="Surname" required/>
            </div>
            <div clsss="p-float-label">
                <label for="email" class="p-sr-only">Email </label>
                <InputText id="email" type="text" v-model="form.email" placeholder="Email" required/>
            </div>
            <div clsss="p-float-label">
                <label for="username" class="p-sr-only">Username </label>
                <InputText id="username" type="text" v-model="form.username" placeholder="Username" required/>
            </div>
            <div clsss="p-float-label">
                <label for="password" class="p-sr-only">Password </label>
                <PasswordComp id="password" v-model="form.password" placeHolder="Password" toggleMask /> 
            </div>
            <div clsss="p-float-label">
                <label for="schoolName" class="p-sr-only">School Name </label>
                <InputText id="schoolName" type="text" v-model="form.schoolName" placeholder="School Name" required/>
            </div>
            <div clsss="p-float-label">
                <label for="schoolType" class="p-sr-only">School Type </label>
                <InputText id="schoolType" type="text" v-model="form.schoolType" placeholder="School Type" required/>
            </div>
            <div clsss="p-float-label">
                <label for="grade" class="p-sr-only">Grade </label>
                <InputText id="grade" type="text" v-model="form.grade" placeholder="Grade" required/>
            </div>
        </div>
        <button type="submit"> Submit </button>
    </form>
</template>
<style scoped>

.p-float-label {
    margin-top: 15px;
    text-align: left;
  }

</style>
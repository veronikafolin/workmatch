<script setup></script>

<script>
export default {
    data() {
        return {
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
                }).then(res => console.log(res));
        }
    }
}
</script>

<template>
    <form @submit.prevent="registerCompany">

        <div class="p-form-group-inline">
            <div clsss="p-float-label">
                <label for="name" class="p-sr-only">Name </label>
                <InputText id="name" type="text" v-model="form.name" placeholder="Name" required/>
            </div>
            <div clsss="p-float-label">
                <label for="city" class="p-sr-only">City </label>
                <InputText id="city" type="text" v-model="form.city" placeholder="City" required/>
            </div>
            <div clsss="p-float-label">
                <label for="address" class="p-sr-only">Address </label>
                <InputText id="address" type="text" v-model="form.address" placeholder="Address" required/>
            </div>
            <div clsss="p-float-label">
              <label for="description" class="p-sr-only">Description </label>
              <TextArea id="description" type="text" v-model="form.description" placeholder="Description" required/>
            </div>
            <div clsss="p-float-label">
              <label for="phone_number" class="p-sr-only">Phone number </label>
              <InputText id="phone_number" type="text" v-model="form.phone_number" placeholder="Phone number" required/>
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
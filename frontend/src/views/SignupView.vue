<script setup>
import SignupFormStudent from '../components/student/SignupFormStudent.vue'
import SignupFormCompany from '../components/company/SignupFormCompany.vue'
</script>

<script>
export default {
  data() {
    return {
      selectedRole: "",
      roles:[
        'Student',
        'Company'
      ]
    };
  }
}
</script>

<template>

  <a href="/" class="w-full">
      <span id="logo" class="center">
        <img src="../assets/logo.jpeg" id="img_logo" alt="Workmatch logo"/>
        <!--      <br>-->
        <!--      WorkMatch-->
      </span>
  </a>

  <div id="register" class="register-class card flex justify-content-center shadow-2 flex-column">

    <span class="title_form">Register</span>

    <span class="p-input-icon-left role-selector-container">
            <label class="label" for="roleselector">Please select your role: </label>
            <SelectButton id="roleselector" v-model="selectedRole" :options="roles" aria-labelledby="single"/>
    </span>

    <SignupFormStudent v-if="selectedRole === 'Student'"/>
    <SignupFormCompany v-if="selectedRole === 'Company'"/>

  </div>

</template>
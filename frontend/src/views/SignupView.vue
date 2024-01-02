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

  <img src="../assets/logo.png" id="logo" class="center" alt="Workmatch logo"/>

  <div id="login" class="card flex justify-content-center shadow-2 align-items-center flex-column">

    <span class="title_form">Register</span>

    <span class="p-input-icon-left role-selector-container">
            <label class="label" for="roleselector">Please select your role: </label>
            <SelectButton id="roleselector" v-model="selectedRole" :options="roles" aria-labelledby="single"/>
    </span>

    <SignupFormStudent v-if="selectedRole === 'Student'"/>
    <SignupFormCompany v-if="selectedRole === 'Company'"/>

  </div>

</template>
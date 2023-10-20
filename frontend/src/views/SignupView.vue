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
  <main>
    <div id="login" class="surface-card p-4 shadow-2 border-round">

      <img src="../assets/logo.png" id="logo" class="center" alt="Workmatch logo"/>

      <div>
        <label for="roleselector" >Please select your role </label>
        <SelectButton id="roleselector" v-model="selectedRole" :options="roles" aria-labelledby="single"/>
      </div>

      <SignupFormStudent v-if="selectedRole === 'Student'"/>
      <SignupFormCompany v-if="selectedRole === 'Company'"/>

    </div>
  </main>
</template>
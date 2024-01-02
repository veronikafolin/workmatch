<script setup>
import SigninForm from '../components/SigninForm.vue'
</script>

<script>

export default {
  mounted() {
    localStorage.clear()
  }
}
</script>

<template>
  <main>

    <img src="../assets/logo.png" id="logo" class="center" alt="Workmatch logo"/>

    <SigninForm />
  </main>
</template>

<style>

#logo{
  width: 30%;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 1000px){

  #logo{
    width: 50%;
  }

}

</style>
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

    <a href="/" class="w-full">
      <span id="logo" class="center">
        <img src="../assets/logo.jpeg" id="img_logo" alt="Workmatch logo"/>
  <!--      <br>-->
  <!--      WorkMatch-->
      </span>
    </a>

    <SigninForm />
  </main>
</template>

<style>





</style>
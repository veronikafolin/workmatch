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
    <SigninForm />
  </main>
</template>
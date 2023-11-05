<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
</script>

<script>

import axios from "axios";
import router from "../../router";

export default{
  data(){
    return {
      profileDeleted: false,
      messages: []
    };
  },
  methods:{
    deleteProfile(){
      let userId = localStorage.userId;
      let userType = localStorage.userType.toLowerCase();
      axios
          .delete(`http://localhost:3000/api/deleteProfile?id=${userId}&userType=${userType}`)
          .then(res => {
                let response = res.data
                if (response.message.includes('Error')) {
                  this.messages.push({severity: 'error', content: response.message})
                } else {
                  let content = response.message + "You will shortly be redirected to the log in page."
                  this.messages.push({severity: 'success', content: content})
                  this.profileDeleted = true
                  setTimeout(() => router.replace('/'), 3000);
                }
              }
          )
    },
    confirmDelete() {
      this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
          this.$toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          this.deleteProfile();
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },
  }
}

</script>

<template>
  <main>

    <nav>
      <CompanyMenu/>
    </nav>

    <div class="card flex flex-wrap gap-2 justify-content-center">
      <Toast />
      <ConfirmDialog></ConfirmDialog>
      <Button @click="confirmDelete()" icon="pi pi-times" label="Delete profile"></Button>
    </div>

      <div v-if="profileDeleted" class="card flex justify-content-center">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
                         animationDuration=".5s" aria-label="Custom ProgressSpinner" />
      </div>

    <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

  </main>
</template>
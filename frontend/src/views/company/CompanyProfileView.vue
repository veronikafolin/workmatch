<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
</script>

<script>

import axios from "axios";

export default{
  data(){
    return {
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
                  this.messages.push({severity: 'success', content: response.message})
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
      <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>


  </main>
</template>
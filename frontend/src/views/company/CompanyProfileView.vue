<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
import UpdateProfileFormCompany from '../../components/company/UpdateProfileFormCompany.vue'
</script>

<script>

import axios from "axios";
import router from "../../router";

export default{
  data(){
    return {
      company: '',
      modifyProfile: false,
      deleteProfile: false,
      messages: []
    };
  },
  methods:{
    requestCompany() {
      let companyId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/company?id=${companyId}`)
          .then(res => {
            this.company = res.data;
          });
    },
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
                  this.deleteProfile = true
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
  },
  mounted() {
    this.requestCompany();
  }
}

</script>

<template>
  <main>

    <nav>
      <CompanyMenu/>
    </nav>

    <div class="card justify-content-center">

      <Card>
        <template #title> {{company.name}} </template>
        <template #content>
          City: {{company.city}} <br>
          Address: {{company.address}} <br>
          Description: {{company.description}} <br>
          Phone number: {{company.phone_number}} <br>
          E-mail: {{company.email}}
        </template>
        <template #footer>
          <Button label="Modify" icon="pi pi-pencil" @click="modifyProfile = true" />
          <Toast />
          <ConfirmDialog></ConfirmDialog>
          <Button @click="confirmDelete()" icon="pi pi-times" label="Delete profile"></Button>
        </template>
      </Card>

      <Dialog v-model:visible="modifyProfile" modal :style="{ width: '50vw' }">
        <UpdateProfileFormCompany></UpdateProfileFormCompany>
      </Dialog>

    </div>

    <div v-if="deleteProfile" class="card flex justify-content-center">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
                       animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>

    <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

  </main>
</template>
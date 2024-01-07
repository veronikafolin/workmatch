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
      profileDeleted: false,
      messages: [],
      imageUrl: ''
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
          this.deleteProfile();
        },
        reject: () => {

          }
      });
    },
    receiveChangesFromChild(data) {
      // Handle the received data from the child component
      this.messages.push({severity: 'success', content: data.message})
      this.requestCompany();
      this.modifyProfile = false;
    },
    async getProfileImage() {
      let studentId = localStorage.userId;
      try {
        const response = await axios.get(`http://localhost:3000/api/getImage?id=${studentId}`, {
          responseType: 'arraybuffer',
        });
        // Convert binary data to Base64 for image display
        const base64Image = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );
        // Create the image URL using Base64 representation
        this.imageUrl = `data:image/png;base64,${base64Image}`; // Adjust based on image type
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
  },
  mounted() {
    this.requestCompany();
    this.getProfileImage();
  }
}

</script>

<template>
  <main>

    <nav>
      <CompanyMenu/>
    </nav>

    <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>

    <div class="card justify-content-center">

      <Card class="profile-card flex flex-column align-items-center">

        <template #title> {{company.name}} </template>

        <template #content>
          <div>
            <img id="profileImage" :src="this.imageUrl" alt="Image" />
          </div>
          <br>
          <strong> Email: </strong> {{company.email}} <br>
          <strong> City: </strong> {{company.city}} <br>
          <strong> Address: </strong> {{company.address}} <br>
          <strong> Phone number: </strong> {{company.phone_number}}

          <p>
            {{company.description}}
          </p>

        </template>

        <template #footer>
          <div class="button-container">
            <Button label="Edit" icon="pi pi-pencil" @click="modifyProfile = true" />
            <Button id="button-danger" @click="confirmDelete()" icon="pi pi-trash" label="Delete"></Button>
          </div>
        </template>
      </Card>

      <Dialog v-model:visible="modifyProfile" id="modify-profile-form">
        <UpdateProfileFormCompany @send-data="receiveChangesFromChild"></UpdateProfileFormCompany>
      </Dialog>

    </div>

    <div v-if="profileDeleted" class="card flex justify-content-center">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
                       animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>

  </main>
</template>
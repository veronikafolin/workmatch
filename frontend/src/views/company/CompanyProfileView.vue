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
    }
  }
}

</script>

<template>
  <main>
    <nav>
      <CompanyMenu/>
    </nav>

    <div>
      <Button icon="pi pi-trash" rounded @click="deleteProfile()"></Button>
      <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>
    </div>

  </main>
</template>
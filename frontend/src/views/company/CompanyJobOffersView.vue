<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
import InsertJobOfferForm from '../../components/company/InsertJobOfferForm.vue'

</script>

<script>

import axios from "axios";

export default{
  data() {
    return {
      jobOffers: null,
      messages: [],
      visible: false
    };
  },
  methods: {
    requestJobOffers() {
      let companyId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/jobOffersOfCompany?id=${companyId}`)
          .then(res => {
            this.jobOffers = res.data;
          });
    },
    deleteJobOffer(jobOfferId){
      axios
          .delete(`http://localhost:3000/api/deleteJobOffer?id=${jobOfferId}`)
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
  },
  mounted() {
    this.requestJobOffers();
  }
}

</script>

<template>
  <main>
    <nav>
      <CompanyMenu/>
    </nav>

    <div class="card flex p-3 border-round justify-content-center">
      <Button label="Insert Offer" icon="pi pi-plus" rounded @click="visible=true"></Button>
      <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }" header="Insert a new job offer">
        <InsertJobOfferForm/>
      </Dialog>
    </div>

    <div class="card justify-content-center">

      <Card v-for="offer in jobOffers">
        <template #title> {{offer.position}} </template>
        <template #subtitle>
          {{offer.place_of_work}} <br>
          {{offer.working_hours}}h/week
        </template>
        <template #content>
          {{offer.description}}
        </template>
        <template #footer>
          <Button label="Delete offer" icon="pi pi-trash" @click="deleteJobOffer(offer._id)"/>
        </template>
      </Card>

      <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

    </div>



  </main>
</template>
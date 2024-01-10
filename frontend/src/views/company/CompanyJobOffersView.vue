<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
import InsertJobOfferForm from '../../components/company/InsertJobOfferForm.vue'

</script>

<script>

import axios from "axios";

export default{
  data() {
    return {
      jobOffers: [],
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
    confirmDelete(jobOfferId) {
      this.$confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
          this.deleteJobOffer(jobOfferId);
        },
        reject: () => {

        }
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
                  this.messages.push({severity: 'success', content: response.message});
                  this.requestJobOffers();
                }
              }
          )
    },
    receiveJobOfferFromChild(data) {
      // Handle the received data from the child component
      this.messages.push({severity: 'success', content: data.message})
      this.jobOffers.push(data.result);
      this.visible = false;
    }
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

    <div class="card flex justify-content-end btn-new-offer">
      <Button label="New Offer" icon="pi pi-plus" @click="visible=true"></Button>
      <Dialog v-model:visible="visible" id="insert-job-offer-form">
        <InsertJobOfferForm @send-data="receiveJobOfferFromChild"/>
      </Dialog>
    </div>

    <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>

    <div class="card cards-container">

      <Card class="single-card" v-for="offer in jobOffers">

        <template #title>
          {{offer.position}}
        </template>

        <template #subtitle>
          when: {{offer.timestamp}}
        </template>

        <template #content>
          <strong> Curriculums requested: </strong>
          <ul>
            <li v-for="curriculum in offer.curriculums_requested"> {{curriculum}} </li>
          </ul>

          <strong> Working hours: </strong> {{offer.working_hours}}h/week <br>

          <p>
            <strong> Description: </strong>
            {{offer.description}}
          </p>
        </template>

        <template #footer>
          <div class="btn-delete-joboffer justify-content-end">
            <Button id="button-danger" label="Delete" icon="pi pi-trash" @click="confirmDelete(offer._id)"/>
          </div>
        </template>

      </Card>

    </div>

  </main>

</template>
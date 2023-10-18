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
      addJobOffer: false
    };
  },
  methods: {
    requestJobOffers() {
      let companyId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/jobOffers?id=${companyId}`)
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

    <div>
      <Button icon="pi pi-plus" rounded @click="addJobOffer=true"></Button>
    </div>

    <InsertJobOfferForm v-if="addJobOffer"></InsertJobOfferForm>

    <div class="card">
      <DataView :value="jobOffers">
        <template #list="slotProps">
          <div class="row d-flex">
            <div>
              <div class="text-2xl font-bold text-900">{{ slotProps.data.position }}</div>
              {{ slotProps.data.place_of_work }}<br>
              {{ slotProps.data.working_hours }}h/week
              <p>
                {{slotProps.data.description}}
              </p>
            </div>
            <div>
              <Button icon="pi pi-trash" rounded @click="deleteJobOffer(slotProps.data._id)"></Button>
            </div>
          </div>
        </template>
      </DataView>
    </div>

    <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>

  </main>
</template>
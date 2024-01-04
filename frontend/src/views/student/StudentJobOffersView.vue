<script setup>
import StudentMenu from '../../components/student/StudentMenu.vue'
import CompanyDetail from '../../components/student/CompanyDetail.vue'
</script>

<script>

import axios from "axios";

export default{
  data() {
    return {
      jobOffers: [],
      companies: [],
      company: '',
      jobOffer: '',
      dialogVisible: false
    };
  },
  methods: {
    requestJobOffers() {
      axios
          .get(`http://localhost:3000/api/jobOffers`)
          .then(res => {
            this.jobOffers = res.data;
          });
    },
    requestCompanies(){
      axios
          .get("http://localhost:3000/api/companies")
          .then(res => { this.companies = res.data });
    },
    getCompany(companyId){
      return this.companies.find(company => {
        return company._id === companyId;})
    },
    sendNotificationToCompany(companyId){
      var today = new Date();
      var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date + ' ' + time;

      const notification = {
        from: localStorage.userId,
        senderUsername: localStorage.username,
        to: companyId,
        timestamp: dateTime,
        title: localStorage.username + " is interested in your company.",
        description: "The student is interested in the job offer " + this.jobOffer.position + " with id " + this.jobOffer._id,
        read: false
      }

      axios
          .post('http://localhost:3000/api/saveNotification', {
            notification: notification,
          }).then(res => {
            let response = res.data
            if (response.message.includes('Error')) {
              console.log("Error on saving the notification.")
            } else {
              this.$toast.add({ severity: 'info', summary: 'New notification sent', detail: "You have notified the company that you are interested in the job offer.", life: 3000 });
            }
          }
      );
    }
  },
  beforeMount() {
    this.requestCompanies();
  },
  mounted() {
    this.requestJobOffers();
  }
}

</script>

<template>

  <main>

    <nav>
      <StudentMenu/>
    </nav>

    <div class="card justify-content-center cards-container">

      <Card class="single-card" v-for="offer in jobOffers">

        <template #title> {{offer.position}} </template>

        <template #subtitle>
          {{getCompany(offer.from)["name"]}} ({{offer.place_of_work}})
        </template>

        <template #content>
          <strong> Curriculums requested: </strong>
          <ul>
            <li v-for="curriculum in offer.curriculums_requested"> {{curriculum}} </li>
          </ul>

          <strong> Work hours: </strong> {{offer.working_hours}}h/week <br>

          <p>
            <strong> Description: </strong>
            {{offer.description}}
          </p>
        </template>

        <template #footer>
          <div class="button-container justify-content-start">
            <Button label="More info" icon="pi pi-external-link" @focus="this.company=this.getCompany(offer.from);" @click="dialogVisible = true"/>
            <Button label="I'm interested!" icon="pi pi-thumbs-up" @click="this.jobOffer=offer; sendNotificationToCompany(company._id); " text />
          </div>
        </template>

      </Card>

      <Toast />

      <CompanyDetail v-model:visible="dialogVisible" :company=this.company></CompanyDetail>

    </div>

  </main>

</template>

<style>

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.single-card {
  width: calc(50% - 10px);
}

@media screen and (max-width: 1000px) {

  .single-card {
    width: 100%;
  }

}

</style>
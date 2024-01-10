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
      companyNames: [],
      company: '',
      jobOffer: '',
      imageUrl: '',
      dialogVisible: false,
      selectedCompany: null,
      interests: []
    };
  },
  computed: {
    jobOffersSelected(){
      if (this.selectedCompany !== null){
        let company = this.companies.find(company => {
          return company.name === this.selectedCompany;
        })
        return this.jobOffers.filter(jobOffer => {
          return jobOffer.from === company._id;
        } )
      } else {
        return this.jobOffers;
      }
    }
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
          .then(res => {
            this.companies = res.data;
            this.companies.forEach(c => this.companyNames.push(c.name));
          });
    },
    getCompany(companyId){
      return this.companies.find(company => {
        return company._id === companyId;})
    },
    sendNotificationToCompany(){
      var today = new Date();
      var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date + ' ' + time;

      const notification = {
        from: localStorage.userId,
        senderUsername: localStorage.username,
        to: this.company._id,
        timestamp: dateTime,
        title: localStorage.username + " is interested in your company.",
        aboutJobOffer: this.jobOffer._id,
        description: "The student is interested in the job offer " + this.jobOffer.position,
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
              this.requestInterests();
              this.$toast.add({ severity: 'info', summary: 'New notification sent', detail: "You have notified the company that you are interested in the job offer.", life: 3000 });
            }
          }
      );
    },
    async getProfileImage(studentId) {
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
    },
    requestInterests(){
      let userId = localStorage.userId;
      axios
          .get(`http://localhost:3000/api/interests?id=${userId}`)
          .then(res => {
            this.interests = res.data;
          });
    },
    alreadyInterested(jobOfferId){
      return this.interests.some(
          notification => notification.aboutJobOffer === jobOfferId
      );
    }
  },
  beforeMount() {
    this.requestCompanies();
    this.requestJobOffers();
    this.requestInterests();
  }
}

</script>

<template>

  <main>

    <nav>
      <StudentMenu/>
    </nav>

    <div id="filter-dropdown" class="card flex justify-content-end">
      <span class="p-float-label">
        <Dropdown id="companies-selector" v-model="this.selectedCompany" :options="this.companyNames" class="w-full md:w-14rem" editable showClear />
        <label for="companies-selector">Filter by company </label>
      </span>
    </div>

    <div class="card cards-container">

      <Card class="single-card" v-for="offer in jobOffersSelected">

        <template #title> {{offer.position}} </template>

        <template #subtitle>
          when: {{offer.timestamp}}
        </template>

        <template #content>

          <strong>Company:</strong> {{getCompany(offer.from)["name"]}} <br>

          <strong>Place of work:</strong> {{offer.place_of_work}} <br>

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
          <div class="button-container justify-content-end foot-student-details">
            <Button class="button-more-info" label="More info" icon="pi pi-external-link" @focus="this.company=this.getCompany(offer.from); this.imageUrl=getProfileImage(company._id);" @click="dialogVisible = true"/>
            <Button label="I'm interested!" icon="pi pi-thumbs-up" @click="this.jobOffer=offer; this.company=this.getCompany(offer.from); sendNotificationToCompany(); " text :disabled="this.alreadyInterested(offer._id)" />
          </div>
        </template>

      </Card>

      <Toast />

      <CompanyDetail v-model:visible="dialogVisible" :company=this.company :imageUrl=this.imageUrl></CompanyDetail>

    </div>

  </main>

</template>
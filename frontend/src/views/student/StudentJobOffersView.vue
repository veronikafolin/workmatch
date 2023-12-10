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

    <div class="card justify-content-center">

      <Card v-for="offer in jobOffers">
        <template #title> {{offer.position}} </template>
        <template #subtitle>
          {{getCompany(offer.from)["name"]}} <br>
          {{offer.place_of_work}} <br>
          {{offer.working_hours}}h/week
        </template>
        <template #content>
          Curriculums requested: {{offer.curriculums_requested}}
          <br>
          <br>
          {{offer.description}}
        </template>
        <template #footer>
          <Button label="Show company" icon="pi pi-external-link" @focus="this.company=this.getCompany(offer.from);" @click="dialogVisible = true"/>
        </template>
      </Card>

      <CompanyDetail v-model:visible="dialogVisible" :company=this.company></CompanyDetail>

    </div>

  </main>
</template>
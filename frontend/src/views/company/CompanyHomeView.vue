<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
</script>

<script>

import axios from "axios";

export default {
  data() {
        return {
          company: ''
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
    }
  },
  beforeMount(){
    this.requestCompany();
  }
}

</script>


<template>
  <main>
    <nav>
        <CompanyMenu/>
    </nav>

    <div>
      <h1>Benvenuto {{company.name}}!</h1>
    </div>

  </main>
</template>



<style>
.p-card {
  margin-top: 30px;
}
</style>
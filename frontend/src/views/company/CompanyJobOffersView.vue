<script setup>
import CompanyMenu from '../../components/company/CompanyMenu.vue'
</script>

<script>

import axios from "axios";

export default{
  data() {
    return {
      jobOffers: null
    };
  },
  methods:{
    requestJobOffers(){
      let companyId = "652e4278f07e553fc658ec2c";
      axios
          .get(`http://localhost:3000/api/jobOffers?id=${companyId}`)
          .then(res => { this.jobOffers = res.data; });
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
              <Button icon="pi pi-trash" rounded></Button>
            </div>

            <div >

            </div>
          </div>
        </template>
      </DataView>
    </div>

  </main>
</template>
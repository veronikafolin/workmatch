<script setup></script>

<script>
import axios from "axios";

export default {
    data() {
        return {
            curriculums: [],
            messages: [],
            form: {
                position: '',
                description: '',
                place_of_work: '',
                working_hours: '',
                curriculums_requested: []
            }
        };
    },
    methods:{
        insertJobOffer(){

            var today = new Date();
            var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes();
            var dateTime = date + ' ' + time;

            axios
                .post('http://localhost:3000/api/insertJobOffer', {
                    jobOffer: {
                          timestamp: dateTime,
                          position: this.form.position,
                          description: this.form.description,
                          place_of_work: this.form.place_of_work,
                          working_hours: this.form.working_hours,
                          curriculums_requested: this.form.curriculums_requested,
                          from: localStorage.userId
                        }
                }).then(res => {
                  let response = res.data
                  if (response.message.includes('Error')) {
                    this.messages.push({severity: 'error', content: response.message})
                  } else {
                    this.$emit('send-data', response);
                  }
                }
            );
        },
        requestCurriculums(){
          axios
            .get("http://localhost:3000/api/curriculums")
            .then(res => { this.curriculums = res.data });
        }
    },
  beforeMount() {
      this.requestCurriculums();
  }
}
</script>

<template>
    <form @submit.prevent="insertJobOffer" class="flex flex-column gap-3 align-items-center">

      <span class="title_form">Insert a new job offer</span>

      <div class="p-float-label">
          <InputText id="position" type="text" v-model="form.position" required/>
          <label for="position">Position </label>
      </div>

      <div class="p-float-label">
        <TextArea id="description" type="text" v-model="form.description" required/>
        <label for="description">Description </label>
      </div>

      <div class="p-float-label">
          <InputText id="place_of_work" type="text" v-model="form.place_of_work" required/>
          <label for="place_of_work">City </label>
      </div>

      <div class="p-float-label">
        <InputText id="working_hours" type="text" v-model="form.working_hours" required/>
        <label for="working_hours">Working hours </label>
      </div>

      <div class="p-float-label">
        <MultiSelect id="curriculums" v-model="form.curriculums_requested" :options="this.curriculums" class="w-full md:w-14rem" />
        <label for="curriculums">Curriculums </label>
      </div>

      <Button type="submit" > Submit </Button>

      <Message v-for="msg of messages" :severity="msg.severity" :sticky="false" :life="3000">{{msg.content}}</Message>

    </form>

</template>
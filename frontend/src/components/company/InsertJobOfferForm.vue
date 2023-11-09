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
            axios
                .post('http://localhost:3000/api/insertJobOffer', {
                    jobOffer: {
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
                    this.messages.push({severity: 'success', content: response.message})
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
    <form @submit.prevent="insertJobOffer">
        <div class="p-form-group-inline">
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
              <InputText id="working_hours" type="text" v-model="form.phone_number" required/>
              <label for="working_hours">Working hours </label>
            </div>
            <div class="p-float-label">
              <MultiSelect id="curriculums" v-model="form.curriculums_requested" :options="this.curriculums" placeholder="Select curriculums requested"
                           class="w-full md:w-20rem" />
              <label for="curriculums">Curriculums </label>
            </div>
          <Button type="submit"> Submit </Button>
          <Message v-for="msg of messages" :severity="msg.severity">{{msg.content}}</Message>
        </div>
    </form>
</template>

<style scoped>

.p-float-label {
    margin-top: 15px;
    text-align: left;
  }

</style>
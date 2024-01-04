<script setup></script>

<script>

export default {
    props: {
      company: {type:Object}
    }
}
</script>

<template>

  <Dialog modal :style="{ width: '50vw' }">

    <template #header>
      <h2>{{company.name}}</h2>
    </template>

    <strong> Email: </strong> {{company.email}} <br>
    <strong> City: </strong> {{company.city}} <br>
    <strong> Address: </strong> {{company.address}} <br>
    <strong> Phone number: </strong> {{company.phone_number}}

    <p>
      {{company.description}}
    </p>

  </Dialog>

</template>
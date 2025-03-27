<template>
  <div>
    <label for="name">Name</label>
    <input v-model="contact.name" placeholder="Name" />
    <label for="address">Address</label>
    <input v-model="contact.address" placeholder="Address" />
    <label for="mobile">Mobile</label>
    <input v-model="contact.mobile" placeholder="Mobile" />
    <label for="email">Email</label>
    <input v-model="contact.email" placeholder="Email" />
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

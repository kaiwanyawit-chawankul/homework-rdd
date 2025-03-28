<template>
  <div class="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        v-model="localContact.name"
        id="name"
        type="text"
        placeholder="Enter your name"
        class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label for="address" class="block text-sm font-medium text-gray-700"
        >Address</label
      >
      <input
        v-model="localContact.address"
        id="address"
        type="text"
        placeholder="Enter your address"
        class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label for="mobile" class="block text-sm font-medium text-gray-700"
        >Mobile</label
      >
      <input
        v-model="localContact.mobile"
        id="mobile"
        type="tel"
        placeholder="Enter your mobile number"
        class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="localContact.email"
        id="email"
        type="email"
        placeholder="Enter your email"
        class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
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
  computed: {
    localContact: {
      get() {
        return this.contact; // Return the prop for use in the template
      },
      set(newValue) {
        this.$emit("update:contact", newValue); // Emit the updated value to parent
      },
    },
  },
};
</script>

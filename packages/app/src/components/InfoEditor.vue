<template>
  <div class="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Title Input -->
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700"
        >Title</label
      >
      <input
        v-model="localInfo.title"
        id="title"
        type="text"
        placeholder="Your title"
        class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <!-- Description Textarea -->
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Description</label
      >
      <textarea
        v-model="localInfo.description"
        id="description"
        placeholder="Brief description"
        rows="4"
        class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    localInfo: {
      get() {
        return this.info; // Return the prop for use in the template
      },
      set(newValue) {
        this.$emit("update:info", newValue); // Emit the updated value to parent
      },
    },
  },
};
</script>

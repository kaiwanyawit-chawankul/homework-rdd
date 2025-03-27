<template>
  <div>
    <div>
      <label for="title">Title</label>
      <input v-model="resume.title" placeholder="Your title" />
    </div>

    <div>
      <label for="description">Description</label>
      <textarea
        v-model="resume.description"
        placeholder="Brief description"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resume: {
      type: Object,
      required: true,
    },
  },
};
</script>

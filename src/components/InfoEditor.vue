<template>
    <div>
      <div>
            <label for="title">Title</label>
            <input v-model="info.title" placeholder="Your title">
          </div>

          <div>
            <label for="description">Description</label>
            <textarea v-model="info.description" placeholder="Brief description"></textarea>
          </div>
    </div>
  </template>

  <script>
  export default {
    props: {
      info: {
        type: Object,
        required: true
      }
    }
  };
  </script>

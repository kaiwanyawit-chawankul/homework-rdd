<template>
    <div class="collapsible-section">
      <h3>{{title}}</h3>
      <button @click="toggle" class="toggle-button">
        {{ isOpen ? 'Hide' : 'Show' }} Section
      </button>
      <div v-if="isOpen" class="content">
        <slot></slot>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'CollapsibleSection',
    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      toggle() {
        this.$emit('toggle', this.id);
      },
    },
  };
  </script>

  <style scoped>
  .collapsible-section {
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }

  .toggle-button {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .toggle-button:hover {
    background-color: #0056b3;
  }

  .content {
    margin-top: 10px;
    padding: 10px;
    border-top: 1px solid #ccc;
  }
  </style>

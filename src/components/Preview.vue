<template>
    <div class="preview-container">
      <h2>Preview Your Resume</h2>
      <div class="preview-layout">
        <!-- Dynamically display the preview based on selected layout -->
        <component :is="selectedPreviewComponent" :resume="resume" />
      </div>
    </div>
  </template>

  <script>
  import ResumeReview from './ResumeReview.vue';
  import LitePreview from './LitePreview.vue';
  import NicePreview from './NicePreview.vue';
  import LeftRightPreview from './LeftRightPreview.vue';

  export default {
    name: 'Preview',
    data() {
      return {
        // Example resume data
        resume: JSON.parse(localStorage.getItem("resume")) || {},
        selectedPreviewLayout: 'lite',  // Default preview layout
      };
    },
    computed: {
      selectedPreviewComponent() {
        // Return the corresponding preview component based on the selected layout
        switch (this.selectedPreviewLayout) {
          case 'nice':
            return NicePreview;
          case 'left-right':
            return LeftRightPreview;
          case 'lite':
            return LitePreview;
          default:
            return ResumeReview;
        }
      },
    },
    methods: {
      // This method could be triggered if you allow users to select a layout for preview
      changePreviewLayout(layout) {
        this.selectedPreviewLayout = layout;
      },
    },
  };
  </script>

  <style scoped>
  .preview-container {
    padding: 20px;
  }

  .preview-layout {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>


<!-- src/App.vue -->

<template>
  <div id="app">
    <!-- Buttons on Top -->
    <div class="top-buttons">
      <button @click="exportData">Export Data</button>
      <input type="file" @change="importData" />
      <button @click="printResume">Print Resume</button>
    </div>

    <!-- Tabs for Switching Between Editor and Preview -->
    <div class="tabs">
      <button @click="activeTab = 'editor'" :class="{ active: activeTab === 'editor' }">Editor</button>
      <button @click="activeTab = 'preview'" :class="{ active: activeTab === 'preview' }">Preview</button>
    </div>
          <!-- Preview Layout Selector -->
          <div class="preview-layout-selector">
          <label for="previewLayout">Choose Preview Layout:</label>
          <select v-model="selectedPreviewLayout">
            <option value="lite">Lite Preview</option>
            <option value="nice">Nice Preview</option>
            <option value="left-right">Left-Right Preview</option>
            <option value="resume">Resume Preview</option>
          </select>
        </div>

    <!-- Main Layout with Editor and Preview -->
    <div class="main-layout">
      <!-- Left Side: Editor (Visible when activeTab is 'editor') -->
      <div class="editor" v-if="activeTab === 'editor'">
        <h2>Resume Form</h2>
        <form @submit.prevent="saveData">
          <div>
            <label for="title">Title</label>
            <input v-model="resume.title" placeholder="Your title">
          </div>

          <div>
            <label for="description">Description</label>
            <textarea v-model="resume.description" placeholder="Brief description"></textarea>
          </div>

          <!-- Contact Editor Component -->
          <ContactEditor :contact="resume.contact" />

          <!-- Experience Editor Component -->
          <ExperienceEditor :experiences="resume.experiences" />

          <!-- Education Editor Component -->
          <EducationEditor :educations="resume.educations" />

          <!-- Skills Editor Component -->
          <SkillsEditor :skills="resume.skills" />

          <!-- Other Sections Editor Component -->
          <OtherSectionsEditor :sections="resume.others" />

          <button type="submit">Save Data</button>
        </form>
      </div>

      <!-- Right Side: Preview (Visible when activeTab is 'preview') -->
      <div class="preview" v-if="activeTab === 'preview'">
        <h2>Resume Preview</h2>
        <div class="A4">
          <div class="sheet padding-10mm">
            <!-- <LitePreview :resume="resume" /> -->
            <component :is="selectedPreviewComponent" :resume="resume" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactEditor from './components/ContactEditor.vue';
import ExperienceEditor from './components/ExperienceEditor.vue';
import EducationEditor from './components/EducationEditor.vue';
import SkillsEditor from './components/SkillsEditor.vue';
import OtherSectionsEditor from './components/OtherSectionsEditor.vue';
import ResumeReview from './components/ResumeReview.vue';
import LitePreview from './components/LitePreview.vue';
import NicePreview from './components/NicePreview.vue';
import LeftRightPreview from './components/LeftRightPreview.vue';
import { resumeData } from './data';

export default {
  components: {
    ContactEditor,
    ExperienceEditor,
    EducationEditor,
    OtherSectionsEditor,
    SkillsEditor,
    ResumeReview,
    LitePreview,
    NicePreview,
    LeftRightPreview
  },
  data() {
    return {
      activeTab: 'editor',
      resume: JSON.parse(localStorage.getItem('resume')) || resumeData,
      selectedPreviewLayout: 'lite',  // Default preview layout
    };
  },
  computed: {
    selectedPreviewComponent() {
      switch (this.selectedPreviewLayout) {
        case 'nice':
          return NicePreview;
        case 'left-right':
          return LeftRightPreview;
        case 'lite':
          return LitePreview;
        case 'resume':
        default:
          return ResumeReview;
      }
    }
  },
  methods: {

    saveData() {
      localStorage.setItem('resume', JSON.stringify(this.resume));
    },
    exportData() {
      const blob = new Blob([JSON.stringify(this.resume)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'resume.json';
      link.click();
    },
    importData(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        this.resume = data;
        localStorage.setItem('resume', JSON.stringify(data));
      };
      reader.readAsText(file);
    },
    printResume() {
      const printWindow = window.open('', '', 'width=800,height=600');

      // Get the HTML content of the preview section
      const previewHTML = document.querySelector('.A4').innerHTML;

      // Write HTML to the print window
      printWindow.document.write(`
        <html>
          <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">
            <style>@page { size: A4 }</style>
            <title>Resume</title>
          </head>
          <body>
            ${previewHTML}
          </body>
        </html>
      `);

      // Close the document and print
      printWindow.document.close();
      printWindow.print();
    }
  }
};
</script>

<style scoped>
/* Global styles */
#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

.top-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding: 10px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
}

.top-buttons button,
.top-buttons input {
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}

/* Main layout */
.main-layout {
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 20px;
}

/* Left Side: Editor */
.editor {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 900px;
  overflow-y: auto;
}

/* Right Side: Preview */
.preview {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 900px;
  overflow-y: auto;
}

h2, h3, h4 {
  margin-bottom: 10px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #e74c3c;
  color: white;
}

button[type="submit"] {
  background-color: #3498db;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>

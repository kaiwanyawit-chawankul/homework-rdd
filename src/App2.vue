<template>
  <div id="app">
    <!-- Buttons on Top -->
    <div class="top-buttons">
      <button @click="exportData">Export Data</button>
      <input type="file" @change="importData" aria-label="Import Data" />
      <button @click="printResume">Print Resume</button>
    </div>

    <div class="tabs">
      <select
        v-model="selectedResume"
        @change="loadResume"
        aria-label="Choose Resume"
      >
        <option
          v-for="(resumeKey, index) in resumeList"
          :key="index"
          :value="resumeKey"
        >
          {{ resumeKey }}
        </option>
      </select>

      <!-- New Buttons for Add and Delete Resume -->
      <button @click="addNewResume">Add New Resume</button>
      <button @click="cloneResume">Clone Resume</button>
      <button v-if="resumeList.length > 0" @click="deleteResume">
        Delete Resume
      </button>
      <button @click="saveData">Save Resume</button>
    </div>

    <!-- Preview Layout Selector -->
    <div class="preview-layout-selector">
      <label for="previewLayout">Choose Preview Layout:</label>
      <select
        v-model="selectedPreviewLayout"
        aria-label="Choose Preview Layout"
      >
        <option value="lite">Lite Preview</option>
        <option value="nice">Nice Preview</option>
        <option value="left-right">Left-Right Preview</option>
        <option value="resume">Resume Preview</option>
      </select>
    </div>

    <!-- Main Layout with Editor and Preview -->
    <div class="main-layout">
      <!-- Left Side: Editor -->
      <div class="editor">
        <form @submit.prevent="saveData">
          <router-view :resume="resume"></router-view>
          <!-- This will display the editor components based on the route -->
        </form>
      </div>

      <!-- Right Side: Preview -->
      <div v-if="activeTab === 'preview'" class="preview">
        <h2>Resume Preview</h2>
        <div class="A4">
          <div class="sheet padding-10mm">
            <component :is="selectedPreviewComponent" :resume="resume" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
//import { useRoute } from 'vue-router';  // Import Vue Router hooks
import ResumeReview from "./components/ResumeReview.vue";
import LitePreview from "./components/LitePreview.vue";
import NicePreview from "./components/NicePreview.vue";
import LeftRightPreview from "./components/LeftRightPreview.vue";
import dataStore from "./store";

export default defineComponent({
  data() {
    const resumeFromStore = dataStore.getDefaultResume();
    const resumeList = dataStore.getResumeList();
    return {
      activeTab: "preview",
      resume: resumeFromStore,
      resumeList: resumeList,
      selectedPreviewLayout: resumeFromStore.previewLayout || "lite", // Default preview layout
      selectedResume: dataStore.defaultResumeId, // Default preview layout// Replace this with your actual resume data
    };
  },
  computed: {
    selectedPreviewComponent() {
      // Dynamically choose preview component
      switch (this.selectedPreviewLayout) {
        case "nice":
          return NicePreview;
        case "left-right":
          return LeftRightPreview;
        case "lite":
          return LitePreview;
        default:
          return ResumeReview;
      }
    },
  },
  methods: {
    saveData() {
      // Include the selectedPreviewLayout when saving the resume
      this.resume.previewLayout = this.selectedPreviewLayout;

      if (!this.resumeList.includes(this.selectedResume)) {
        this.resumeList.push(this.selectedResume);
      }

      dataStore.saveResume(this.selectedResume, this.resume);
      dataStore.saveResumeList(this.resumeList);
    },
    exportData() {
      const blob = new Blob([JSON.stringify(this.resume)], {
        type: "application/json",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resume.json";
      link.click();
    },

    importData(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        this.resume = data;
        dataStore.updateDefaultResume(data);
      };
      reader.readAsText(file);
    },

    loadResume() {
      // Load the selected resume from the list
      this.resume = dataStore.getResumeById(this.selectedResume);

      // If the preview layout is saved in the resume data, load it
      if (this.resume && this.resume.previewLayout) {
        this.selectedPreviewLayout = this.resume.previewLayout;
      }
    },

    addNewResume() {
      // Prompt user to add a new resume name
      const newResumeName = prompt("Enter a new resume title:");
      if (newResumeName) {
        // Add new resume to the list and make it the active resume
        this.selectedResume = newResumeName;
        this.resume = {
          title: "",
          description: "",
          contact: {},
          experiences: [],
          educations: [],
          skills: [],
          others: [],
          previewLayout: "lite", // Default preview layout
        };
        this.resumeList.push(newResumeName);
        dataStore.saveResumeList(this.resumeList);
        dataStore.saveResume(newResumeName, this.resume);
      }
    },

    deleteResume() {
      // Confirm before deleting
      if (
        confirm(
          `Are you sure you want to delete the resume "${this.selectedResume}"?`,
        )
      ) {
        const index = this.resumeList.indexOf(this.selectedResume);
        if (index !== -1) {
          // Remove resume from the list
          this.resumeList.splice(index, 1);
          dataStore.saveResumeList(this.resumeList);
          dataStore.deleteResume(this.selectedResume);
          // Set default values or select another resume if needed
          this.selectedResume =
            this.resumeList.length > 0 ? this.resumeList[0] : "";
          this.resume = {};
        }
      }
    },

    cloneResume() {
      // Clone the selected resume
      const clonedResume = JSON.parse(JSON.stringify(this.resume));

      // Prompt the user for a new title for the cloned resume
      const newResumeName = prompt("Enter a name for the cloned resume:");
      if (newResumeName) {
        this.resumeList.push(newResumeName);
        dataStore.saveResumeList(this.resumeList);
        dataStore.saveResume(newResumeName, clonedResume);
        // Switch to the newly cloned resume
        this.selectedResume = newResumeName;
        this.resume = clonedResume;
      }
    },

    printResume() {
      this.activeTab = "preview";
      const printWindow = window.open("", "", "width=800,height=600");
      const previewHTML = document.querySelector(".A4").innerHTML;
      const styles = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            return Array.from(sheet.cssRules)
              .map((rule) => rule.cssText)
              .join("");
          } catch (e) {
            return "";
          }
        })
        .join("");
      printWindow.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">
          <style>@page { size: A4 }</style>
          <style>
            ${styles}
            .top-buttons, .tabs, .main-layout { display: none; }
          </style>
          <title>Resume</title>
        </head>
        <body>
          <div class="A4">
            ${previewHTML}
          </div>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.print();
    },
  },
});
</script>

<style scoped>
.tab-button {
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
  text-decoration: none;
}

.tab-button.active {
  background-color: #3498db;
  color: white;
}

.main-layout {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>

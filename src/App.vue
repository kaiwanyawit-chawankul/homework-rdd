<!-- src/App.vue -->

<template>
  <div id="app">
    <!-- Buttons on Top -->
    <div class="top-buttons">
      <button @click="exportData">Export Data</button>
      <input type="file" @change="importData" aria-label="Import Data" />
      <button @click="printResume">Print Resume</button>
    </div>

    <!-- Tabs for Switching Between Editor and Preview -->
    <div class="tabs">
      <select v-model="selectedResume" @change="loadResume" aria-label="Choose Resume">
        <option v-for="(resumeKey, index) in resumeList" :key="index" :value="resumeKey">
          {{ resumeKey }}
        </option>
      </select>
      <button @click="activeTab = 'editor'" :class="{ active: activeTab === 'editor' }">Editor</button>
      <button @click="activeTab = 'preview'" :class="{ active: activeTab === 'preview' }">Preview</button>

      <!-- New Buttons for Add and Delete Resume -->
      <button @click="addNewResume">Add New Resume</button>
      <button @click="cloneResume">Clone Resume</button>
      <button v-if="resumeList.length > 0" @click="deleteResume">Delete Resume</button>
    </div>

    <!-- Preview Layout Selector -->
    <div class="preview-layout-selector">
      <label for="previewLayout">Choose Preview Layout:</label>
      <select v-model="selectedPreviewLayout" aria-label="Choose Preview Layout">
        <option value="lite">Lite Preview</option>
        <option value="nice">Nice Preview</option>
        <option value="left-right">Left-Right Preview</option>
        <option value="resume">Resume Preview</option>
      </select>
    </div>


    <!-- Main Layout with Editor and Preview -->
    <div class="main-layout">
      <div class="side-bar">
        <TOC :sections="sections" @toggle-section="toggleSection" />
      </div>
      <!-- Left Side: Editor (Visible when activeTab is 'editor') -->
      <div class="editor" v-if="activeTab === 'editor'">
        <h2>Resume Form</h2>
        <form @submit.prevent="saveData">


          <CollapsibleSection :id="sections[0].id" :title="sections[0].title" :isOpen="sections[0].isOpen" @toggle="toggleSection">
            <!-- Info Editor Component-->
            <InfoEditor :info="resume" />
          </CollapsibleSection>

          <CollapsibleSection :id="sections[1].id" :title="sections[1].title" :isOpen="sections[1].isOpen" @toggle="toggleSection">
            <!-- Contact Editor Component -->
            <ContactEditor :contact="resume.contact" />
          </CollapsibleSection>

          <CollapsibleSection :id="sections[2].id" :title="sections[2].title" :isOpen="sections[2].isOpen" @toggle="toggleSection">
            <!-- Experience Editor Component -->
            <ExperienceEditor :experiences="resume.experiences" />
          </CollapsibleSection>

          <CollapsibleSection :id="sections[3].id" :title="sections[3].title" :isOpen="sections[3].isOpen" @toggle="toggleSection">
            <!-- Education Editor Component -->
            <EducationEditor :educations="resume.educations" />
          </CollapsibleSection>

          <CollapsibleSection :id="sections[4].id" :title="sections[4].title" :isOpen="sections[4].isOpen" @toggle="toggleSection">
            <!-- Skills Editor Component -->
            <SkillsEditor :skills="resume.skills" />
          </CollapsibleSection>

          <CollapsibleSection :id="sections[5].id" :title="sections[5].title" :isOpen="sections[5].isOpen" @toggle="toggleSection">
            <!-- Other Sections Editor Component -->
            <OtherSectionsEditor :sections="resume.others" />
          </CollapsibleSection>
          <button type="submit">Save Data</button>
        </form>
      </div>

      <!-- Right Side: Preview (Visible when activeTab is 'preview') -->
      <div class="preview" v-if="activeTab === 'preview'">
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
import InfoEditor from './components/InfoEditor.vue';
import CollapsibleSection from './components/CollapsibleSection.vue';
import TOC from './components/TOC.vue';

export default {
  components: {
    CollapsibleSection,
    TOC,
    InfoEditor,
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
      activeTab: 'preview',
      resume: JSON.parse(localStorage.getItem('resume')) || resumeData,
      resumeList: JSON.parse(localStorage.getItem('resume-list')) || [],
      selectedPreviewLayout: 'lite',  // Default preview layout
      selectedResume: 'resume',  // Default preview layout
      sections: [
        {
          id: 'info-section',
          title: '',
          isOpen: true,
          content: 'This is the content of Section 1.',
        },
        {
          id: 'contact-section',
          title: 'Contact Information',
          isOpen: false,
          content: 'This is the content of Section 2.',
        },
        {
          id: 'experiences-section',
          title: 'Experience',
          isOpen: false,
          content: 'This is the content of Section 3.',
        },
        {
          id: 'educations-section',
          title: 'Education',
          isOpen: false,
          content: 'This is the content of Section 3.',
        },
        {
          id: 'skills-section',
          title: 'Skills',
          isOpen: false,
          content: 'This is the content of Section 3.',
        },
        {
          id: 'others-section',
          title: 'Other Sections',
          isOpen: false,
          content: 'This is the content of Section 3.',
        },
      ],
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
      // Include the selectedPreviewLayout when saving the resume
      this.resume.previewLayout = this.selectedPreviewLayout;

      if (!this.resumeList.includes(this.selectedResume)) {
        this.resumeList.push(this.selectedResume);
      }

      localStorage.setItem(this.selectedResume, JSON.stringify(this.resume));
      localStorage.setItem('resume-list', JSON.stringify(this.resumeList));
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

    toggleSection(id) {
      const section = this.sections.find((section) => section.id === id);
      if (section) {
        section.isOpen = !section.isOpen;
      }
    },

    printResume() {
      this.activeTab = 'preview';
      const printWindow = window.open('', '', 'width=800,height=600');
      const previewHTML = document.querySelector('.A4').innerHTML;
      const styles = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules)
              .map(rule => rule.cssText)
              .join('');
          } catch (e) {
            return '';
          }
        })
        .join('');
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

    loadResume() {
      // Load the selected resume from the list
      this.resume = JSON.parse(localStorage.getItem(this.selectedResume));

      // If the preview layout is saved in the resume data, load it
      if (this.resume && this.resume.previewLayout) {
        this.selectedPreviewLayout = this.resume.previewLayout;
      }
    },

    addNewResume() {
      // Prompt user to add a new resume name
      const newResumeName = prompt('Enter a new resume title:');
      if (newResumeName) {
        // Add new resume to the list and make it the active resume
        this.selectedResume = newResumeName;
        this.resume = {
          title: '',
          description: '',
          contact: {},
          experiences: [],
          educations: [],
          skills: [],
          others: [],
          previewLayout: 'lite'  // Default preview layout
        };
        // Save it in localStorage
        this.resumeList.push(newResumeName);
        localStorage.setItem('resume-list', JSON.stringify(this.resumeList));
        localStorage.setItem(newResumeName, JSON.stringify(this.resume));
      }
    },

    deleteResume() {
      // Confirm before deleting
      if (confirm(`Are you sure you want to delete the resume "${this.selectedResume}"?`)) {
        const index = this.resumeList.indexOf(this.selectedResume);
        if (index !== -1) {
          // Remove resume from the list
          this.resumeList.splice(index, 1);
          localStorage.setItem('resume-list', JSON.stringify(this.resumeList));
          // Remove resume from localStorage
          localStorage.removeItem(this.selectedResume);
          // Set default values or select another resume if needed
          this.selectedResume = this.resumeList.length > 0 ? this.resumeList[0] : '';
          this.resume = {};
        }
      }
    },

    cloneResume() {
      // Clone the selected resume
      const clonedResume = JSON.parse(JSON.stringify(this.resume));

      // Prompt the user for a new title for the cloned resume
      const newResumeName = prompt('Enter a name for the cloned resume:');
      if (newResumeName) {
        // Add the cloned resume to the list and save it in localStorage
        this.resumeList.push(newResumeName);
        localStorage.setItem('resume-list', JSON.stringify(this.resumeList));
        localStorage.setItem(newResumeName, JSON.stringify(clonedResume));

        // Switch to the newly cloned resume
        this.selectedResume = newResumeName;
        this.resume = clonedResume;
      }
    }
  }
};
</script>
<style>
input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  width: 100%;
  min-height: 120px;
  resize: vertical;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #4caf50 #f9f9f9;
  /* Customize scrollbar color */
}
</style>
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

h2,
h3,
h4 {
  margin-bottom: 10px;
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

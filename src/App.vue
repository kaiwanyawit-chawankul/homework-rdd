<!-- src/App.vue -->

<template>
  <div id="app">
    <div class="form-container">
      <h2>Resume Form</h2>
      <form @submit.prevent="saveData">
        <div>
          <label>Title</label>
          <input v-model="resume.title" placeholder="Your title">
        </div>

        <div>
          <label>Description</label>
          <textarea v-model="resume.description" placeholder="Brief description"></textarea>
        </div>

        <!-- Contact Section -->
        <div>
          <h3>Contact Information</h3>
          <input v-model="resume.contact.name" placeholder="Name">
          <input v-model="resume.contact.address" placeholder="Address">
          <input v-model="resume.contact.mobile" placeholder="Mobile">
          <input v-model="resume.contact.email" placeholder="Email">
        </div>

        <!-- Skills Section -->
        <div>
          <h3>Skills</h3>
          <div v-for="(skill, index) in resume.skills[0].items" :key="index" class="skill-item">
            <input v-model="skill.name" placeholder="Skill Name" />
            <input v-model="skill.rating" placeholder="Skill Rating" />
            <button type="button" @click="removeSkill(index)">Remove</button>
          </div>
          <button type="button" @click="addSkill">Add Skill</button>
        </div>

        <button type="submit">Save Data</button>
      </form>
    </div>

    <div class="preview-container">
      <h2>Resume Preview</h2>
      <div class="resume-preview" v-if="resume.title">
        <h3>{{ resume.title }}</h3>
        <p>{{ resume.description }}</p>
        <h4>Contact</h4>
        <p>{{ resume.contact.name }}</p>
        <p>{{ resume.contact.mobile }}</p>
        <p>{{ resume.contact.email }}</p>

        <h4>Skills</h4>
        <ul>
          <li v-for="(skill, index) in resume.skills[0].items" :key="index">
            {{ skill.name }} - {{ skill.rating }}
          </li>
        </ul>
      </div>
    </div>
  <!-- Export/Import Buttons -->
    <button @click="exportData">Export Data</button>
    <input type="file" @change="importData" />
    <button @click="printResume">Print Resume</button>
  </div>
</template>

<script>
import { resumeData } from './data';

export default {
  data() {
    return {
      resume: JSON.parse(localStorage.getItem('resume')) || resumeData
    };
  },
  methods: {
    addSkill() {
      this.resume.skills[0].items.push({
        name: "",
        rating: ""
      });
    },
    removeSkill(index) {
      this.resume.skills[0].items.splice(index, 1);
    },
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
      printWindow.document.write('<html><head><title>Resume</title></head><body>');
      printWindow.document.write('<h1>' + this.resume.title + '</h1>');
      printWindow.document.write('<p>' + this.resume.description + '</p>');
      printWindow.document.write('<p>' + this.resume.contact.name + '</p>');
      printWindow.document.write('<p>' + this.resume.contact.mobile + '</p>');
      printWindow.document.write('<p>' + this.resume.contact.email + '</p>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
};
</script>

<style scoped>
/* Add some styles for the form and preview */
</style>

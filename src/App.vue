<!-- src/App.vue -->

<template>
  <div id="app">
    <div class="form-container">
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

        <!-- Contact Section -->
        <div>
          <h3>Contact Information</h3>
          <label for="name">Name</label>
          <input v-model="resume.contact.name" placeholder="Name">
          <label for="address">Address</label>
          <input v-model="resume.contact.address" placeholder="Address">
          <label for="mobile">Mobile</label>
          <input v-model="resume.contact.mobile" placeholder="Mobile">
          <label for="email">Email</label>
          <input v-model="resume.contact.email" placeholder="Email">
        </div>

        <!-- Experiences Section -->
        <div>
          <h3>Experience</h3>
          <div v-for="(experience, index) in resume.experiences" :key="index" class="experience-item">
            <input v-model="experience.company" placeholder="Company Name" />
            <input v-model="experience.title" placeholder="Job Title" />
            <input v-model="experience.startDate" placeholder="Start Date" type="date" />
            <input v-model="experience.endDate" placeholder="End Date" type="date" />
            <textarea v-model="experience.tasks[0]" placeholder="Task"></textarea>
            <button type="button" @click="removeExperience(index)">Remove Experience</button>
          </div>
          <button type="button" @click="addExperience">Add Experience</button>
        </div>

        <!-- Education Section -->
        <div>
          <h3>Education</h3>
          <div v-for="(education, index) in resume.educations" :key="index" class="education-item">
            <input v-model="education.degree" placeholder="Degree" />
            <input v-model="education.school" placeholder="School" />
            <input v-model="education.startDate" placeholder="Start Date" type="date" />
            <input v-model="education.endDate" placeholder="End Date" type="date" />
            <button type="button" @click="removeEducation(index)">Remove Education</button>
          </div>
          <button type="button" @click="addEducation">Add Education</button>
        </div>

        <!-- Skills Section -->
        <div>
          <h3>Skills</h3>
          <div v-for="(skillCategory, categoryIndex) in resume.skills" :key="categoryIndex" class="skill-category">
            <input v-model="skillCategory.title" placeholder="SkillCategory Title" />
            <div v-for="(skill, skillIndex) in skillCategory.items" :key="skillIndex" class="skill-item">
              <input v-model="skill.name" placeholder="Skill Name" />
              <input v-model="skill.rating" placeholder="Skill Rating" />
              <button type="button" @click="removeSkill(categoryIndex, skillIndex)">Remove Skill</button>
            </div>
            <button type="button" @click="addSkill(categoryIndex)">Add Skill</button>
            <button type="button" @click="removeSkillCategory(categoryIndex)">Remove Skill Category</button>
          </div>
          <button type="button" @click="addSkillCategory">Add Skill Category</button>
        </div>

        <div>
          <h3>Other Sections</h3>
          <div v-for="(otherSection, sectionIndex) in resume.others" :key="sectionIndex" class="other-section">
            <h4>{{ otherSection.title }}</h4>
            <div v-for="(item, itemIndex) in otherSection.items" :key="itemIndex" class="other-item">
              <input v-model="otherSection.items[itemIndex]" placeholder="Item Name" />
              <button type="button" @click="removeItem(sectionIndex, itemIndex)">Remove Item</button>
            </div>
            <button type="button" @click="addItem(sectionIndex)">Add Item</button>
            <button type="button" @click="removeSection(sectionIndex)">Remove Section</button>
          </div>
          <button type="button" @click="addSection">Add Other Section</button>
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

        <h4>Experience</h4>
        <ul>
          <li v-for="(experience, index) in resume.experiences" :key="index">
            <strong>{{ experience.company }}</strong> - {{ experience.title }} ({{ experience.startDate }} - {{ experience.endDate }})
            <ul>
              <li v-for="(task, taskIndex) in experience.tasks" :key="taskIndex">{{ task }}</li>
            </ul>
          </li>
        </ul>

        <h4>Education</h4>
        <ul>
          <li v-for="(education, index) in resume.educations" :key="index">
            <strong>{{ education.degree }}</strong> - {{ education.school }} ({{ education.startDate }} - {{ education.endDate }})
          </li>
        </ul>

        <h4>Skills</h4>
        <div v-for="(skillCategory, categoryIndex) in resume.skills" :key="categoryIndex">
          <h5>{{ skillCategory.title }}</h5>
          <ul>
            <li v-for="(skill, skillIndex) in skillCategory.items" :key="skillIndex">
              {{ skill.name }} - {{ skill.rating }}
            </li>
          </ul>
        </div>

        <h4>Other Sections</h4>
        <div v-for="(otherSection, sectionIndex) in resume.others" :key="sectionIndex">
          <h5>{{ otherSection.title }}</h5>
          <ul>
            <li v-for="(item, itemIndex) in otherSection.items" :key="itemIndex">
              {{ item }}
            </li>
          </ul>
        </div>
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
        // Experience Methods
        addExperience() {
      this.resume.experiences.push({
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        tasks: [""]
      });
    },
    removeExperience(index) {
      this.resume.experiences.splice(index, 1);
    },

    // Education Methods
    addEducation() {
      this.resume.educations.push({
        degree: "",
        school: "",
        startDate: "",
        endDate: ""
      });
    },
    removeEducation(index) {
      this.resume.educations.splice(index, 1);
    },
    // Add Skill Category (e.g., "TechStacks")
    addSkillCategory() {
      this.resume.skills.push({
        title: "New Category", // Default name for new categories
        items: [{ name: "", rating: "" }] // Start with one empty skill entry
      });
    },

    // Remove Skill Category
    removeSkillCategory(categoryIndex) {
      this.resume.skills.splice(categoryIndex, 1);
    },

    // Add Skill to a specific category
    addSkill(categoryIndex) {
      this.resume.skills[categoryIndex].items.push({
        name: "",
        rating: ""
      });
    },

    // Remove a skill from a specific category
    removeSkill(categoryIndex, skillIndex) {
      this.resume.skills[categoryIndex].items.splice(skillIndex, 1);
    },
    // Add Other Section (e.g., "Certifications", "Side Projects")
    addSection() {
      this.resume.others.push({
        title: "New Section", // Default title for the new section
        items: [""] // Start with one empty item for the new section
      });
    },

    // Remove Other Section
    removeSection(sectionIndex) {
      this.resume.others.splice(sectionIndex, 1);
    },

    // Add Item to a specific Other Section (e.g., add a new certification or project)
    addItem(sectionIndex) {
      this.resume.others[sectionIndex].items.push(""); // Adds an empty item
    },

    // Remove Item from a specific Other Section
    removeItem(sectionIndex, itemIndex) {
      this.resume.others[sectionIndex].items.splice(itemIndex, 1); // Removes the item at itemIndex
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

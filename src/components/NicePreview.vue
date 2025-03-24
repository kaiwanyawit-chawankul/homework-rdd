<template>
  <div class="resume">
    <!-- Header: Name and Contact Information -->
    <section class="header">
      <h1>{{ resume.contact.name }}</h1>
      <p>
        <a :href="'mailto:' + resume.contact.email">{{ resume.contact.email }}</a> ·
        <a :href="'tel:' + resume.contact.mobile">{{ resume.contact.mobile }}</a> ·
        {{ resume.contact.address }}
      </p>
    </section>

    <!-- Summary Section -->
    <section class="summary">
      <h2>Summary</h2>
      <p>{{ resume.description }}</p>
    </section>

    <!-- Core Competencies Section -->
    <section class="core-competencies">
      <h2>Core Competencies</h2>
      <ul>
        <li v-for="(competency, index) in resume.skills[0].items" :key="index">
          {{ competency.name }}
        </li>
      </ul>
    </section>

    <!-- Professional Experience Section -->
    <section class="experience">
      <h2>Professional Experience</h2>
      <div v-for="(experience, index) in resume.experiences" :key="index" class="experience-item">
        <div class="experience-header">
          <h3>{{ experience.title }} | {{ experience.company }}</h3>
          <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
        </div>
        <ul>
          <li v-for="(task, taskIndex) in experience.tasks" :key="taskIndex">{{ task }}</li>
        </ul>
      </div>
    </section>

    <!-- Education Section -->
    <section class="education">
      <h2>Education</h2>
      <div v-for="(education, index) in resume.educations" :key="index" class="education-item">
        <ul>
          <li>{{ education.degree }} from {{ education.school }} · {{ formatYear(education.startDate) }} - {{
            formatYear(education.endDate) }}</li>
        </ul>
      </div>
    </section>

    <!-- Certifications Section -->
    <section class="certifications">
      <h2>Certifications</h2>
      <div v-for="(certification, index) in resume.others[0].items" :key="index" class="certification-item">
        <ul>
          <li>{{ certification }}</li>
        </ul>
      </div>
    </section>

    <!-- Technical Proficiencies Section -->
    <section class="technical-proficiencies">
      <h2>Technical Proficiencies</h2>
      <table>
        <tbody>
          <tr v-show="false">
            <th>Language</th>
            <th>Rating</th>
          </tr>
          <tr v-for="(tech, index) in resume.skills[1].items" :key="index">
            <td>{{ tech.name }}</td>
            <td>{{ tech.rating }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    resume: Object
  },
  methods: {
    formatYear(dateString) {
      const date = new Date(dateString);
      return date.getFullYear(); // Extracts the year (2005)
    },
    formatYearMonth(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        return "Present"; // Handle invalid input
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed

      return `${year}-${month}`;
    }
  }
};
</script>

<style scoped>
.resume {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.header h1 {
  margin-bottom: 0;
}

.header p {
  margin: 5px 0;
}

section h2 {
  font-size: 1.5em;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  text-align: left;
}

section h3 {
  margin-bottom: 5px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin: 5px 0;
}

.certification-item li {
  list-style-type: disc;
  padding-left: 10px;
  margin-left: 20px;
  text-align: left;
}

.education-item li {
  list-style-type: disc;
  padding-left: 10px;
  margin-left: 20px;
  text-align: left;
}

.experience-item {
  display: flex;
  flex-direction: column;
}

.experience-item li {
  list-style-type: disc;
  padding-left: 10px;
  margin-left: 20px;
  text-align: left;
}


.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
  border-bottom: 1px dotted black;
}

.experience-header h3,
p {
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}

.certifications,
.technical-proficiencies {
  margin-top: 20px;
}
</style>

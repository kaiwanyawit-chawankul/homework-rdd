<template>
  <div class="resume">
    <!-- Header: Name and Contact Information -->
    <section class="header" v-if="resume.contact">
      <h1>{{ resume.contact.name }}</h1>
      <p>{{ resume.contact.address }}</p>
      <p>
        Email:
        <a :href="'mailto:' + resume.contact.email" aria-label="Email link">{{
          resume.contact.email
        }}</a>
      </p>
      <p>
        Mobile:
        <a :href="'tel:' + resume.contact.mobile" aria-label="Mobile link">{{
          resume.contact.mobile
        }}</a>
      </p>
      <!-- Add social links here if you have them in your resume data -->
    </section>

    <!-- Summary Section (if you want to add a description for the resume) -->
    <section class="summary">
      <h2>Summary</h2>
      <p>{{ resume.description }}</p>
    </section>

    <!-- Experience Section -->
    <section class="experience">
      <h2>Experience</h2>
      <div
        v-for="(experience, index) in resume.experiences"
        :key="index"
        class="experience-item"
      >
        <h3>{{ experience.title }} at {{ experience.company }}</h3>
        <p>{{ experience.startDate }} - {{ experience.endDate }}</p>
        <ul>
          <li v-for="(task, taskIndex) in experience.tasks" :key="taskIndex">
            {{ task }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Education Section -->
    <section class="education">
      <h2>Education</h2>
      <div
        v-for="(education, index) in resume.educations"
        :key="index"
        class="education-item"
      >
        <h3>{{ education.degree }} from {{ education.school }}</h3>
        <p>{{ education.startDate }} - {{ education.endDate }}</p>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills">
      <h2>Skills</h2>
      <div
        v-for="(skillCategory, index) in resume.skills"
        :key="index"
        class="skills-category"
      >
        <h3>{{ skillCategory.title }}</h3>
        <ul>
          <li
            v-for="(skill, skillIndex) in skillCategory.items"
            :key="skillIndex"
          >
            <strong>{{ skill.name }}</strong
            >: {{ skill.rating }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Other Sections (Certifications, Projects, Portfolios) -->
    <section class="others">
      <div
        v-for="(other, index) in resume.others"
        :key="index"
        class="other-item"
      >
        <h3>{{ other.title }}</h3>
        <ul>
          <li v-for="(item, itemIndex) in other.items" :key="itemIndex">
            {{ item }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    resume: Object,
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
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed

      return `${year}-${month}`;
    },
  },
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
  margin-bottom: 10px;
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

.skills-category ul {
  display: flex;
  flex-wrap: wrap;
}

.skills-category li {
  margin-right: 10px;
}

.other-item ul {
  list-style-type: none;
  padding-left: 0;
}

.other-item ul li {
  margin: 5px 0;
}
</style>

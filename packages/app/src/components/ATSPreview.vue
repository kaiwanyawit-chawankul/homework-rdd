<template>
    <div class="resume">
      <div class="contact-info">
        <h1>{{ resume.contact.name }}</h1>
        <p>{{ resume.contact.address }}</p>
        <p>Email: {{ resume.contact.email }} | Phone: {{ resume.contact.mobile }}</p>
      </div>

      <section v-if="resume.description" class="description">
        <h2>Objective:</h2>
        <p>{{ resume.description }}</p>
      </section>

      <section v-if="resume.skills.length" class="skills">
        <h2>{{ resume.skills[0].title }}</h2>
        <ul>
          <li v-for="(skill, index) in resume.skills[0].items" :key="index">
            {{ skill.name }}
          </li>
        </ul>
      </section>

      <section v-if="resume.skills[1]" class="tech-stacks">
        <h2>{{ resume.skills[1].title }}</h2>
        <ul>
          <li v-for="(tech, index) in resume.skills[1].items" :key="index">
            {{ tech.name }}
          </li>
        </ul>
      </section>

      <section v-if="resume.experiences.length" class="experiences">
        <h2>Work Experience:</h2>

          <section v-for="(experience, index) in resume.experiences" :key="index">
            <h3>{{ experience.title }} | {{ experience.company }} | {{ formatMonthYear(experience.startDate) }} - {{ formatMonthYear(experience.endDate) }}</h3>
            <ul>
              <li v-for="(task, tIndex) in experience.tasks" :key="tIndex">
                {{ task }}
              </li>
            </ul>
          </section>

      </section>

      <section v-if="resume.educations.length" class="education">
        <h2>Education:</h2>
        <ul>
          <li v-for="(education, index) in resume.educations" :key="index">
            <p>{{ education.degree }} | {{ education.school }} | Graduated {{ formatMonthYear(education.endDate) }}</p>
          </li>
        </ul>
      </section>

      <section v-if="resume.others.length" class="others">
        <div v-for="(other, index) in resume.others" :key="index">
          <h2>{{ other.title }}:</h2>
          <ul>
            <li v-for="(item, itemIndex) in other.items" :key="itemIndex">{{ item }}</li>
          </ul>
        </div>
      </section>
    </div>
  </template>

  <script>
  export default {
    name: "ATSResume",
    props: {
        resume: Object,
    },
    methods: {
    formatYear(dateString) {
      const date = new Date(dateString);
      return date.getFullYear(); // Extracts the year (2005)
    },
    formatMonthYear(dateString) {
      const date = new Date(dateString);
      if (isNaN(date)) {
        return "Present"; // Handle invalid input
      }

      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" }); // Get the short month name (e.g., "Oct")

      return `${month} ${year}`;
    },
  },
  };
  </script>

<style scoped>
.resume {
  font-family: Arial, sans-serif;
  margin: 20px;
  font-size: 12px; /* Default font size set to 12px */
  text-align: left;
}

h1 {
  font-size: 18px; /* Adjusted size for h1 */
  font-weight: bold;
}

h2 {
  font-size: 16px; /* Adjusted size for h2 */
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding-left: 0px;
}

ul li {
  position: relative;
  padding-left: 10px;
}

ul li::before {
  content: "-";
  position: absolute;
  left: 0;
  top: 0;
}

li {
  margin-bottom: 5px;
}

.contact-info {
  margin-bottom: 20px;
}

.skills ul, .tech-stacks ul {
  display: flex;
  flex-wrap: wrap;
}

.skills li, .tech-stacks li {
  margin-right: 15px;
}

section {
  margin-top: 30px;
}
</style>

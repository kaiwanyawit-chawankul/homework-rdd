<!-- src/components/LeftRightPreview.vue -->

<template>
  <div class="left-right-preview">
    <!-- Left Side -->
    <div class="left-side">
      <div class="contact-info" v-if="resume.contact">
        <h2>{{ resume.contact.name }}</h2>
        <p>
          <strong>{{ resume.title }}</strong>
        </p>
        <h3>Contact</h3>
        <p><strong>Address:</strong> {{ resume.contact.address }}</p>
        <p><strong>Mobile:</strong> {{ resume.contact.mobile }}</p>
        <p><strong>Email:</strong> {{ resume.contact.email }}</p>
      </div>

      <div class="portfolios" v-if="resume.others && resume.others[2]">
        <h3>Portfolios</h3>
        <ul>
          <li v-for="(portfolio, index) in resume.others[2].items" :key="index">
            {{ portfolio }}
          </li>
        </ul>
      </div>

      <div class="skills">
        <div
          v-for="(skillCategory, categoryIndex) in resume.skills"
          :key="categoryIndex"
        >
          <h4>{{ skillCategory.title }}</h4>
          <ul>
            <li
              v-for="(skill, skillIndex) in skillCategory.items"
              :key="skillIndex"
            >
              <strong>{{ skill.name }}</strong>
              <!-- Progress Bar -->
              <div class="progress-container">
                <div
                  class="progress-bar"
                  :style="{ width: skill.rating + '%' }"
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="right-side">
      <div class="description">
        <p>{{ resume.description }}</p>
      </div>

      <div class="experience">
        <h3>Work history</h3>
        <div
          v-for="(experience, index) in resume.experiences"
          :key="index"
          class="experience-item"
        >
          <div class="experience-header">
            <div>
              <strong>{{ experience.title }}</strong>
              <p>{{ experience.company }}</p>
            </div>

            <p>
              {{ formatYearMonth(experience.startDate) }} -
              {{ formatYearMonth(experience.endDate) }}
            </p>
          </div>
          <div>
            <ul>
              <li
                v-for="(task, taskIndex) in experience.tasks"
                :key="taskIndex"
              >
                {{ task }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="education">
        <h3>Education</h3>
        <div
          v-for="(education, index) in resume.educations"
          :key="index"
          class="education-item"
        >
          <!-- Left box for duration -->
          <div class="duration-box">
            <p>
              {{ formatYear(education.startDate) }} -
              {{ formatYear(education.endDate) }}
            </p>
          </div>

          <!-- Right side for degree and school -->
          <div class="details">
            <p>
              <strong>{{ education.degree }}</strong>
            </p>
            <p>{{ education.school }}</p>
          </div>
        </div>
      </div>

      <div class="others" v-if="resume.others">
        <div
          v-for="(otherSection, sectionIndex) in resume.others.slice(0, 2)"
          :key="sectionIndex"
        >
          <h4>{{ otherSection.title }}</h4>
          <ul>
            <li
              v-for="(item, itemIndex) in otherSection.items"
              :key="itemIndex"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
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
* {
  text-align: left;
}

h3,
h4 {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding-top: 5px; /* Optional: add some space above the text */
  padding-bottom: 5px; /* Optional: add some space below the text */
  margin-top: 10px; /* Optional: add some space above the top border */
  margin-bottom: 10px; /* Optional: add some space below the bottom border */
  font-weight: bold;
}

.left-right-preview {
  display: flex;
  justify-content: space-between;
}

.left-side {
  width: 30%;
  background-color: #003366;
  color: white;
  padding: 20px;
  font-size: 14px;
  display: flex;
  /* Add flex display */
  flex-direction: column;
  /* Stack children vertically */
  align-items: flex-start;
  /* Align items to the top */
}

.right-side {
  width: 68%;
  padding: 0px 0px 0px 0px;
  display: flex;
  /* Add flex display */
  flex-direction: column;
  /* Stack children vertically */
  align-items: flex-start;
  /* Align items to the top */
}

.left-side h2,
.left-side h3,
.left-side h4 {
  font-size: 16px;
}

.left-side ul {
  list-style-type: none;
  padding-left: 0;
}

.left-side li {
  margin-bottom: 8px;
}

.right-side h3,
.right-side h4 {
  font-size: 16px;
}

.right-side p,
.right-side ul {
  font-size: 14px;
}

.right-side ul {
  list-style-type: none;
  padding-left: 0;
}

.right-side li {
  margin-bottom: 6px;
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 5px;
}

.progress-bar {
  height: 100%;
  background-color: white;
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
}
.portfolios li {
  overflow-wrap: anywhere;
  word-break: normal;
}
.education {
  width: 100%;
}

.experience {
  margin: 20px 0;
  width: 100%;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0;
  margin-top: 0;
  padding-bottom: 0;
  margin-bottom: 10px;
  border-bottom: 1px dotted black;
}

.education-item {
  display: flex;
  align-items: flex-start;
  /* Align items to the top */
  margin-bottom: 15px;
}

.experience-item {
  margin-bottom: 15px;
}

.experience-item li {
  list-style-type: disc;
  margin-left: 15px;
}

.duration-box {
  width: 100px;
  padding: 10px;
  text-align: center;
  margin-right: 20px;
  border-radius: 5px;
}

.details p {
  margin: 5px 0;
}

.details {
  flex: 1;
}

.details ul {
  list-style-type: disc;
  padding-left: 20px;
}

.others {
  width: 100%;
}

.others ul {
  list-style-type: disc;
  padding-left: 20px;
}

@media print {
  body {
    background-color: white;
    color: black;
  }
  * {
    text-align: left;
  }

  h3,
  h4 {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding-top: 5px; /* Optional: add some space above the text */
    padding-bottom: 5px; /* Optional: add some space below the text */
    margin-top: 10px; /* Optional: add some space above the top border */
    margin-bottom: 10px; /* Optional: add some space below the bottom border */
    font-weight: bold;
  }

  .left-right-preview {
    display: flex;
    justify-content: space-between;
  }

  .left-side {
    width: 30%;
    background-color: #0375e7;
    color: white;
    padding: 20px;
    font-size: 14px;
    display: flex;
    /* Add flex display */
    flex-direction: column;
    /* Stack children vertically */
    align-items: flex-start;
    /* Align items to the top */
  }

  .right-side {
    width: 68%;
    padding: 0px 0px 0px 0px;
    display: flex;
    /* Add flex display */
    flex-direction: column;
    /* Stack children vertically */
    align-items: flex-start;
    /* Align items to the top */
  }

  .left-side h2,
  .left-side h3,
  .left-side h4 {
    font-size: 16px;
  }

  .left-side ul {
    list-style-type: none;
    padding-left: 0;
  }

  .left-side li {
    margin-bottom: 8px;
  }

  .right-side h3,
  .right-side h4 {
    font-size: 16px;
  }

  .right-side p,
  .right-side ul {
    font-size: 14px;
  }

  .right-side ul {
    list-style-type: none;
    padding-left: 0;
  }

  .right-side li {
    margin-bottom: 6px;
  }

  .progress-container {
    width: 100%;
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin-top: 5px;
  }

  .progress-bar {
    height: 100%;
    background-color: white;
    border-radius: 5px;
    transition: width 0.3s ease-in-out;
  }

  .education {
    width: 100%;
  }

  .experience {
    margin: 20px 0;
    width: 100%;
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
    margin-top: 0;
    padding-bottom: 0;
    margin-bottom: 10px;
    border-bottom: 1px dotted black;
  }

  .education-item {
    display: flex;
    align-items: flex-start;
    /* Align items to the top */
    margin-bottom: 15px;
  }

  .experience-item {
    margin-bottom: 15px;
  }

  .experience-item li {
    list-style-type: disc;
    margin-left: 15px;
  }

  .duration-box {
    width: 100px;
    padding: 10px;
    text-align: center;
    margin-right: 20px;
    border-radius: 5px;
  }

  .details p {
    margin: 5px 0;
  }

  .details {
    flex: 1;
  }

  .details ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  .others {
    width: 100%;
  }

  .others ul {
    list-style-type: disc;
    padding-left: 20px;
  }
}
</style>

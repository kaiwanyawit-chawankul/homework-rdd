<!-- src/components/LeftRightPreview.vue -->

<template>
  <div class="left-right-preview">
    <!-- Left Side -->
    <div class="left-side">
      <div class="contact-info">
        <h2>{{ resume.contact.name }}</h2>
        <p><strong>Title:</strong> {{ resume.title }}</p>
        <p><strong>Email:</strong> {{ resume.contact.email }}</p>
        <p><strong>Mobile:</strong> {{ resume.contact.mobile }}</p>
        <p><strong>Address:</strong> {{ resume.contact.address }}</p>
      </div>

      <div class="portfolios">
        <h3>Portfolios</h3>
        <ul>
          <li v-for="(portfolio, index) in resume.others[2].items" :key="index">{{ portfolio }}</li>
        </ul>
      </div>

      <div class="skills">
        <h3>Skills</h3>
        <div v-for="(skillCategory, categoryIndex) in resume.skills" :key="categoryIndex">
          <h4>{{ skillCategory.title }}</h4>
          <ul>
            <li v-for="(skill, skillIndex) in skillCategory.items" :key="skillIndex">
              <strong>{{ skill.name }}:</strong> {{ skill.rating }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Right Side -->
    <div class="right-side">
      <div class="description">
        <p><strong>Description:</strong> {{ resume.description }}</p>
      </div>

      <div class="experience">
        <h3>Experience</h3>
        <div v-for="(experience, index) in resume.experiences" :key="index" class="experience-item">
          <p><strong>Company:</strong> {{ experience.company }}</p>
          <p><strong>Title:</strong> {{ experience.title }}</p>
          <p><strong>Duration:</strong> {{ experience.startDate }} - {{ experience.endDate }}</p>
          <ul>
            <li v-for="(task, taskIndex) in experience.tasks" :key="taskIndex">{{ task }}</li>
          </ul>
        </div>
      </div>

      <div class="education">
        <h3>Education</h3>
        <div v-for="(education, index) in resume.educations" :key="index" class="education-item">
          <p><strong>Degree:</strong> {{ education.degree }}</p>
          <p><strong>School:</strong> {{ education.school }}</p>
          <p><strong>Duration:</strong> {{ education.startDate }} - {{ education.endDate }}</p>
        </div>
      </div>

      <div class="others">
        <h3>Other Sections</h3>
        <div v-for="(otherSection, sectionIndex) in resume.others.slice(0, 2)" :key="sectionIndex">
          <h4>{{ otherSection.title }}</h4>
          <ul>
            <li v-for="(item, itemIndex) in otherSection.items" :key="itemIndex">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resume: Object
  }
};
</script>

<style scoped>
.left-right-preview {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.left-side {
  width: 40%;
  padding-right: 20px;
}

.right-side {
  width: 55%;
}

.left-side h2,
.right-side h3 {
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

.left-side p,
.right-side p {
  margin: 5px 0;
}

.skills ul,
.portfolios ul,
.experience-item ul,
.education-item ul {
  padding-left: 20px;
}
</style>

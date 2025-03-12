<script setup>
import { ref } from 'vue'

defineProps({
  resume: Object,
})

const count = ref(0)
</script>

<template>
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
</template>
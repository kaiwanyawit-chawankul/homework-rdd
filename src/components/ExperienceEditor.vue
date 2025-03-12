<template>
    <div>
      <h3>Experience</h3>
      <div v-for="(experience, index) in experiences" :key="index" class="experience-item">
        <input v-model="experience.company" placeholder="Company Name" />
        <input v-model="experience.title" placeholder="Job Title" />
        <input v-model="experience.startDate" placeholder="Start Date" type="date" />
        <input v-model="experience.endDate" placeholder="End Date" type="date" />
        <textarea v-model="experience.tasks[0]" placeholder="Task"></textarea>
        <button type="button" @click="removeExperience(index)">Remove Experience</button>
      </div>
      <button type="button" @click="addExperience">Add Experience</button>
    </div>
  </template>

  <script>
  export default {
    props: {
      experiences: {
        type: Array,
        required: true
      }
    },
    methods: {
      addExperience() {
        this.experiences.push({
          company: "",
          title: "",
          startDate: "",
          endDate: "",
          tasks: [""]
        });
      },
      removeExperience(index) {
        this.experiences.splice(index, 1);
      }
    }
  };
  </script>

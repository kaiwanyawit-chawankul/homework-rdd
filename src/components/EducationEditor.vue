<template>
    <div>
      <h3>Education</h3>
      <div v-for="(education, index) in educations" :key="index" class="education-item">
        <input v-model="education.degree" placeholder="Degree" />
        <input v-model="education.school" placeholder="School" />
        <input v-model="education.startDate" placeholder="Start Date" type="date" />
        <input v-model="education.endDate" placeholder="End Date" type="date" />
        <button type="button" @click="removeEducation(index)">Remove Education</button>
      </div>
      <button type="button" @click="addEducation">Add Education</button>
    </div>
  </template>

  <script>
  export default {
    props: {
      educations: {
        type: Array,
        required: true
      }
    },
    methods: {
      addEducation() {
        this.educations.push({
          degree: "",
          school: "",
          startDate: "",
          endDate: ""
        });
      },
      removeEducation(index) {
        this.educations.splice(index, 1);
      }
    }
  };
  </script>

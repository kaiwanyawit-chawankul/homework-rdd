<template>
    <div>
      <div v-for="(experience, index) in experiences" :key="index" class="experience-item">
        <input v-model="experience.company" placeholder="Company Name" />
        <input v-model="experience.title" placeholder="Job Title" />
        <input v-model="experience.startDate" placeholder="Start Date" type="date" />
        <input v-model="experience.endDate" placeholder="End Date" type="date" />
        <div v-for="(task, taskIndex) in experience.tasks" :key="taskIndex">
          <textarea v-model="experience.tasks[taskIndex]" placeholder="Task"></textarea>
          <button type="button" @click="removeTask(experience, taskIndex)">Remove Task</button>
          <button v-if="taskIndex ==0" type="button" @click="splitTask(experience)">Split Tasks</button>
        </div>
        <button type="button" @click="addTask(experience)">Add Task</button>
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
      addTask(experience) {
        experience.tasks.push("");
      },
      addExperience() {
        this.experiences.push({
          company: "",
          title: "",
          startDate: "",
          endDate: "",
          tasks: [""]
        });
      },
      splitTask(experience) {
        //split multiple tasks into separate tasks
        const tasks = experience.tasks[0].split("\n");
        experience.tasks.splice(0, 1, ...tasks);
      },
      removeTask(experience, taskIndex) {
        experience.tasks.splice(taskIndex, 1);
      },
      removeExperience(index) {
        this.experiences.splice(index, 1);
      }
    }
  };
  </script>

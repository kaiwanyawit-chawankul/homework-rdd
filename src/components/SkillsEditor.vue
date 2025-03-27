<template>
    <div>
      <div v-for="(skillCategory, categoryIndex) in skills" :key="categoryIndex" class="skill-category">
        <!-- Skill Category Title -->
        <input v-model="skillCategory.title" placeholder="Skill Category Title" />

        <!-- Skill Items within a Category -->
        <div v-for="(skill, skillIndex) in skillCategory.items" :key="skillIndex" class="skill-item">
          <textarea v-model="skill.name" placeholder="Skill Name"></textarea>
          <input v-model="skill.rating" placeholder="Skill Rating" />
          <button type="button" @click="removeSkill(categoryIndex, skillIndex)">Remove Skill</button>
          <button v-if="skillIndex ==0" type="button" @click="splitSkill(skillCategory)">Split Skills</button>
        </div>

        <!-- Add Skill Button -->
        <button type="button" @click="addSkill(categoryIndex)">Add Skill</button>

        <!-- Remove Skill Category Button -->
        <button type="button" @click="removeSkillCategory(categoryIndex)">Remove Skill Category</button>
      </div>

      <!-- Add Skill Category Button -->
      <button type="button" @click="addSkillCategory">Add Skill Category</button>
    </div>
  </template>

  <script>
  export default {
    props: {
      skills: {
        type: Array,
        required: true
      }
    },
    methods: {
      // Add a new Skill Category (e.g., "TechStacks")
      addSkillCategory() {
        this.skills.push({
          title: "New Category", // Default name for new categories
          items: [{ name: "", rating: "" }] // Start with one empty skill entry
        });
      },

      // Remove a Skill Category
      removeSkillCategory(categoryIndex) {
        this.skills.splice(categoryIndex, 1);
      },

      // Add a Skill to a specific Skill Category
      addSkill(categoryIndex) {
        this.skills[categoryIndex].items.push({
          name: "",
          rating: ""
        });
      },

      // Remove a Skill from a specific Skill Category
      removeSkill(categoryIndex, skillIndex) {
        this.skills[categoryIndex].items.splice(skillIndex, 1);
      },

      splitSkill(skillCategory) {
        //split multiple tasks into separate tasks
        const skills = skillCategory.items[0].name.split("\n");
        const skillItems = skills.map(skill => ({ name: skill, rating: "" }));
        skillCategory.items.splice(0, 1, ...skillItems);
      },
    }
  };
  </script>

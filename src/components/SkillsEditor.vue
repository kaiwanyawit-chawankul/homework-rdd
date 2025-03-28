<template>
  <div class="space-y-8">
    <section v-for="(skillCategory, categoryIndex) in localSkills" :key="categoryIndex"
      class="bg-white p-6 rounded-lg shadow-md space-y-6 relative" aria-labelledby="skill-category-title-{{ categoryIndex }}">

      <!-- Skill Category Title -->
      <div>
        <label :for="'skill-category-title-' + categoryIndex" class="text-sm font-semibold text-gray-700">Skill Category
          Title</label>
        <input v-model="skillCategory.title" :id="'skill-category-title-' + categoryIndex"
          placeholder="Skill Category Title" aria-describedby="skill-category-title-description"
          class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />

        <!-- Remove Skill Category Button -->
        <button type="button" @click="removeSkillCategory(categoryIndex)" :id="'remove-skill-category-' + categoryIndex"
          :aria-label="'Remove ' + skillCategory.title + ' category'"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Skill Items within a Category -->
      <ul class="space-y-4">
        <li v-for="(skill, skillIndex) in skillCategory.items" :key="skillIndex"
          class="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4 relative">

          <!-- Remove Skill Button (X button for each skill) -->
          <button type="button" @click="removeSkill(categoryIndex, skillIndex)"
            :id="'remove-skill-' + categoryIndex + '-' + skillIndex" :aria-label="'Remove ' + skill.name + ' skill'"
            class="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Skill Name -->
          <div>
            <label :for="'skill-name-' + categoryIndex + '-' + skillIndex"
              class="text-sm font-semibold text-gray-700">Skill Name</label>
            <textarea v-model="skill.name" :id="'skill-name-' + categoryIndex + '-' + skillIndex"
              placeholder="Skill Name" aria-describedby="skill-name-description"
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
          </div>

          <!-- Skill Rating -->
          <div>
            <label :for="'skill-rating-' + categoryIndex + '-' + skillIndex"
              class="text-sm font-semibold text-gray-700">Skill Rating</label>
            <input v-model="skill.rating" :id="'skill-rating-' + categoryIndex + '-' + skillIndex"
              placeholder="Skill Rating" aria-describedby="skill-rating-description"
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <!-- Split Skills Button -->
          <button v-if="skillIndex == 0" type="button" @click="splitSkill(skillCategory)"
            :id="'split-skill-' + categoryIndex" :aria-label="'Split skills in ' + skillCategory.title"
            class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none flex items-center">
            Split Skills
          </button>
        </li>
      </ul>

      <!-- Add Skill Button -->
      <button type="button" @click="addSkill(categoryIndex)" :id="'add-skill-' + categoryIndex"
        aria-label="Add new skill to this category"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none">
        Add Skill
      </button>
    </section>

    <!-- Add Skill Category Button -->
    <button type="button" @click="addSkillCategory" :id="'add-skill-category'" aria-label="Add a new skill category"
      class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none">
      Add Skill Category
    </button>
  </div>
</template>

<script>
export default {
  props: {
    skills: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localSkills: {
      get() {
        return this.skills; // Return the prop for use in the template
      },
      set(newValue) {
        this.$emit("update:skills", newValue); // Emit the updated value to parent
      },
    },
  },
  methods: {
    // Add a new Skill Category (e.g., "TechStacks")
    addSkillCategory() {
      this.localSkills.push({
        title: "New Category", // Default name for new categories
        items: [{ name: "", rating: "" }], // Start with one empty skill entry
      });
    },

    // Remove a Skill Category
    removeSkillCategory(categoryIndex) {
      this.localSkills.splice(categoryIndex, 1);
    },

    // Add a Skill to a specific Skill Category
    addSkill(categoryIndex) {
      this.localSkills[categoryIndex].items.push({
        name: "",
        rating: "",
      });
    },

    // Remove a Skill from a specific Skill Category
    removeSkill(categoryIndex, skillIndex) {
      this.localSkills[categoryIndex].items.splice(skillIndex, 1);
    },

    splitSkill(skillCategory) {
      //split multiple tasks into separate tasks
      const skills = skillCategory.items[0].name.split("\n");
      const skillItems = skills.map((skill) => ({ name: skill, rating: "" }));
      skillCategory.items.splice(0, 1, ...skillItems);
    },
  },
};
</script>

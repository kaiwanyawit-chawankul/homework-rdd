<template>
    <div>
      <h3>Other Sections</h3>
      <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="other-section">
        <h4>{{ section.title }}</h4>

        <!-- Items in the Section -->
        <div v-for="(item, itemIndex) in section.items" :key="itemIndex" class="other-item">
          <input v-model="section.items[itemIndex]" placeholder="Item Name" />
          <button type="button" @click="removeItem(sectionIndex, itemIndex)">Remove Item</button>
        </div>

        <!-- Add Item Button -->
        <button type="button" @click="addItem(sectionIndex)">Add Item</button>

        <!-- Remove Section Button -->
        <button type="button" @click="removeSection(sectionIndex)">Remove Section</button>
      </div>

      <!-- Add Other Section Button -->
      <button type="button" @click="addSection">Add Other Section</button>
    </div>
  </template>

  <script>
  export default {
    props: {
      sections: {
        type: Array,
        required: true
      }
    },
    methods: {
      // Add a new Other Section (e.g., "Certifications", "Side Projects")
      addSection() {
        this.sections.push({
          title: "New Section", // Default title for new sections
          items: [""] // Start with one empty item for the new section
        });
      },

      // Remove an Other Section
      removeSection(sectionIndex) {
        this.sections.splice(sectionIndex, 1);
      },

      // Add an Item to a specific Other Section
      addItem(sectionIndex) {
        this.sections[sectionIndex].items.push(""); // Adds an empty item
      },

      // Remove an Item from a specific Other Section
      removeItem(sectionIndex, itemIndex) {
        this.sections[sectionIndex].items.splice(itemIndex, 1); // Removes the item at itemIndex
      }
    }
  };
  </script>

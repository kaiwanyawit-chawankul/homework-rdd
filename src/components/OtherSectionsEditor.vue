<template>
  <div class="space-y-8">
    <section
      v-for="(section, sectionIndex) in localSections"
      :key="sectionIndex"
      class="bg-white p-6 rounded-lg shadow-md space-y-4"
      aria-labelledby="section-title"
    >
      <!-- Section Title and Remove Section Button in Same Line -->
      <div class="flex justify-between items-center">
        <div class="flex-1">
          <label
            :for="'section-title-' + sectionIndex"
            class="block text-lg font-semibold text-gray-700 mb-2"
          >
            Category Title
          </label>
          <input
            v-model="section.title"
            :id="'section-title-' + sectionIndex"
            placeholder="Category Title"
            class="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-describedby="'section-title-' + sectionIndex"
          />
        </div>
        <!-- Remove Section Button -->
        <button
          type="button"
          @click="removeSection(sectionIndex)"
          :aria-label="'Remove ' + section.title + ' section'"
          class="text-red-500 hover:text-red-700 focus:outline-none ml-4"
          :id="'remove-section-' + sectionIndex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Items in the Section -->
      <ul class="space-y-4">
        <li
          v-for="(item, itemIndex) in section.items"
          :key="itemIndex"
          class="flex items-center space-x-4"
        >
          <label
            :for="'item-' + sectionIndex + '-' + itemIndex"
            class="text-gray-600"
          >
            Item Name
          </label>
          <input
            v-model="section.items[itemIndex]"
            :id="'item-' + sectionIndex + '-' + itemIndex"
            placeholder="Item Name"
            class="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-describedby="item-name-description"
          />
          <!-- Remove Item Button with Dynamic ID -->
          <button
            type="button"
            @click="removeItem(sectionIndex, itemIndex)"
            :aria-label="'Remove item ' + item"
            :id="'remove-item-' + sectionIndex + '-' + itemIndex"
            class="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </li>
      </ul>

      <!-- Add Item Button -->
      <button
        type="button"
        @click="addItem(sectionIndex)"
        aria-label="Add new item to this section"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        :id="'add-item-' + sectionIndex"
      >
        Add Item
      </button>
    </section>

    <!-- Add Other Section Button -->
    <button
      type="button"
      @click="addSection"
      aria-label="Add a new section"
      class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none"
      id="add-section"
    >
      Add Other Section
    </button>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localSections: {
      get() {
        return this.sections; // Return the prop for use in the template
      },
      set(newValue) {
        this.$emit("update:sections", newValue); // Emit the updated value to parent
      },
    },
  },
  methods: {
    // Add a new Other Section (e.g., "Certifications", "Side Projects")
    addSection() {
      this.localSections.push({
        title: "New Section", // Default title for new sections
        items: [""], // Start with one empty item for the new section
      });
    },

    // Remove an Other Section
    removeSection(sectionIndex) {
      this.localSections.splice(sectionIndex, 1);
    },

    // Add an Item to a specific Other Section
    addItem(sectionIndex) {
      this.localSections[sectionIndex].items.push(""); // Adds an empty item
    },

    // Remove an Item from a specific Other Section
    removeItem(sectionIndex, itemIndex) {
      this.localSections[sectionIndex].items.splice(itemIndex, 1); // Removes the item at itemIndex
    },
  },
};
</script>

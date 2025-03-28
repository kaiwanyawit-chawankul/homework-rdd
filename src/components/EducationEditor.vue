<template>
  <div class="space-y-6">
    <div
      v-for="(education, index) in localEducations"
      :key="index"
      class="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <!-- Degree Input -->
      <div class="flex flex-col">
        <label :for="'degree-' + index" class="text-sm font-semibold text-gray-700">Degree</label>
        <input
          :id="'degree-' + index"
          v-model="education.degree"
          placeholder="Degree"
          aria-label="Degree"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- School Input -->
      <div class="flex flex-col">
        <label :for="'school-' + index" class="text-sm font-semibold text-gray-700">School</label>
        <input
          :id="'school-' + index"
          v-model="education.school"
          placeholder="School"
          aria-label="School"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Start Date Input -->
      <div class="flex flex-col">
        <label :for="'start-date-' + index" class="text-sm font-semibold text-gray-700">Start Date</label>
        <input
          :id="'start-date-' + index"
          v-model="education.startDate"
          placeholder="Start Date"
          type="date"
          aria-label="Start Date"
          @change="validateDates(education)"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- End Date Input -->
      <div class="flex flex-col">
        <label :for="'end-date-' + index" class="text-sm font-semibold text-gray-700">End Date</label>
        <input
          :id="'end-date-' + index"
          v-model="education.endDate"
          placeholder="End Date"
          type="date"
          aria-label="End Date"
          @change="validateDates(education)"
          class="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Remove Education Button -->
      <button
        type="button"
        @click="removeEducation(index)"
        :aria-label="'Remove ' + education.degree + ' from education list'"
        class="mt-4 text-sm text-red-500 hover:text-red-700 focus:outline-none flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        Remove Education
      </button>
    </div>

    <!-- Add Education Button -->
    <button
      type="button"
      @click="addEducation"
      aria-label="Add Education"
      class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Add Education
    </button>
  </div>
</template>

<script>
export default {
  props: {
    educations: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localEducations: {
      get() {
        return this.educations; // Return the prop for use in the template
      },
      set(newValue) {
        this.$emit("update:educations", newValue); // Emit the updated value to parent
      },
    },
  },
  methods: {
    addEducation() {
      this.educations.push({
        degree: "",
        school: "",
        startDate: "",
        endDate: "",
      });
    },
    removeEducation(index) {
      this.educations.splice(index, 1);
    },
    validateDates(education) {
      if (education.startDate && education.endDate) {
        if (new Date(education.endDate) < new Date(education.startDate)) {
          alert("End date cannot be earlier than start date");
          education.endDate = ""; // Reset the end date
        }
      }
    },
  },
};
</script>

<style scoped>

/* Visually hide the labels but keep them for accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(100%);
  overflow: hidden;
}
</style>

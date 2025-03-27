<template>
  <div>
    <div
      v-for="(education, index) in educations"
      :key="index"
      class="education-item"
    >
      <!-- Degree Input -->
      <label :for="'degree-' + index" class="sr-only">Degree</label>
      <input
        :id="'degree-' + index"
        v-model="education.degree"
        placeholder="Degree"
        aria-label="Degree"
        class="education-input"
      />

      <!-- School Input -->
      <label :for="'school-' + index" class="sr-only">School</label>
      <input
        :id="'school-' + index"
        v-model="education.school"
        placeholder="School"
        aria-label="School"
        class="education-input"
      />

      <!-- Start Date Input -->
      <label :for="'start-date-' + index" class="sr-only">Start Date</label>
      <input
        :id="'start-date-' + index"
        v-model="education.startDate"
        placeholder="Start Date"
        type="date"
        aria-label="Start Date"
        @change="validateDates(education)"
        class="education-input"
      />

      <!-- End Date Input -->
      <label :for="'end-date-' + index" class="sr-only">End Date</label>
      <input
        :id="'end-date-' + index"
        v-model="education.endDate"
        placeholder="End Date"
        type="date"
        aria-label="End Date"
        @change="validateDates(education)"
        class="education-input"
      />

      <!-- Remove Education Button -->
      <button
        type="button"
        @click="removeEducation(index)"
        :aria-label="'Remove ' + education.degree + ' from education list'"
        class="remove-btn"
      >
        Remove Education
      </button>
    </div>

    <!-- Add Education Button -->
    <button
      type="button"
      @click="addEducation"
      aria-label="Add Education"
      class="add-btn"
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
.education-item {
  margin-bottom: 1rem;
}

.education-input {
  margin-right: 1rem;
}

button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

button:hover {
  background-color: #d32f2f;
}

.add-btn {
  background-color: #4caf50;
}

.add-btn:hover {
  background-color: #388e3c;
}

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

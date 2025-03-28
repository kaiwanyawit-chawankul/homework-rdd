<template>
  <div class="space-y-8">
    <section
      v-for="(experience, index) in localExperiences"
      :key="index"
      class="bg-white p-6 rounded-lg shadow-md space-y-6 relative"
      :id="'experience-' + index"
      aria-labelledby="'experience-' + index + '-title'"
    >
      <!-- Remove Experience Button (X Button) -->
      <button
        type="button"
        :id="'remove-experience-' + index"
        @click="removeExperience(index)"
        :aria-label="'Remove experience at ' + experience.company"
        class="absolute top-4 right-4 text-sm text-red-500 hover:text-red-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <!-- Company Name -->
      <div>
        <label
          :for="'company-' + index"
          class="text-sm font-semibold text-gray-700"
          >Company Name</label
        >
        <input
          v-model="experience.company"
          :id="'company-' + index"
          placeholder="Company Name"
          aria-describedby="'company-' + index + '-description'"
          class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Job Title -->
      <div>
        <label
          :for="'title-' + index"
          class="text-sm font-semibold text-gray-700"
          >Job Title</label
        >
        <input
          v-model="experience.title"
          :id="'title-' + index"
          placeholder="Job Title"
          aria-describedby="'title-' + index + '-description'"
          class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Start Date and End Date in Two Columns -->
      <div class="grid grid-cols-2 gap-6">
        <!-- Start Date -->
        <div>
          <label
            :for="'start-date-' + index"
            class="text-sm font-semibold text-gray-700"
            >Start Date</label
          >
          <input
            v-model="experience.startDate"
            :id="'start-date-' + index"
            placeholder="Start Date"
            type="date"
            aria-describedby="'start-date-' + index + '-description'"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <!-- End Date -->
        <div>
          <label
            :for="'end-date-' + index"
            class="text-sm font-semibold text-gray-700"
            >End Date</label
          >
          <input
            v-model="experience.endDate"
            :id="'end-date-' + index"
            placeholder="End Date"
            type="date"
            aria-describedby="'end-date-' + index + '-description'"
            class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <!-- Task List -->
      <ul>
        <li
          v-for="(task, taskIndex) in experience.tasks"
          :key="taskIndex"
          class="space-y-4 relative"
        >
          <!-- Button Container for Remove Task and Split Task -->
          <div class="absolute top-2 right-4 flex space-x-2">
            <!-- Remove Task Button (X) -->
            <button
              type="button"
              :id="'remove-task-' + index + '-' + taskIndex"
              @click="removeTask(experience, taskIndex)"
              :aria-label="'Remove task ' + task"
              class="text-sm text-red-500 hover:text-red-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <!-- Split Task Button -->
            <button
              v-if="taskIndex === 0"
              type="button"
              :id="'split-task-' + index"
              @click="splitTask(experience)"
              :aria-label="
                'Split tasks for experience at ' + experience.company
              "
              class="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              Split Tasks
            </button>
          </div>

          <div>
            <label
              :for="'task-' + index + '-' + taskIndex"
              class="text-sm font-semibold text-gray-700"
              >Task</label
            >
            <textarea
              v-model="experience.tasks[taskIndex]"
              :id="'task-' + index + '-' + taskIndex"
              placeholder="Task"
              aria-describedby="'task-' + index + '-' + taskIndex + '-description'"
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>
        </li>
      </ul>

      <!-- Add Task Button -->
      <button
        type="button"
        :id="'add-task-' + index"
        @click="addTask(experience)"
        :aria-label="'Add a new task for experience at ' + experience.company"
        class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Add Task
      </button>
    </section>

    <!-- Add Experience Button -->
    <button
      type="button"
      :id="'add-experience'"
      @click="addExperience"
      aria-label="Add a new experience"
      class="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none"
    >
      Add Experience
    </button>
  </div>
</template>

<script>
export default {
  props: {
    experiences: {
      type: Array,
      required: true,
    },
  },
  computed: {
    localExperiences: {
      get() {
        return this.experiences; // Return the prop for use in the template
      },
      set(newValue) {
        this.$emit("update:experiences", newValue); // Emit the updated value to parent
      },
    },
  },
  methods: {
    addTask(experience) {
      experience.tasks.push("");
    },
    addExperience() {
      this.localExperiences.push({
        company: "",
        title: "",
        startDate: "",
        endDate: "",
        tasks: [""],
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
      this.localExperiences.splice(index, 1);
    },
  },
};
</script>

import { mount } from "@vue/test-utils";
import ExperienceEditor from "@/components/ExperienceEditor.vue";

describe("ExperienceEditor.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ExperienceEditor, {
      propsData: {
        experiences: [
          {
            company: "Company A",
            title: "Developer",
            startDate: "2020-01-01",
            endDate: "2021-01-01",
            tasks: ["Task 1"],
          },
        ],
      },
    });
  });

  it("renders experience inputs correctly", () => {
    // Test company input field
    const companyInput = wrapper.find("#company-0");
    expect(companyInput.exists()).toBe(true);
    expect(companyInput.element.value).toBe("Company A");

    // Test job title input field
    const titleInput = wrapper.find("#title-0");
    expect(titleInput.exists()).toBe(true);
    expect(titleInput.element.value).toBe("Developer");
  });

  it("adds a task", async () => {
    // Click the 'Add Task' button
    const addTaskButton = wrapper.find("#add-task-0");
    await addTaskButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Verify that a new task input has been added
    const newTaskInput = wrapper.find("#task-0-1");
    expect(newTaskInput.exists()).toBe(true);
  });

  it("removes a task", async () => {
    // Find and click the 'Remove Task' button
    const removeTaskButton = wrapper.find("#remove-task-0-0");
    await removeTaskButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Verify that the task input is removed
    const taskInput = wrapper.find("#task-0-0");
    expect(taskInput.exists()).toBe(false);
  });

  it("splits tasks", async () => {
    // Set task name with multiple tasks separated by a new line
    const experience = wrapper.vm.localExperiences[0];
    experience.tasks[0] = "Task 1\nTask 2";

    // Click the 'Split Tasks' button
    const splitTaskButton = wrapper.find("#split-task-0");
    await splitTaskButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Verify that tasks were split into two separate task fields
    const taskInput1 = wrapper.find("#task-0-0");
    const taskInput2 = wrapper.find("#task-0-1");
    expect(taskInput1.exists()).toBe(true);
    expect(taskInput2.exists()).toBe(true);
  });

  it("removes an experience", async () => {
    // Click the 'Remove Experience' button
    const removeExperienceButton = wrapper.find("#remove-experience-0");
    await removeExperienceButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Verify that the experience section is removed
    const experienceSection = wrapper.find("#experience-0");
    expect(experienceSection.exists()).toBe(false);
  });

  it("adds a new experience", async () => {
    // Click the 'Add Experience' button
    const addExperienceButton = wrapper.find("#add-experience");
    await addExperienceButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Verify that a new experience section is added
    const newExperienceSection = wrapper.find("#experience-1");
    expect(newExperienceSection.exists()).toBe(true);
  });

  it("updates experience fields correctly", async () => {
    // Change the company name input
    const companyInput = wrapper.find("#company-0");
    await companyInput.setValue("Company B");

    // Verify that the experience's company is updated
    expect(wrapper.vm.localExperiences[0].company).toBe("Company B");

    // Similarly, test for other fields (e.g., title, start date, end date)
    const titleInput = wrapper.find("#title-0");
    await titleInput.setValue("Senior Developer");
    expect(wrapper.vm.localExperiences[0].title).toBe("Senior Developer");
  });

  it("updates start and end dates correctly", async () => {
    // Change the start date
    const startDateInput = wrapper.find("#start-date-0");
    await startDateInput.setValue("2021-06-01");
    expect(wrapper.vm.localExperiences[0].startDate).toBe("2021-06-01");

    // Change the end date
    const endDateInput = wrapper.find("#end-date-0");
    await endDateInput.setValue("2022-06-01");
    expect(wrapper.vm.localExperiences[0].endDate).toBe("2022-06-01");
  });

  it("correctly splits tasks", async () => {
    const experience = wrapper.vm.localExperiences[0];
    experience.tasks[0] = "Task 1\nTask 2";

    // Trigger the split task functionality
    const splitTaskButton = wrapper.find("#split-task-0");
    await splitTaskButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Check that tasks were split correctly into individual fields
    const taskInput1 = wrapper.find("#task-0-0");
    const taskInput2 = wrapper.find("#task-0-1");

    expect(taskInput1.element.value).toBe("Task 1");
    expect(taskInput2.element.value).toBe("Task 2");
  });

  it("adds a task and updates the tasks array", async () => {
    // Click the 'Add Task' button
    const addTaskButton = wrapper.find("#add-task-0");
    await addTaskButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Check if the tasks array has been updated
    expect(wrapper.vm.localExperiences[0].tasks.length).toBe(2);
    const newTaskInput = wrapper.find("#task-0-1");
    expect(newTaskInput.exists()).toBe(true);
  });

  it("handles no experiences gracefully", async () => {
    // Mount the component with an empty experiences array
    wrapper = mount(ExperienceEditor, {
      propsData: {
        experiences: [],
      },
    });

    await wrapper.vm.$nextTick();

    // Ensure that there's no initial experience section
    const experienceSection = wrapper.find("#experience-0");
    expect(experienceSection.exists()).toBe(false);

    // Click the 'Add Experience' button
    const addExperienceButton = wrapper.find("#add-experience");
    await addExperienceButton.trigger("click");

    await wrapper.vm.$nextTick();

    // Verify that the experience section has been added
    const newExperienceSection = wrapper.find("#experience-0");
    expect(newExperienceSection.exists()).toBe(true);
  });

  it("generates dynamic IDs correctly", () => {
    // Check dynamic ids for company input
    const companyInput = wrapper.find("#company-0");
    expect(companyInput.exists()).toBe(true);

    // Check for other dynamic fields, e.g., title, start date, etc.
    const titleInput = wrapper.find("#title-0");
    expect(titleInput.exists()).toBe(true);

    const startDateInput = wrapper.find("#start-date-0");
    expect(startDateInput.exists()).toBe(true);

    const endDateInput = wrapper.find("#end-date-0");
    expect(endDateInput.exists()).toBe(true);
  });

  it("conditionally renders the split task button", async () => {
    // Test that the Split Task button is visible only for the first task
    const experience = wrapper.vm.localExperiences[0];
    experience.tasks.push("Task 2");

    await wrapper.vm.$nextTick();

    const splitButton = wrapper.find("#split-task-0");
    expect(splitButton.exists()).toBe(true);

    // If no tasks are there, ensure the split button is not rendered
    experience.tasks = [];
    await wrapper.vm.$nextTick();

    const splitButtonAfterRemoval = wrapper.find("#split-task-0");
    expect(splitButtonAfterRemoval.exists()).toBe(false);
  });

  it("is properly exported and initialized", () => {
    expect(ExperienceEditor).toBeTruthy();
  });

  it("handles empty experiences gracefully", async () => {
    // Mount with no experiences
    wrapper = mount(ExperienceEditor, {
      propsData: {
        experiences: [],
      },
    });

    await wrapper.vm.$nextTick();

    const addExperienceButton = wrapper.find("#add-experience");
    await addExperienceButton.trigger("click");

    await wrapper.vm.$nextTick();

    const newExperienceSection = wrapper.find("#experience-0");
    expect(newExperienceSection.exists()).toBe(true);
  });

  it("adds an experience, fills out the form, and adds tasks", async () => {
    // Mount the component with an empty experiences array
    wrapper = mount(ExperienceEditor, {
      props: {
        experiences: [],
      },
    });

    // Step 1: Add a new Experience
    await wrapper.find("button#add-experience").trigger("click");

    // Step 2: Check if the new experience fields appear (Company Name, Job Title, Start Date, End Date)
    const companyInput = wrapper.find('input[aria-label^="company-"]');
    const titleInput = wrapper.find('input[aria-label^="title-"]');
    const startDateInput = wrapper.find('input[aria-label^="start-date-"]');
    const endDateInput = wrapper.find('input[aria-label^="end-date-"]');

    expect(companyInput.exists()).toBe(true);
    expect(titleInput.exists()).toBe(true);
    expect(startDateInput.exists()).toBe(true);
    expect(endDateInput.exists()).toBe(true);

    // Step 3: Fill out the Experience form fields
    await companyInput.setValue("Company ABC");
    await titleInput.setValue("Software Engineer");
    await startDateInput.setValue("2020-01-01");
    await endDateInput.setValue("2023-01-01");

    // Step 4: Check if values are updated correctly
    expect(companyInput.element.value).toBe("Company ABC");
    expect(titleInput.element.value).toBe("Software Engineer");
    expect(startDateInput.element.value).toBe("2020-01-01");
    expect(endDateInput.element.value).toBe("2023-01-01");

    // Step 5: Add a new task to the experience
    await wrapper.find('button[id^="add-task-"]').trigger("click");

    // Step 6: Fill out the task input field
    const taskInput = wrapper.find('textarea[aria-label^="task-"]');
    await taskInput.setValue("Developed new features");

    // Step 7: Check if the task is filled in correctly
    expect(taskInput.element.value).toBe("Developed new features");

    // Optionally: Check the internal state if needed
    const experiences = wrapper.vm.localExperiences;
    expect(experiences.length).toBe(1); // 1 experience
    expect(experiences[0].company).toBe("Company ABC");
    expect(experiences[0].title).toBe("Software Engineer");
    expect(experiences[0].startDate).toBe("2020-01-01");
    expect(experiences[0].endDate).toBe("2023-01-01");
    expect(experiences[0].tasks.length).toBe(2); // 1 task
    expect(experiences[0].tasks[0]).toBe("Developed new features");
  });
});

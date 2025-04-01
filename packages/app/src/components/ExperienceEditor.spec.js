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
});

import { mount } from "@vue/test-utils";
import SkillsEditor from "@/components/SkillsEditor.vue";
import { expect } from "vitest";

describe("SkillsEditor", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SkillsEditor, {
      propsData: {
        skills: [
          {
            title: "TechStacks",
            items: [
              { name: "Vue.js", rating: "4" },
              { name: "React", rating: "5" },
            ],
          },
        ],
      },
    });
  });

  it("renders skill categories", () => {
    const skillCategoryTitle = wrapper.find("#skill-category-title-0");
    expect(skillCategoryTitle.exists()).toBe(true); // Check that the first skill category title is rendered
    expect(skillCategoryTitle.element.value).toBe("TechStacks"); // Check that the correct title is displayed
  });

  it("adds a new skill category", async () => {
    const addCategoryButton = wrapper.find("#add-skill-category");
    await addCategoryButton.trigger("click");

    // Wait for the component to re-render after the state changes
    await wrapper.vm.$nextTick();

    // Check if a new category has been added
    const newCategoryTitle = wrapper.find("#skill-category-title-1");
    expect(newCategoryTitle.exists()).toBe(true); // Check that the new category title is rendered
  });

  it("adds a new skill to a category", async () => {
    const addSkillButton = wrapper.find("#add-skill-0");
    await addSkillButton.trigger("click");

    // Wait for the component to re-render after the state changes
    await wrapper.vm.$nextTick();

    // Check if a new skill has been added under category 0
    const newSkillName = wrapper.find("#skill-name-0-2"); // Checking for the third skill in category 0 (index 2)
    expect(newSkillName.exists()).toBe(true); // Check that the new skill input is rendered
  });

  it("removes a skill from a category", async () => {
    const removeSkillButton = wrapper.find("#remove-skill-0-0");
    await removeSkillButton.trigger("click");

    // Wait for the component to re-render after the state changes
    await wrapper.vm.$nextTick();

    // Check that the Vue.js skill is removed
    const skillNames = wrapper.findAll("li"); // Trying to find the first skill
    expect(skillNames).toHaveLength(1); // 1 item in section 1 + 1 item in section 2
  });

  it("removes a skill category", async () => {
    const removeCategoryButton = wrapper.find("#remove-skill-category-0");
    await removeCategoryButton.trigger("click");

    // Wait for the component to re-render after the state changes
    await wrapper.vm.$nextTick();

    // Check that the TechStacks category is removed
    const skillCategoryTitle = wrapper.find("#skill-category-title-0");
    expect(skillCategoryTitle.exists()).toBe(false); // Ensure that the first skill category is removed
  });

  it("splits skills", async () => {
    const splitSkillButton = wrapper.find("#split-skill-0");

    // Simulate the split operation
    await splitSkillButton.trigger("click");

    // Wait for the component to re-render after the state changes
    await wrapper.vm.$nextTick();

    // Check that the skills are split into separate tasks
    const skillName1 = wrapper.find("#skill-name-0-0");
    const skillName2 = wrapper.find("#skill-name-0-1");

    expect(skillName1.exists()).toBe(true); // Ensure the first split skill is created
    expect(skillName2.exists()).toBe(true); // Ensure the second split skill is created
  });

  it("updates the skills prop", async () => {
    const newSkills = [
      {
        title: "Updated Category",
        items: [{ name: "New Skill", rating: "3" }],
      },
    ];
    await wrapper.setProps({ skills: newSkills });

    // Ensure that the prop has been updated
    const updatedSkillCategoryTitle = wrapper.find("#skill-category-title-0");
    expect(updatedSkillCategoryTitle.element.value).toBe("Updated Category");
  });
});

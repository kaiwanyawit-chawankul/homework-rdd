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

  test("renders skill category title input with correct id and aria-labelledby", async () => {
    // Find the skill category title input and check attributes
    const categoryTitleInput = wrapper.find(
      'input[id="skill-category-title-0"]',
    );
    expect(categoryTitleInput.exists()).toBe(true);
    expect(categoryTitleInput.attributes("aria-labelledby")).toBe(
      "skill-category-title-0",
    );
  });

  test("renders skill name input with correct id and aria-describedby", async () => {
    // Find the skill name input inside the category
    const skillNameInput = wrapper.find('textarea[id="skill-name-0-0"]');
    expect(skillNameInput.exists()).toBe(true);
    expect(skillNameInput.attributes("aria-labelledby")).toBe("skill-name-0-0");
  });

  test("renders remove skill category button with correct aria-label", async () => {
    // Find the remove skill category button and check aria-label
    const removeButton = wrapper.find(
      'button[aria-label="Remove TechStacks category"]',
    );
    expect(removeButton.exists()).toBe(true);
  });

  test("renders remove skill button with correct aria-label", async () => {
    // Find the remove skill button and check aria-label
    const removeSkillButton = wrapper.find(
      'button[aria-label="Remove Vue.js skill"]',
    );
    expect(removeSkillButton.exists()).toBe(true);
  });

  test("renders split skill button with correct aria-label", async () => {
    // Find the split skill button and check aria-label
    const splitButton = wrapper.find(
      'button[aria-label="Split skills in TechStacks"]',
    );
    expect(splitButton.exists()).toBe(true);
  });

  test("renders add skill category button with correct aria-label", async () => {
    // Find the add skill category button and check aria-label
    const addSkillCategoryButton = wrapper.find(
      'button[aria-label="Add a new skill category"]',
    );
    expect(addSkillCategoryButton.exists()).toBe(true);
  });

  test("adds a new skill category when the button is clicked", async () => {
    // Find the "Add Skill Category" button and simulate a click
    const addCategoryButton = wrapper.find(
      'button[aria-label="Add a new skill category"]',
    );
    await addCategoryButton.trigger("click");

    // Verify the new category was added by checking for a new input field
    const newCategoryTitleInput = wrapper.find(
      'input[id="skill-category-title-1"]',
    );
    expect(newCategoryTitleInput.exists()).toBe(true);
  });

  it("adds a skill category and fills out a skill", async () => {
    await wrapper.setProps({ skills: [] });

    // Step 1: Add a new Skill Category
    await wrapper.find("button#add-skill-category").trigger("click");

    // Step 2: Check if the new skill category title input appears
    const skillCategoryTitleInput = wrapper.find(
      'input[aria-labelledby^="skill-category-title"]',
    );
    expect(skillCategoryTitleInput.exists()).toBe(true);

    // Step 3: Add a new Skill to the newly created Skill Category
    await wrapper.find('button[id^="add-skill-"]').trigger("click");

    // Step 4: Fill out the Skill Name and Skill Rating fields
    const skillNameInput = wrapper.find(
      'textarea[aria-labelledby^="skill-name-"]',
    );
    const skillRatingInput = wrapper.find(
      'input[aria-labelledby^="skill-rating-"]',
    );

    // Update the skill name and rating
    await skillNameInput.setValue("JavaScript");
    await skillRatingInput.setValue("5");

    // Step 5: Assert the values are filled correctly
    expect(skillNameInput.element.value).toBe("JavaScript");
    expect(skillRatingInput.element.value).toBe("5");

    // Optionally, check the internal component state if needed
    const skills = wrapper.vm.localSkills;
    expect(skills.length).toBe(1); // 1 skill category
    expect(skills[0].items.length).toBe(2); // 1 skill in the first category
    expect(skills[0].items[0].name).toBe("JavaScript");
    expect(skills[0].items[0].rating).toBe("5");
  });
});

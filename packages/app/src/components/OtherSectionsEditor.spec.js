import { mount } from "@vue/test-utils";
import OtherSectionsEditor from "@/components/OtherSectionsEditor.vue"; // Update with your component path

describe("OtherSectionsEditor.vue", () => {
  let wrapper;

  beforeEach(() => {
    // Mount the component with mock data
    wrapper = mount(OtherSectionsEditor, {
      propsData: {
        sections: [
          { title: "Section 1", items: ["Item 1"] },
          { title: "Section 2", items: ["Item 2", "Item 3"] },
        ],
      },
    });
  });

  it("renders the correct number of sections and items", () => {
    // Check if sections are rendered correctly
    const sections = wrapper.findAll("section");
    expect(sections).toHaveLength(2);

    // Check if items are rendered inside the sections
    const items = wrapper.findAll("li");
    expect(items).toHaveLength(3); // 1 item in section 1 + 2 items in section 2
  });

  it('should add a new section when "Add Other Section" button is clicked', async () => {
    // Find and click the "Add Other Section" button using its id
    const addButton = wrapper.find("#add-section");
    await addButton.trigger("click");

    // Check if the section count has increased
    const sections = wrapper.findAll("section");
    expect(sections).toHaveLength(3);
  });

  it('should remove a section when "Remove Section" button is clicked', async () => {
    // Find the remove button for the first section using its id
    const removeButton = wrapper.find("#remove-section-0");
    await removeButton.trigger("click");

    // Check if the section count has decreased
    const sections = wrapper.findAll("section");
    expect(sections).toHaveLength(1); // 1 section should remain
  });

  it('should add an item to a section when "Add Item" button is clicked', async () => {
    // Find and click the "Add Item" button for the first section using its id
    const addItemButton = wrapper.find("#add-item-0");
    await addItemButton.trigger("click");

    // Check if the item count in section 1 has increased
    const sectionItems = wrapper.findAll("li");
    expect(sectionItems).toHaveLength(4); // 1 item in section 1 + 2 items in section 2 + 1 added item
  });

  it('should remove an item from a section when "Remove item" button is clicked', async () => {
    // Find and click the "Remove item" button for the first item in section 2 using its id
    const removeItemButton = wrapper.find("#remove-item-1-0"); // 2nd item in section 2
    await removeItemButton.trigger("click");

    // Check if the item count in section 2 has decreased
    const sectionItems = wrapper.findAll("li");
    expect(sectionItems).toHaveLength(2); // 1 item in section 1 + 1 item in section 2
  });

  it("should update the section title when the input is changed", async () => {
    // Find the input for the first section
    const sectionTitleInput = wrapper.find("input#section-title-0");

    // Set a new value for the input and trigger input event
    await sectionTitleInput.setValue("Updated Section Title");

    // Check if the section title has been updated
    expect(sectionTitleInput.element.value).toBe("Updated Section Title");
  });

  it("should update the item name when the input is changed", async () => {
    // Find the input for the first item in the first section
    const itemInput = wrapper.find("input#item-0-0");

    // Set a new value for the item input
    await itemInput.setValue("Updated Item Name");

    // Check if the item name has been updated
    expect(itemInput.element.value).toBe("Updated Item Name");
  });
});

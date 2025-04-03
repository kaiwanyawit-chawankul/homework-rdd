import { mount } from "@vue/test-utils";
import { expect, vi } from "vitest";
import ResumeApp from "@/App2.vue"; // Adjust the path to your component

// Mock the dataStore functions as needed for the test
vi.mock("@/store", () => ({
  default: {
    getDefaultResume: vi.fn(() => ({
      title: "Test Resume",
      description: "Test Description",
      previewLayout: "lite",
    })),
    getResumeList: vi.fn(() => ["testResume"]),
    saveResume: vi.fn(),
    saveResumeList: vi.fn(),
    updateDefaultResume: vi.fn(),
    deleteResume: vi.fn(),
  },
}));

describe("ResumeApp Rendering Tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ResumeApp);
  });

  it("should render the description of the resume", () => {
    // Check if the description "Test Description" is rendered
    expect(wrapper.text()).toContain("Test Description");
  });

  it("should render the Export Resume button", () => {
    // Find the Export Resume button by its aria-label and check if it exists
    const exportButton = wrapper.find('[aria-label="Export Resume"]');
    expect(exportButton.exists()).toBe(true);
  });

  it("should render the Import Data button", () => {
    // Find the Import Data input element and check if it exists
    const importInput = wrapper.find('[aria-label="Import Data"]');
    expect(importInput.exists()).toBe(true);
  });

  it("should render the Print Resume button", () => {
    // Find the Print Resume button by its aria-label and check if it exists
    const printButton = wrapper.find('[aria-label="Print Resume"]');
    expect(printButton.exists()).toBe(true);
  });

  it("should render the Add New Resume button", () => {
    // Find the Add New Resume button by its aria-label and check if it exists
    const addButton = wrapper.find('[aria-label="Add New Resume"]');
    expect(addButton.exists()).toBe(true);
  });

  it("should render the Clone Resume button", () => {
    // Find the Clone Resume button by its aria-label and check if it exists
    const cloneButton = wrapper.find('[aria-label="Clone Resume"]');
    expect(cloneButton.exists()).toBe(true);
  });

  it("should render the Delete Resume button when there are resumes", () => {
    // Since there is a resume in the list, the delete button should be rendered
    const deleteButton = wrapper.find('[aria-label="Delete Resume"]');
    expect(deleteButton.exists()).toBe(true);
  });

  it("should render the correct preview layout options", () => {
    // Find the preview layout selector and check if the options are rendered
    const previewLayoutSelect = wrapper.find(
      '[aria-label="Choose Preview Layout"]',
    );
    expect(previewLayoutSelect.exists()).toBe(true);
    const options = previewLayoutSelect.findAll("option");
    expect(options.length).toBe(4); // Checking if all 4 options are available
    expect(options[0].text()).toBe("Lite Preview");
    expect(options[1].text()).toBe("Nice Preview");
    expect(options[2].text()).toBe("Left-Right Preview");
    expect(options[3].text()).toBe("Resume Preview");
  });

  it("should render the editor form with the save button", () => {
    // Check if the Save Resume button is rendered
    const saveButton = wrapper.find("button.bg-blue-500");
    expect(saveButton.exists()).toBe(true);
    expect(saveButton.text()).toBe("Save Resume");
  });

  it('should render the preview content when the activeTab is "preview"', async () => {
    // Ensure that the preview section is rendered
    const previewSection = wrapper.find(".preview");
    expect(previewSection.exists()).toBe(true);
  });

  it("should update selectedPreviewLayout when a new option is selected", async () => {
    // Find the select dropdown
    const previewLayoutSelect = wrapper.find(
      '[aria-label="Choose Preview Layout"]',
    );

    // Initially, the selected value should be 'lite' as per the default data
    expect(wrapper.vm.selectedPreviewLayout).toBe("lite");

    // Change the selected value to 'nice'
    await previewLayoutSelect.setValue("nice");

    // Assert that the selectedPreviewLayout has been updated
    expect(wrapper.vm.selectedPreviewLayout).toBe("nice");
  });
});

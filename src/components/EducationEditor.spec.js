import { mount } from "@vue/test-utils";
import EducationEditor from "@/components/EducationEditor.vue";

describe("EducationEditor.vue", () => {
  let wrapper;

  beforeEach(() => {
    // Setup the initial state with one education item
    wrapper = mount(EducationEditor, {
      propsData: {
        educations: [
          {
            degree: "Bachelor of Science",
            school: "Example University",
            startDate: "2020-01-01",
            endDate: "2024-01-01",
          },
        ],
      },
    });
  });

  it("renders education form with initial data", () => {
    const degreeInput = wrapper.find("input#degree-0");
    const schoolInput = wrapper.find("input#school-0");

    expect(degreeInput.element.value).toBe("Bachelor of Science");
    expect(schoolInput.element.value).toBe("Example University");
  });

  it('adds a new education entry when "Add Education" button is clicked', async () => {
    const initialLength = wrapper.vm.educations.length;

    // Find and click the "Add Education" button
    const addButton = wrapper.find('[aria-label="Add Education"]');
    await addButton.trigger("click");

    // Check that a new education item has been added
    expect(wrapper.vm.educations.length).toBe(initialLength + 1);
  });

  it('removes an education entry when "Remove Education" button is clicked', async () => {
    const initialLength = wrapper.vm.educations.length;

    // Find and click the "Remove Education" button
    const removeButton = wrapper.find(
      '[aria-label="Remove Bachelor of Science from education list"]',
    );
    await removeButton.trigger("click");

    // Check that the education item has been removed
    expect(wrapper.vm.educations.length).toBe(initialLength - 1);
  });

  it("validates end date correctly (end date cannot be earlier than start date)", async () => {
    // Simulate entering invalid dates
    const startDateInput = wrapper.find("input#start-date-0");
    const endDateInput = wrapper.find("input#end-date-0");

    await startDateInput.setValue("2020-01-01");
    await endDateInput.setValue("2019-01-01");

    // Trigger validation by updating the end date
    wrapper.vm.validateDates(wrapper.vm.educations[0]);

    // Check that the end date has been cleared (as per the validation logic)
    expect(endDateInput.element.value).toBe("");
  });

  it("does not remove education if the date validation fails", async () => {
    const initialLength = wrapper.vm.educations.length;

    // Set invalid dates and simulate user input
    const startDateInput = wrapper.find("input#start-date-0");
    const endDateInput = wrapper.find("input#end-date-0");

    await startDateInput.setValue("2021-01-01");
    await endDateInput.setValue("2020-01-01"); // Invalid end date

    // Trigger the validation
    wrapper.vm.validateDates(wrapper.vm.educations[0]);

    // Ensure the length of educations doesn't change (removal won't happen)
    expect(wrapper.vm.educations.length).toBe(initialLength);
  });

  it("renders multiple education entries when multiple are added", async () => {
    // Add another education item
    await wrapper.vm.addEducation();

    // Find all education degree input fields
    const degreeInputs = wrapper.findAll('input[id^="degree-"]');

    // There should be two education entries now
    expect(degreeInputs.length).toBe(2);
  });
});

import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ResumeApp from "./App2.vue"; // Adjust this to your actual path
import dataStore from "./store"; // Mock your dataStore

vi.mock("./store", () => ({
  default: {
    getDefaultResume: vi.fn(),
    getResumeList: vi.fn(),
    saveResume: vi.fn(),
    saveResumeList: vi.fn(),
    deleteResume: vi.fn(),
    updateDefaultResume: vi.fn(), // Mock updateDefaultResume
  },
}));

describe("ResumeApp - importData", () => {
  let wrapper;

  beforeEach(() => {
    // Mock initial data for the resume
    dataStore.getDefaultResume.mockReturnValue({
      title: "Resume 1",
      description: "Sample description",
      contact: {},
      experiences: [],
      educations: [],
      skills: [],
      others: [],
      previewLayout: "lite", // Default preview layout
    });

    dataStore.getResumeList.mockReturnValue([]);

    wrapper = mount(ResumeApp, {
      global: {
        mocks: {
          $store: dataStore,
        },
      },
    });
  });

  it("should import resume data when a file is selected", async () => {
    const mockFileContent = JSON.stringify({
      title: "Imported Resume",
      description: "Imported description",
      contact: { phone: "123456789" },
      experiences: [],
      educations: [],
      skills: [],
      others: [],
      previewLayout: "nice",
    });

    // Create a mock file (a JSON object)
    const mockFile = new File([mockFileContent], "resume.json", {
      type: "application/json",
    });

    // Spy on the FileReader to simulate reading the file
    const readAsTextSpy = vi.fn();
    const fileReaderMock = {
      readAsText: readAsTextSpy,
      onload: vi.fn(),
    };

    // Mock the global FileReader constructor
    global.FileReader = vi.fn(() => fileReaderMock);

    // Simulate selecting the file
    const fileInput = wrapper.find('input[type="file"]');

    // Set the files property of the input element
    Object.defineProperty(fileInput.element, "files", {
      value: [mockFile],
    });

    // Trigger the change event
    await fileInput.trigger("change");

    // Simulate the FileReader onload event (the file has been read)
    fileReaderMock.onload({ target: { result: mockFileContent } });

    // Ensure that the file was read and dataStore.updateDefaultResume was called
    expect(readAsTextSpy).toHaveBeenCalledWith(mockFile);

    // Check if the resume data was updated
    expect(dataStore.updateDefaultResume).toHaveBeenCalledWith({
      title: "Imported Resume",
      description: "Imported description",
      contact: { phone: "123456789" },
      experiences: [],
      educations: [],
      skills: [],
      others: [],
      previewLayout: "nice",
    });

    // Verify if the resume data in the component is updated
    expect(wrapper.vm.resume.title).toBe("Imported Resume");
    expect(wrapper.vm.resume.description).toBe("Imported description");
  });
});

import { mount } from "@vue/test-utils";
import { expect, vi } from "vitest";
import ResumeApp from "@/App2.vue"; // Adjust the path to your component

// Mock the dataStore functions as needed for the test
vi.mock("@/store", () => ({
  default: {
    getDefaultResume: vi.fn(() => ({
      title: "Test Resume",
      description: "Test Description",
    })),
    getResumeList: vi.fn(() => ["testResume"]),
    saveResume: vi.fn(),
    saveResumeList: vi.fn(),
    updateDefaultResume: vi.fn(),
  },
}));

describe("ResumeApp", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ResumeApp);
  });

  it("should trigger a file download when exportData is called", async () => {
    global.URL.createObjectURL = vi.fn(() => "mocked_url");

    // Mock the download link click behavior
    const linkClickSpy = vi.fn();

    // Mocking document.createElement to spy on the <a> tag's click method
    const originalCreateElement = document.createElement;
    document.createElement = vi.fn(() => ({
      click: linkClickSpy,
      setAttribute: vi.fn(), // Mock setAttribute in case it's called
    }));

    // Find the export button and simulate the click
    const exportButton = wrapper.find('button[aria-label="Export Resume"]');
    exportButton.trigger("click");

    // Assert that URL.createObjectURL was called
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));

    // Assert that the click method of the link element was called
    expect(linkClickSpy).toHaveBeenCalled();

    // Restore the original createElement method after the test
    document.createElement = originalCreateElement;
  });
});

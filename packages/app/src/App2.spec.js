import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { flushPromises } from "@vue/test-utils";
import ResumeApp from "./App2.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import dataStore from "./store";
import ResumeReview from "./components/ResumeReview.vue";
import LitePreview from "./components/LitePreview.vue";
import NicePreview from "./components/NicePreview.vue";
import LeftRightPreview from "./components/LeftRightPreview.vue";

vi.mock("./store", () => ({
  default: {
    getDefaultResume: vi.fn(),
    getResumeList: vi.fn(),
    saveResume: vi.fn(),
    saveResumeList: vi.fn(),
    deleteResume: vi.fn(),
    getResumeById: vi.fn(),
    defaultResumeId: "resume",
  },
}));

describe("ResumeApp.vue", () => {
  let wrapper;

  beforeEach(() => {
    dataStore.getDefaultResume.mockReturnValue({
      title: "Test Resume",
      description: "A test resume description",
      previewLayout: "lite",
    });
    dataStore.getResumeList.mockReturnValue(["resume1", "resume2"]);
    dataStore.getResumeById.mockReturnValue({
      title: "Test Resume",
      description: "A test resume description",
      previewLayout: "lite",
    });

    wrapper = mount(ResumeApp, {
      global: {
        components: {
          HeaderComponent,
          FooterComponent,
        },
        stubs: {
          "router-view": {
            template: "<div></div>",
          },
        },
      },
    });
    wrapper.vm.selectedResume = "resume1";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe(
      "Build your own resume, own your data.",
    );
  });

  it("initializes data correctly", () => {
    expect(wrapper.vm.activeTab).toBe("preview");
    expect(wrapper.vm.resume.title).toBe("Test Resume");
    expect(wrapper.vm.resumeList).toEqual(["resume1", "resume2"]);
    expect(wrapper.vm.selectedPreviewLayout).toBe("lite");
    expect(wrapper.vm.selectedResume).toBe("resume1");
  });

  it("calls saveData when save button is clicked", async () => {
    await wrapper.find("button.bg-blue-500").trigger("click");
    expect(dataStore.saveResume).toHaveBeenCalled();
    expect(dataStore.saveResumeList).toHaveBeenCalled();
  });

  // it('calls exportData when export button is clicked', () => {
  //   const linkClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  //   wrapper.find('button[aria-label="Export Resume"]').trigger('click');
  //   expect(linkClickSpy).toHaveBeenCalled();
  //   linkClickSpy.mockRestore();
  // });

  // it('calls importData when file is selected', async () => {
  //   const file = new File(['{ "title": "Imported Resume" }'], 'resume.json', { type: 'application/json' });
  //   const fileInput = wrapper.find('input[type="file"]');
  //   await fileInput.setValue(file);
  //   await flushPromises();
  //   expect(wrapper.vm.resume.title).toBe('Imported Resume');
  //   expect(dataStore.updateDefaultResume).toHaveBeenCalled();
  // });

  it("loads resume when a resume is selected", async () => {
    await wrapper.find("select").setValue("resume1");
    expect(dataStore.getResumeById).toHaveBeenCalledWith("resume1");
    expect(wrapper.vm.resume.title).toBe("Test Resume");
  });

  it('adds a new resume when "Add New Resume" button is clicked', async () => {
    global.prompt = vi.fn(() => "newResume");
    await wrapper.find('button[aria-label="Add New Resume"]').trigger("click");
    expect(wrapper.vm.resumeList).toContain("newResume");
    expect(dataStore.saveResumeList).toHaveBeenCalled();
    expect(dataStore.saveResume).toHaveBeenCalled();
  });

  it("should display delete button when there are resumes", () => {
    const deleteButton = wrapper.find('[aria-label="Delete Resume"]');
    expect(deleteButton.exists()).toBe(true);
  });

  it("should confirm and delete resume when clicked", async () => {
    const deleteButton = wrapper.find('[aria-label="Delete Resume"]');

    // Mock window.confirm to return true (simulate user confirming the deletion)
    vi.spyOn(window, "confirm").mockReturnValue(true);

    // Click the delete button
    await deleteButton.trigger("click");
    await flushPromises(); // Wait for the promises to resolve

    // Check if the confirm dialog was shown
    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete the resume "resume1"?',
    );

    // Check if the delete methods were called
    expect(dataStore.deleteResume).toHaveBeenCalledWith("resume1");
    expect(dataStore.saveResumeList).toHaveBeenCalled();
  });

  it("should not delete resume if the user cancels", async () => {
    const deleteButton = wrapper.find('[aria-label="Delete Resume"]');

    // Mock window.confirm to return false (simulate user canceling the deletion)
    vi.spyOn(window, "confirm").mockReturnValue(false);

    // Click the delete button
    await deleteButton.trigger("click");
    await flushPromises();

    // Ensure that nothing was deleted
    expect(dataStore.deleteResume).not.toHaveBeenCalled();
    expect(dataStore.saveResumeList).not.toHaveBeenCalled();
  });

  it("should update resumeList and selectedResume after deletion", async () => {
    const deleteButton = wrapper.find('[aria-label="Delete Resume"]');

    // Mock window.confirm to return true
    vi.spyOn(window, "confirm").mockReturnValue(true);

    // Click the delete button
    await deleteButton.trigger("click");
    await flushPromises();

    // Ensure the resume list has been updated correctly
    expect(dataStore.saveResumeList).toHaveBeenCalledWith(["resume2"]);
    expect(wrapper.vm.selectedResume).toBe("resume2");
  });

  it('clones the selected resume when "Clone Resume" button is clicked', async () => {
    global.prompt = vi.fn(() => "clonedResume");
    await wrapper.find('button[aria-label="Clone Resume"]').trigger("click");
    expect(wrapper.vm.resumeList).toContain("clonedResume");
    expect(dataStore.saveResumeList).toHaveBeenCalled();
    expect(dataStore.saveResume).toHaveBeenCalled();
  });

  // it('prints the resume when "Print Resume" button is clicked', async () => {
  //   const windowOpenSpy = vi.spyOn(window, 'open').mockReturnValue({ document: { write: vi.fn(), close: vi.fn() }, print: vi.fn() });
  //   await wrapper.find('button[aria-label="Print Resume"]').trigger('click');
  //   expect(windowOpenSpy).toHaveBeenCalled();
  //   windowOpenSpy.mockRestore();
  // });

  it("dynamically renders preview component", async () => {
    await wrapper.setData({ selectedPreviewLayout: "nice" });
    expect(wrapper.findComponent(NicePreview).exists()).toBe(true);
    await wrapper.setData({ selectedPreviewLayout: "left-right" });
    expect(wrapper.findComponent(LeftRightPreview).exists()).toBe(true);
    await wrapper.setData({ selectedPreviewLayout: "lite" });
    expect(wrapper.findComponent(LitePreview).exists()).toBe(true);
    await wrapper.setData({ selectedPreviewLayout: "resume" });
    expect(wrapper.findComponent(ResumeReview).exists()).toBe(true);
  });
});

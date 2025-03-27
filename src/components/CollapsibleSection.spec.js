import { mount } from "@vue/test-utils";
import CollapsibleSection from "@/components/CollapsibleSection.vue";

describe("CollapsibleSection.vue", () => {
  it("renders correctly and toggles content visibility", async () => {
    // Mount the component
    const wrapper = mount(CollapsibleSection, {
      slots: {
        default: "<p>This is a test content!</p>",
      },
    });

    // Check if the content is initially hidden
    expect(wrapper.find(".content").exists()).toBe(false);

    // Find and click the toggle button
    await wrapper.find(".toggle-button").trigger("click");

    // Now the content should be visible
    expect(wrapper.find(".content").exists()).toBe(true);

    // Check if the button text changes to "Hide"
    expect(wrapper.find(".toggle-button").text()).toBe("Hide Section");

    // Click again to collapse
    await wrapper.find(".toggle-button").trigger("click");

    // Now the content should be hidden again
    expect(wrapper.find(".content").exists()).toBe(false);

    // Check if the button text changes back to "Show"
    expect(wrapper.find(".toggle-button").text()).toBe("Show Section");
  });
});

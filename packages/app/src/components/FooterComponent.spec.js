import { mount } from "@vue/test-utils";
import FooterComponent from "@/components/FooterComponent.vue";

describe("FooterComponent", () => {
  it("renders the correct copyright message", () => {
    // Mount the component
    const wrapper = mount(FooterComponent);

    // Find the <p> tag inside the footer
    const pTag = wrapper.find("p");

    // Assert that the <p> tag contains the expected text
    expect(pTag.text()).toBe("© 2025 Resume Builder. All rights reserved.");
  });
});

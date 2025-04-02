import { mount } from "@vue/test-utils";
import HeaderComponent from "@/components/HeaderComponent.vue";

describe("HeaderComponent", () => {
  it("renders the correct title and subtitle", () => {
    // Mount the component
    const wrapper = mount(HeaderComponent);

    // Find the <h1> and <h2> tags inside the header
    const h1Tag = wrapper.find("h1");
    const h2Tag = wrapper.find("h2");

    // Assert that the <h1> tag contains the correct title
    expect(h1Tag.text()).toBe("Resume Builder");

    // Assert that the <h2> tag contains the correct subtitle
    expect(h2Tag.text()).toBe("Build your own resume, own your data.");
  });

  it("has a banner role in the header", () => {
    // Mount the component
    const wrapper = mount(HeaderComponent);

    // Find the header element and check its role attribute
    const header = wrapper.find("header");

    // Assert that the header has the role "banner"
    expect(header.attributes("role")).toBe("banner");
  });
});

import { createApp } from "vue";
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import App2 from "./App2.vue";
import router from "./router";

describe("App2.vue", () => {
  it("renders without crashing", async () => {
    const app = createApp(App2);
    app.use(router);

    const wrapper = mount(App2, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("renders the correct content", async () => {
    const app = createApp(App2);
    app.use(router);

    const wrapper = mount(App2, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.text()).toContain("Resume Builder"); // Check for some text in the app
  });

  it("uses the provided router", async () => {
    const app = createApp(App2);
    app.use(router);

    const wrapper = mount(App2, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.vm.$router).toBe(router);
  });

  it("navigates to the home route by default", async () => {
    const app = createApp(App2);
    app.use(router);

    const wrapper = mount(App2, {
      global: {
        plugins: [router],
      },
      attachTo: document.body, // required for router.push
    });

    expect(wrapper).not.toBeNull();

    await router.isReady(); // Ensure router is ready

    expect(router.currentRoute.value.path).toBe("/");
  });
});

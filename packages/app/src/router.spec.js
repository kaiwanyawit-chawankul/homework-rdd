import { describe, it, expect, vi } from "vitest";
// import { mount, flushPromises  } from '@vue/test-utils';
// import flushPromises from 'flush-promises'
// Mock components
const mockComponent = { template: "<div>Mock Component</div>" };
vi.mock("./components/Editor.vue", () => ({ default: mockComponent }));
vi.mock("./components/InfoEditor.vue", () => ({ default: mockComponent }));
vi.mock("./components/ContactEditor.vue", () => ({ default: mockComponent }));
vi.mock("./components/ExperienceEditor.vue", () => ({
  default: mockComponent,
}));
vi.mock("./components/EducationEditor.vue", () => ({ default: mockComponent }));
vi.mock("./components/SkillsEditor.vue", () => ({ default: mockComponent }));
vi.mock("./components/OtherSectionsEditor.vue", () => ({
  default: mockComponent,
}));

import router from "./router";
import { createWebHistory } from "vue-router";

describe("Vue Router", () => {
  it("should create a router instance", () => {
    expect(router).toBeDefined();
  });

  it("should have the correct routes", () => {
    const expectedRoutes = [
      {
        path: "/",
        name: "Home",
        component: expect.any(Object), // Expect any object for async components
      },
      {
        path: "/editor",
        component: expect.any(Object), // Expect any object for async components
        children: [
          { path: "info", component: expect.any(Object) },
          { path: "contact", component: expect.any(Object) },
          { path: "experience", component: expect.any(Object) },
          { path: "education", component: expect.any(Object) },
          { path: "skills", component: expect.any(Object) },
          { path: "other-sections", component: expect.any(Object) },
        ],
      },
    ];

    // Use a custom matcher to check for async components
    expect(router.options.routes).toEqual(expectedRoutes);

    // Additionally check if the components are async
    router.options.routes.forEach((route) => {
      expect(route.component.__asyncLoader).toBeDefined();
      if (route.children) {
        route.children.forEach((childRoute) => {
          expect(childRoute.component.__asyncLoader).toBeDefined();
        });
      }
    });
  });

  it("should navigate to the home route", async () => {
    await router.push("/");
    expect(router.currentRoute.value.path).toBe("/");
  });

  it("should navigate to the editor route", async () => {
    await router.push("/editor");
    expect(router.currentRoute.value.path).toBe("/editor");
  });

  it("should navigate to the editor child routes", async () => {
    await router.push("/editor/info");
    expect(router.currentRoute.value.path).toBe("/editor/info");

    await router.push("/editor/contact");
    expect(router.currentRoute.value.path).toBe("/editor/contact");

    await router.push("/editor/experience");
    expect(router.currentRoute.value.path).toBe("/editor/experience");

    await router.push("/editor/education");
    expect(router.currentRoute.value.path).toBe("/editor/education");

    await router.push("/editor/skills");
    expect(router.currentRoute.value.path).toBe("/editor/skills");

    await router.push("/editor/other-sections");
    expect(router.currentRoute.value.path).toBe("/editor/other-sections");
  });

  it("should use web history mode", () => {
    expect(router.options.history).toBeInstanceOf(
      createWebHistory().constructor,
    );
  });

  //   it('should be usable in a component', async () => {
  //     const wrapper = mount({
  //       template: '<router-view />',
  //       global: {
  //         plugins: [router],
  //       },
  //     });

  //     await router.push('/');
  //     await router.isReady();
  //     await flushPromises(); // Wait for component to render

  //     //Manually await component loading.
  //     await wrapper.vm.$nextTick();

  //     expect(wrapper.text()).toContain('Mock Component');
  //   });
});

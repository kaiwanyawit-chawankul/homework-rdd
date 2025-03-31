import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";

const Editor = defineAsyncComponent(() => import("./components/Editor.vue"));
const InfoEditor = defineAsyncComponent(
  () => import("./components/InfoEditor.vue"),
);
const ContactEditor = defineAsyncComponent(
  () => import("./components/ContactEditor.vue"),
);
const ExperienceEditor = defineAsyncComponent(
  () => import("./components/ExperienceEditor.vue"),
);
const EducationEditor = defineAsyncComponent(
  () => import("./components/EducationEditor.vue"),
);
const SkillsEditor = defineAsyncComponent(
  () => import("./components/SkillsEditor.vue"),
);
const OtherSectionsEditor = defineAsyncComponent(
  () => import("./components/OtherSectionsEditor.vue"),
);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Editor,
  },
  {
    path: "/editor",
    component: Editor,
    children: [
      { path: "info", component: InfoEditor },
      { path: "contact", component: ContactEditor },
      { path: "experience", component: ExperienceEditor },
      { path: "education", component: EducationEditor },
      { path: "skills", component: SkillsEditor },
      { path: "other-sections", component: OtherSectionsEditor },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Editor from "./components/Editor.vue";
import InfoEditor from "./components/InfoEditor.vue";
import ContactEditor from "./components/ContactEditor.vue";
import ExperienceEditor from "./components/ExperienceEditor.vue";
import EducationEditor from "./components/EducationEditor.vue";
import SkillsEditor from "./components/SkillsEditor.vue";
import OtherSectionsEditor from "./components/OtherSectionsEditor.vue";

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

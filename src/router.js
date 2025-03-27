import { createRouter, createWebHistory } from 'vue-router';
import Editor from './components/Editor.vue';
import Preview from './components/Preview.vue';
import InfoEditor from './components/InfoEditor.vue';
import ContactEditor from './components/ContactEditor.vue';
import ExperienceEditor from './components/ExperienceEditor.vue';
import EducationEditor from './components/EducationEditor.vue';
import SkillsEditor from './components/SkillsEditor.vue';
import OtherSectionsEditor from './components/OtherSectionsEditor.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Editor,
    children: [
      {
        path: 'info',
        name: 'InfoEditor',
        component: InfoEditor,
      },
      {
        path: 'contact',
        name: 'ContactEditor',
        component: ContactEditor,
      },
      {
        path: 'experience',
        name: 'ExperienceEditor',
        component: ExperienceEditor,
      },
      {
        path: 'education',
        name: 'EducationEditor',
        component: EducationEditor,
      },
      {
        path: 'skills',
        name: 'SkillsEditor',
        component: SkillsEditor,
      },
      {
        path: 'other-sections',
        name: 'OtherSectionsEditor',
        component: OtherSectionsEditor,
      },
    ],
  },
  {
    path: '/preview',
    name: 'Preview',
    component: Preview,
  },
  {
    path: '/editor',
    component: Editor,
    children: [
      { path: 'info', component: InfoEditor },
      { path: 'contact', component: ContactEditor },
      { path: 'experience', component: ExperienceEditor },
      { path: 'education', component: EducationEditor },
      { path: 'skills', component: SkillsEditor },
      { path: 'other-sections', component: OtherSectionsEditor },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

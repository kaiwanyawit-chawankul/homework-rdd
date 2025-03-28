<template>
  <div class="editor-container">
    <h2>Edit Resume</h2>
    <div class="editor-navigation">
      <!-- Links to Navigate to Different Editors -->
      <router-link to="/editor/info" class="editor-link"  active-class="active-link">Info</router-link>
      <router-link to="/editor/contact" class="editor-link" active-class="active-link"
        >Contact</router-link
      >
      <router-link to="/editor/experience" class="editor-link" active-class="active-link"
        >Experience</router-link
      >
      <router-link to="/editor/education" class="editor-link" active-class="active-link"
        >Education</router-link
      >
      <router-link to="/editor/skills" class="editor-link" active-class="active-link">Skills</router-link>
      <router-link to="/editor/other-sections" class="editor-link" active-class="active-link"
        >Other Sections</router-link
      >
    </div>

    <div class="editor-content">
      <!-- Dynamic content based on the route -->
      <router-view
        :resume="resume"
        :contact="resume.contact"
        :experiences="resume.experiences"
        :educations="resume.educations"
        :skills="resume.skills"
        :sections="resume.others"
      ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Editor",
  props: {
    resume: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.editor-container {
  padding: 20px;
}

.editor-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.editor-link {
  padding: 10px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

.editor-link:hover {
  background-color: #2980b9;
}

.editor-content {
  margin-top: 20px;
}

.active-link {
  background-color: #2ecc71; /* Green for active link */
  color: white;
}
</style>

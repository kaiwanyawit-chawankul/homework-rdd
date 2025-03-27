<template>
  <div class="toc">
    <h2>Table of Contents</h2>
    <ul>
      <li v-for="section in sections" :key="section.id">
        <a href="#" @click.prevent="toggleSection(section.id)">
          {{ section.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TOC",
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleSection(id) {
      this.$emit("toggle-section", id);
    },
  },
};
</script>

<style scoped>
.toc {
  margin-bottom: 20px;
}

.toc h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.toc ul {
  list-style-type: none;
  padding: 0;
}

.toc ul li {
  margin: 5px 0;
}

.toc ul li a {
  text-decoration: none;
  color: #007bff;
}

.toc ul li a:hover {
  text-decoration: underline;
}
</style>

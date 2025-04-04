<template>
    <div>
      <h3>Resume Score: {{ score.toFixed(2) }}</h3>
      <h4>Scoring Breakdown:</h4>
      <ul>
        <li><strong>Keyword Matching:</strong> {{ keywordMatchScore }} points</li>
        <li><strong>Length Penalty:</strong> {{ lengthPenalty }} points</li>
        <li><strong>Experience Score:</strong> {{ experienceScore }} points</li>
        <li><strong>Contact Information:</strong> {{ contactInfoScore }} points</li>
        <li><strong>Job Titles Bonus:</strong> {{ jobTitlesBonus }} points</li>
        <li><strong>Word Count:</strong> {{ wordCount }}</li>
      </ul>
    </div>
  </template>

  <script>
  export default {
    props: {
      resume: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        // Define some of the constants for matching keywords and job titles
        requiredKeywords: ["developer", "JavaScript", "React", "Vue", "backend", "frontend"], // Customize your keywords
        typicalJobTitles: ["developer", "engineer", "programmer", "software engineer", "web developer"], // Customize job titles
        wordCountLimit: 1000, // Set the maximum word count limit
      };
    },
    computed: {
      score() {
        return (
          this.keywordMatchScore +
          this.lengthPenalty +
          this.experienceScore +
          this.contactInfoScore +
          this.jobTitlesBonus
        );
      },
      wordCount() {
        return this.getWordCount(this.resume);
      },
      keywordMatchScore() {
        return this.calculateKeywordMatchScore(this.resume);
      },
      lengthPenalty() {
        return this.calculateLengthPenalty(this.resume);
      },
      experienceScore() {
        return this.calculateExperienceScore(this.resume);
      },
      contactInfoScore() {
        return this.calculateContactInfoScore(this.resume.contact);
      },
      jobTitlesBonus() {
        return this.calculateJobTitlesBonus(this.resume.experiences);
      },
    },
    methods: {
      getWordCount(resume) {
        // Calculate the word count from the resume description and experience tasks
        let content = resume.description;
        resume.experiences.forEach((exp) => {
          content += exp.tasks.join(" ");
        });
        return content.split(/\s+/).length; // Split by whitespace and count words
      },

      calculateKeywordMatchScore(resume) {
        let score = 0;
        const content = `${resume.description} ${resume.experiences.map(exp => exp.tasks.join(" ")).join(" ")}`.toLowerCase();
        this.requiredKeywords.forEach((keyword) => {
          if (content.includes(keyword.toLowerCase())) {
            score += 5; // Give 5 points for each matching keyword
          }
        });
        return score;
      },

      calculateLengthPenalty(resume) {
        const wordCount = this.getWordCount(resume);
        if (wordCount > this.wordCountLimit) {
          return -5; // Deduct 5 points if word count exceeds the limit
        }
        return 0;
      },

      calculateExperienceScore(resume) {
        let score = 0;
        resume.experiences.forEach((exp) => {
          // Calculate experience score based on years of experience
          const yearsOfExperience = this.calculateYearsOfExperience(exp.startDate, exp.endDate);
          score += yearsOfExperience * 2; // 2 points per year of experience
        });
        return score;
      },

      calculateContactInfoScore(contact) {
        let score = 0;
        if (contact.mobile && contact.email) {
          score += 10; // Award 10 points if both phone and email are provided
        }
        return score;
      },

      calculateJobTitlesBonus(experiences) {
        let score = 0;
        experiences.forEach((exp) => {
          // Check if the job title matches typical job titles
          if (this.typicalJobTitles.includes(exp.title.toLowerCase())) {
            score += 10; // Award 10 points for matching job titles
          }
        });
        return score;
      },

      calculateYearsOfExperience(startDate, endDate) {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        const years = (end - start) / (1000 * 60 * 60 * 24 * 365);
        return Math.floor(years); // Return full years of experience
      },
    },
  };
  </script>

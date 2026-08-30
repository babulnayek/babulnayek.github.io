// Sample data – later we can move this to JSON or backend API
const questions = [
  {
    category: "hdfs",
    question: "What is HDFS and why is it used?",
    answer: "HDFS (Hadoop Distributed File System) is a distributed file system designed to run on commodity hardware and store large datasets reliably."
  },
  {
    category: "spark",
    question: "Explain the difference between RDD, DataFrame, and Dataset in Spark.",
    answer: "RDD is a low-level immutable distributed collection of objects. DataFrame is a distributed collection of rows with a schema. Dataset combines the benefits of RDD (type safety) and DataFrame (optimized execution)."
  },
  {
    category: "scala",
    question: "What are case classes in Scala?",
    answer: "Case classes are special classes optimized for pattern matching, immutability, and concise syntax. They automatically provide equals, hashCode, and toString."
  },
  {
    category: "unix",
    question: "How do you find the top 10 largest files in a directory in Unix?",
    answer: "You can use: find . -type f -exec ls -lh {} \\; | sort -k5 -h | tail -n 10"
  }
  // Add more later or load from JSON/API
];

const qaContainer = document.getElementById("qaContainer");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

function renderQuestions() {
  const category = categorySelect.value;
  const searchText = searchInput.value.toLowerCase();

  qaContainer.innerHTML = "";

  questions
    .filter(q => category === "all" || q.category === category)
    .filter(q =>
      q.question.toLowerCase().includes(searchText) ||
      q.answer.toLowerCase().includes(searchText)
    )
    .forEach(q => {
      const card = document.createElement("div");
      card.className = "qa-card";

      card.innerHTML = `
        <div class="qa-category">${q.category.toUpperCase()}</div>
        <div class="qa-question">${q.question}</div>
        <div class="qa-answer">${q.answer}</div>
      `;

      qaContainer.appendChild(card);
    });
}

// Initial render
renderQuestions();

// Events
categorySelect.addEventListener("change", renderQuestions);
searchInput.addEventListener("input", renderQuestions);

// Theme toggle: Corporate → Glass → Dark
let themeIndex = 0;
const themes = ["", "theme-glass", "theme-dark"];
const themeLabels = ["Corporate", "Glass", "Dark Hacker"];

themeToggle.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.className = themes[themeIndex];
  themeToggle.textContent = `Theme: ${themeLabels[themeIndex]}`;
});

/* --------------------------------------------------
   LOAD QUESTIONS FROM questions.json
-------------------------------------------------- */
let questions = [];

async function loadQuestions() {
  try {
    const response = await fetch("questions.json");
    const data = await response.json();
    questions = data;
    renderQuestions();
  } catch (error) {
    qaContainer.innerHTML = `
      <div class="qa-card" style="text-align:center;">
        <div class="qa-question">Failed to load questions.json</div>
        <div class="qa-answer">Check file path or JSON formatting.</div>
      </div>
    `;
  }
}

/* --------------------------------------------------
   ELEMENTS
-------------------------------------------------- */
const qaContainer = document.getElementById("qaContainer");
const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

/* --------------------------------------------------
   RENDER FUNCTION
-------------------------------------------------- */
function renderQuestions() {
  const category = categorySelect.value;
  const searchText = searchInput.value.toLowerCase();

  qaContainer.innerHTML = "";

  const filtered = questions
    .filter(q => category === "all" || q.category === category)
    .filter(q =>
      q.question.toLowerCase().includes(searchText) ||
      q.answer.toLowerCase().includes(searchText)
    );

  if (filtered.length === 0) {
    qaContainer.innerHTML = `
      <div class="qa-card" style="text-align:center;">
        <div class="qa-question">No results found</div>
        <div class="qa-answer">Try a different keyword or category.</div>
      </div>
    `;
    return;
  }

  filtered.forEach(q => {
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

/* --------------------------------------------------
   EVENTS
-------------------------------------------------- */
categorySelect.addEventListener("change", renderQuestions);
searchInput.addEventListener("input", renderQuestions);

/* --------------------------------------------------
   THEME TOGGLE (Corporate → Glass → Dark Hacker)
-------------------------------------------------- */
let themeIndex = 0;
const themes = ["", "theme-glass", "theme-dark"];
const themeLabels = ["Corporate", "Glass", "Dark Hacker"];

themeToggle.addEventListener("click", () => {
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.className = themes[themeIndex];
  themeToggle.textContent = `Theme: ${themeLabels[themeIndex]}`;
});

/* --------------------------------------------------
   INITIAL LOAD
-------------------------------------------------- */
qaContainer.innerHTML = `
  <div class="qa-card" style="text-align:center;">
    <div class="qa-question">Loading questions...</div>
    <div class="qa-answer">Please wait.</div>
  </div>
`;

loadQuestions();

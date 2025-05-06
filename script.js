// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.reset();
  alert('Thank you for your message! I will respond shortly.');
});

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
});

// CTA button click handler
document.querySelector('.cta-button').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});
 // Load tasks from localStorage on page load
 window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToUI(task.text, task.completed));
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText !== "") {
    addTaskToUI(taskText);
    saveTask(taskText);
    input.value = "";
  }
}

function addTaskToUI(text, completed = false) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  // Toggle completed state
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = (e) => {
    e.stopPropagation(); // prevent toggle on delete
    li.remove();
    updateLocalStorage();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const taskListItems = document.querySelectorAll("#taskList li");
  const tasks = Array.from(taskListItems).map(li => ({
    text: li.firstChild.textContent,
    completed: li.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
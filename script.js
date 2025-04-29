const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

const API = "http://127.0.0.1:5000/tasks";

function renderTask(task, index) {
  const li = document.createElement("li");
  li.textContent = task.text;

  const delBtn = document.createElement("span");
  delBtn.textContent = "✖";
  delBtn.className = "delete-btn";
  delBtn.addEventListener("click", () => {
    fetch(`${API}/${index}`, { method: "DELETE" })
      .then(() => loadTasks());
  });

  li.appendChild(delBtn);
  list.appendChild(li);
}

function loadTasks() {
  list.innerHTML = "";
  fetch(API)
    .then(res => res.json())
    .then(tasks => {
      tasks.forEach((task, idx) => renderTask(task, idx));
    });
}

addButton.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText === "") return;

  fetch(API, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: taskText })
  }).then(() => {
    input.value = "";
    loadTasks();
  });
});

loadTasks();


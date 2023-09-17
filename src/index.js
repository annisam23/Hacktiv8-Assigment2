const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todo = document.getElementById("todo-card");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoItem = input.value;

    if (!todoItem) return;

    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = todoItem;
    newTask.innerHTML = `
    ${todoItem} 
    <i class="fas fa-trash-alt delete-icon"  onclick="deleteTask(this)"></i>
    <i class="fas fa-edit"  onclick="editTask(this)"></i> 
    `;

    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

    const firstTask = todo.querySelector(".task");
    if (firstTask) {
        todo.insertBefore(newTask, firstTask);
    } else {
        todo.appendChild(newTask);
    }

    input.value = "";
});

// Fungsi untuk menghapus tugas
function deleteTask(element) {
    if (confirm("Are you sure you want to delete this task?")) {
        const task = element.parentElement;
        task.remove();
    }
}

// Fungsi untuk mengedit tugas
function editTask(element) {
    const task = element.parentElement;
    const taskText = task.innerText;
    const newText = prompt("Edit the task:", taskText);
    
    if (newText !== null) {
        task.innerText = newText;
    }
}

// Misalnya, saat tugas dipindahkan ke kolom "Done"
const doneTask = document.querySelector(".is-dragging"); // Elemen tugas yang sudah selesai
doneTask.classList.add("done"); // Menambahkan kelas "done"

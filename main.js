// Events happen on document load
document.addEventListener("DOMContentLoaded", () => {
	// Saving theme preference for the user in localStorage
	const theme = localStorage.getItem("theme");
	if (theme === "dark") {
		changeToDark();
	} else {
		changeToLight();
	}
});

// Theme switch
const changeThemeBtn = document.querySelector("header button");
const themeSwitchImg = document.querySelector("header button img");

function changeToDark() {
	document.body.classList.add("dark-theme");
	localStorage.setItem("theme", "dark");
	themeSwitchImg.src = `images/icon-sun.svg`;
}

function changeToLight() {
	document.body.classList.remove("dark-theme");
	localStorage.setItem("theme", "light");
	themeSwitchImg.src = `images/icon-moon.svg`;
}

changeThemeBtn.addEventListener("click", () => {
	if (document.body.classList.contains("dark-theme")) {
		changeToLight();
	} else {
		changeToDark();
	}
});

// to do list main functionalities
const inputField = document.querySelector(".todo-input .input");
const inputAdd = document.querySelector(".todo-input .input-add");
const todoTasks = document.querySelector("main .todo-list");
const leftItems = document.querySelector(".todo-footer span");

inputField.addEventListener("keyup", (eventObject) => {
	if (eventObject.code === "Enter" || eventObject.keyCode === 13) {
		if (inputField.value) {
			addTask(inputField.value);
		}
	}
});

inputAdd.addEventListener("click", () => {
	if (inputField.value) {
		addTask(inputField.value);
	}
});

function addTask(taskText) {
	const task = `
	   <div class="list-item">
				<div class="item-info">
					<button class="info-check">
						<img src="images/icon-check.svg" alt="check to do completed">
					</button>
					<p class="info-text">${taskText}</p>
				</div>
				<button class="item-cancel">
					<img src="images/icon-cross.svg" alt="delete to do">
				</button>
		</div>`;
	todoTasks.insertAdjacentHTML("beforeend", task);
	inputField.value = "";
	inputField.focus();
	updateLeftItems();

	// Mark the tasks as completed
	todoTasks.children[todoTasks.children.length - 1]
		.querySelector(".item-info")
		.addEventListener("click", (eventObject) => {
			eventObject.currentTarget.parentElement.classList.toggle("completed");
			updateLeftItems();
		});

	// Delete a task
	todoTasks.children[todoTasks.children.length - 1]
		.querySelector(".item-cancel")
		.addEventListener("click", (eventObject) => {
			eventObject.currentTarget.parentElement.remove();
			updateLeftItems();
		});
}

function updateLeftItems() {
	leftItems.textContent = todoTasks
		.querySelectorAll(".list-item:not(.completed)")
		.length.toString();
}

// to do task classlifications
const tabs = document.querySelectorAll(".todo-tabs button");
const allTab = document.querySelector(".todo-tabs button:nth-of-type(1)");
const activeTab = document.querySelector(".todo-tabs button:nth-of-type(2)");
const completedTab = document.querySelector(".todo-tabs button:nth-of-type(3)");

function unselectAllTabs() {
	tabs.forEach((tab) => {
		tab.classList.remove("selected");
	});
}

allTab.addEventListener("click", (eventObject) => {
	unselectAllTabs();
	eventObject.currentTarget.classList.add("selected");

	todoTasks.querySelectorAll(".list-item").forEach((task) => {
		task.style.display = "flex";
	});
});

activeTab.addEventListener("click", (eventObject) => {
	unselectAllTabs();
	eventObject.currentTarget.classList.add("selected");

	todoTasks.querySelectorAll(".list-item").forEach((task) => {
		// Check if the task doesnot have completed class and hide it
		if (task.classList.contains("completed")) {
			task.style.display = "none";
		} else {
			task.style.display = "flex";
		}
	});
});

completedTab.addEventListener("click", (eventObject) => {
	unselectAllTabs();
	eventObject.currentTarget.classList.add("selected");

	todoTasks.querySelectorAll(".list-item").forEach((task) => {
		if (task.classList.contains("completed")) {
			task.style.display = "flex";
		} else {
			task.style.display = "none";
		}
	});
});

// clear completed tasks
const clearCompletedBtn = document.querySelector(".todo-footer button");

clearCompletedBtn.addEventListener("click", () => {
	todoTasks.querySelectorAll(".list-item.completed").forEach((completedTask) => {
		completedTask.remove();
		updateLeftItems();
	});
});

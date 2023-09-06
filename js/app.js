// Seleção de elementos:
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções:
const saveTodo = (text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeTodo = document.createElement("button");
    removeTodo.classList.add("remove-todo");
    removeTodo.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeTodo);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

// A função toggle forms vai esconder um formulário e mostrar outro:
const toggleForms = () => {

    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");

};

const updateTodo = (text) => {

    console.log(text)

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        
        let todoTitle = todo.querySelector("h3");

        console.log(oldInputValue)
        console.log(todoTitle)

        if(todoTitle.innerText === oldInputValue) {

            todoTitle.innerText = text;

        }  

    })

}

// Eventos:
todoForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        
        saveTodo(inputValue);

    };
});

document.addEventListener("click", (e) => {

    const targetEl = e.target;
    // Selecionando o elemento pai mais próximo, que nesse caso é o elemento 'div':
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    };

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    };

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")) {
       toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;

    };

});

cancelEditBtn.addEventListener("click", (e) => {

    e.preventDefault();

    toggleForms();

});

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {

        updateTodo(editInputValue);

    };

    toggleForms();

});
const todoTitleEl = document.querySelector('.todo__title')
const todoDescriptionEl = document.querySelector('.todo__description')

const date = new Date();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdays = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const monthName = months[date.getMonth()]
todoTitleEl.textContent = monthName;

const weekDay = weekdays[date.getDay()];
const monthDay = date.getDate()
todoDescriptionEl.textContent = `${weekDay}, ${monthName} ${monthDay}`;

const tasks = [
  { id: 0, title: 'Buy new sweatshirt', completed: true },
  { id: 1, title: 'Read an article', completed: true },
  { id: 2, title: 'Write blog post', completed: false },
  { id: 3, title: 'Watch "Mr Robot', completed: false },
  { id: 4, title: 'Run', completed: false },
];
const reactiveTasks = new Proxy(tasks, {
  set(target, prop, value) {
    target[prop] = value;
    renderTasks();
    return true;
  },
  deleteProperty(target, prop) {
    delete target[prop];
    renderTasks();
    return true;
  }
});

const createItem = (title, completed, index) => {
  const item = document.createElement('button');
  item.classList.add('todo__item');
  item.setAttribute('role', 'listitem');
  item.setAttribute('tabindex', '0');
  item.dataset.id = index;
  
  if (completed) item.classList.add('todo__item--completed');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('todo__item-delete');
  deleteBtn.textContent = '✖';
  deleteBtn.setAttribute('aria-label', 'Delete task');

  const titleEl = document.createElement('p');
  titleEl.classList.add('todo__item-title');
  titleEl.textContent = title;
  titleEl.setAttribute('aria-hidden', 'true');

  const actionEl = document.createElement('p');
  actionEl.classList.add('todo__item-action');

  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.classList.add('icon', completed ? 'icon--smile' : 'icon--neutral');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', completed ? '#icon-smile' : '#icon-neutral');

  icon.appendChild(use);
  actionEl.appendChild(icon);

  item.appendChild(deleteBtn);
  item.appendChild(titleEl);
  item.appendChild(actionEl);

  return item;
};

const todoListEl = document.querySelector('.todo__list');
const emptyEl = document.querySelector('.todo__empty');

function renderTasks() {
  todoListEl.innerHTML = '';

  if (!tasks.length) {
    emptyEl.style.display = 'flex';
    todoListEl.style.display = 'none';
    return;
  }
  
  todoListEl.style.display = 'flex';
  emptyEl.style.display = 'none';
  tasks.forEach((task, index) => {
    const itemEl = createItem(task.title, task.completed, index);
    todoListEl.appendChild(itemEl);
  });
}
renderTasks()

const onCLickItem = (item) => {
  item.classList.toggle('todo__item--completed');
  const isCompleted = item.classList.contains('todo__item--completed');

  const icon = item.querySelector('svg');
  const use = icon.querySelector('use');

  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', isCompleted ? '#icon-smile' : '#icon-neutral');

  icon.classList.remove('icon--smile', 'icon--neutral');
  icon.classList.add(isCompleted ? 'icon--smile' : 'icon--neutral');
}
const removeItem = (index) => {
  tasks.splice(index, 1);
  renderTasks();
}
todoListEl.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.todo__item-delete');
  if (deleteBtn) {
    const item = deleteBtn.closest('.todo__item');
    if (item) {
      const index = Number(item.dataset.id);
      if (!isNaN(index)) removeItem(index);
    }
    
    return;
  }

  const item = e.target.closest('.todo__item');
  if (!item) return;

  onCLickItem(item);
});

const formEl = document.querySelector('.todo__form');
const inputEl = document.querySelector('.todo__input');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = inputEl.value.trim();
  if (!value) return;

  const task = { title: value, completed: false };
  tasks.push(task);

  const itemEl = createItem(task.title, task.completed, tasks.length - 1);
  // todoListEl.appendChild(itemEl);

  inputEl.value = '';

  renderTasks()
});
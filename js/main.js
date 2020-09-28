// Находим нужные элементы (теги) на странице
const form = document.querySelector('#newTaskForm');
const input = document.querySelector('#addNewTask');
const taskList = document.querySelector('#list-group');

// Загрузить данные
loadData();

// Скрываем или показываем запись о том что список дел пуст
toggleEmptyListItem();

// 1. Добавление новой задачи
// Отслеживание отправки формы
form.addEventListener('submit', function (e) {
  // Отменяем стандартноеповедение при отправке формы (перезагрузку страницы)

  e.preventDefault();

  // Берем текст введенный пользователем в поле ввода
  const taskText = input.value;

  // формируем разметку для новой задачи
  const taskHTML = `<li class="list-group-item d-flex justify-content-between">
                      <span contenteditable="true" class="task-title">${taskText}</span>
                      <div>
                        <button type="button" data-action="ready" class="btn btn-light align-self-end">Готово</button>
                        <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
                      </div>
                    </li>`

  // добавили новую задачу на страницу
  taskList.insertAdjacentHTML('afterbegin', taskHTML)

  toggleEmptyListItem () 

  // очищаем
  input.value = '';

  // возвращаем фокус на поле ввода
  input.focus();

  // Сохранить данные
  saveData();
})

taskList.addEventListener('click', function(e) {
  // console.log(e.target)

  // Проверяем что клик произошел по кнопке 'удалить'
  if (e.target.getAttribute('data-action') == 'delete-task') {
    
    // Находим родительский тег <li> и уадляем его
    e.target.closest('.list-group-item').remove();

    // Скрываем или показываем запись о том что список дел пуст
    toggleEmptyListItem();

    // Сохранить данные
    saveData();

  } else if (e.target.getAttribute('data-action') == 'ready') {
  
    // Находим родительский тег <li>
    const parentElement = e.target.closest('li.list-group-item');

    // добавляем к тегу span доп. класс
    parentElement.querySelector('.task-title').classList.add('task-title--done')

    // убираем у тега span атрибут contenteditable
    parentElement.querySelector('.task-title').setAttribute('contenteditable', 'false')

    // Перемещаем запись в конец списка
    taskList.insertAdjacentElement('beforeend', parentElement);

    // удалить кнопку 'готово' и 'удалить'
    parentElement.querySelector('button[data-action="ready"]').remove();

  }
  
})

// скрываем "список дел пуст"
function toggleEmptyListItem () {
  if (taskList.children.length > 1) {
   document.querySelector('#empty-list-item').style.display = 'none';
  } else {
    document.querySelector('#empty-list-item').style.display = 'block';
  }
}

// Функция сохранения данных
function saveData() {
  localStorage.setItem('todoList', taskList.innerHTML);
}
// Фун-ия загрузки данных
function loadData() {
  if (localStorage.getItem('todoList')) {
    taskList.innerHTML = localStorage.getItem('todoList')
  }
}

// Сохраняем данные LS
// localStorage.setItem('name', '6778687')

// // Получаем данные из LS
// localStorage.getItem('name')
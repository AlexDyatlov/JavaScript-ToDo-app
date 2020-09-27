// Находим нужные элементы (теги) на странице
const form = document.querySelector('#newTaskForm');
const input = document.querySelector('#addNewTask');
const taskList = document.querySelector('#list-group');
const emptyListItem = document.querySelector('#empty-list-item')

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
  input.value = ''

  // возвращаем фокус на поле ввода
  input.focus();
})

// скрываем "список дел пуст"
function toggleEmptyListItem () {
  if (taskList.children.length > 1) {
    emptyListItem.style.display = 'none';
  } else {
    emptyListItem.style.display = 'block';
  }
}


import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(evt) {
  // блокуємо стандартні дії браузера
  evt.preventDefault();
  // скидаємо нашу форму при відправці
  evt.currentTarget.reset();
  //! при відправці форми видаляємо дані з localeStorage, щоб при наступному разі,
  //! текст не з'являвся з localeStorage в текстовому полі
  localStorage.removeItem(LOCALSTORAGE_KEY);
  console.log(formData);
}

function onTextareaInput(evt) {
  // значення інпуту
  // тут target, тому що при вик. currentTarget + throttle, в нас спливання і буде null,
  // з null ми не зможемо взяти value через 500 мс.
  // const message = evt.target.value;
  // значення інпута записуємо в localeStorage
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

// При завантажені сторінки, витягуємо збережені дані з localeStorage
function populateTextarea() {
  const savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
  // якщо в localeStorage немає ніяких даних, то в консолі буде null
  // якщо є ключ в localeStorage, то виводимо в консоль, якщо немає - нічого не робимо
  if (savedMessage) {
    console.log(savedMessage);
    // якщо щось є - оновлюємо наш DOM, таким чином, при перезавантажені сторінки
    // залишаються дані які вводив користувач з localeStorage, в текстовому полі
    refs.textarea.value = savedMessage;
  }
}

// Зберігаємо введені дані у вигляді об'єкта
const formData = {};

refs.form.addEventListener('input', evt => {
  //! Ключ
  // console.log(evt.target.name);
  //! Значення
  // console.log(evt.target.value);

  formData[evt.target.name] = evt.target.value;
});

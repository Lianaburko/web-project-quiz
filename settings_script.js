function changeColorCategory(category) {
    // удаляем класс "active" у всех категорий
    const categories = document.querySelectorAll('.category');
    categories.forEach((item) => {
      item.classList.remove('active');
    });
    
    // добавляем класс "active" к выбранной категории
    category.classList.add('active');
     // получаем номер категории из атрибута data-category
    const categoryNumber = category.getAttribute('data-category');
    
     // сохраняем номер категории в localStorage
    localStorage.setItem("active_cat", categoryNumber);

}

function changeColorMode(category) {
    // удаляем класс "active" у всех категорий
    const categories = document.querySelectorAll('.mode');
    categories.forEach((item) => {
      item.classList.remove('active');
    });
    
    // добавляем класс "active" к выбранной категории
    category.classList.add('active');
}


const questionsInput = document.querySelector("#questions")
const questionsValue = document.getElementById("questions-value");
localStorage.setItem("number_of_questions", 5);


questionsInput.addEventListener("input", () => {
    questionsValue.textContent = `${questionsInput.value} вопросов`;
    localStorage.setItem("number_of_questions", questionsInput.value);
}); 
class Recipe {
    constructor(name, author, cookTime, difficulty, isVegan, isGlutenFree) {
        this.name = name;
        this.authro = author;
        this.cookTime = cookTime;
        this.difficulty = difficulty;
        this.isVegan = isVegan;
        this.isGlutenFree = isGlutenFree;
    }
}

class UI {
    static recipes = [
        new Recipe('Sushi', 'Ivan', 30, 'hard', false, true),
        new Recipe('Chicken soup', 'Tom', 45, 'medium', false, true),
        new Recipe('French fries', 'Emily', 15, 'easy', true, false),
        new Recipe('Ceviche', 'Rick', 40, 'hard', false, true),
        new Recipe('Lasagna', 'Stacy', 120, 'medium', false, false),
        new Recipe('Empanadas', 'Paola', 90, 'easy', false, false),
    ]

    static displayRecipes() {
        UI.recipes.forEach(r => UI.addRecipeToTable(r));
    }

    static addRecipeToTable(recipe) {
        const tbody = document.querySelector('tbody');
        const row = document.createElement('tr');

        Object.entries(recipe).forEach(([key, value]) => {
            const td = document.createElement('td');
            if (typeof value == 'boolean') {
                value = value ? 'yes' : 'no'
            }
            td.innerText = value;
            row.appendChild(td);
        });

        const td = document.createElement('td');
        const a = document.createElement('a');
        a.href = '#';
        a.innerText = 'Delete';
        td.appendChild(a);
        row.appendChild(td);

        tbody.appendChild(row);
    }

    static getFormFields() {
        return ({
            name: document.querySelector('#name'),
            author: document.querySelector('#author'),
            cookTime: document.querySelector('#cook_time'),
            diff: document.querySelector('#difficulty'),
            isVegan: document.querySelector('#vegan'),
            isGlutenFree: document.querySelector('#gluten'),
        })
    }

    static addRecipe(recipe) {
        UI.addRecipeToTable(recipe);
        UI.showAlert('add', 'Recipe added');
        UI.clearFormFields();
    }

    static deleteBook(element) {
        if (element.innerHTML === 'Delete') {
            element.parentElement.parentElement.remove();
            UI.showAlert('remove', 'Recipe removed');
        }
    }

    static showAlert(type, message) {
        const alertContainer = document.querySelector('.alert-container');
        const alert = document.createElement('div');
        alert.classList.add('alert');
        alert.classList.add(type === 'add' ? 'alert-add' : 'alert-remove');
        alert.innerText = message;
        alertContainer.appendChild(alert);

        setTimeout(function () {
            alert.classList.add('alert-slide-in');
        }, 1)

        UI.alertSlideOutTimer = setTimeout(function () {
            alert.classList.add('alert-slide-out');
        }, 2000)

        UI.alertRemoveTimer = setTimeout(function () {
            alert.remove()
        }, 2000 + 200)
    }

    static clearFormFields() {
        const {name, author, cookTime, isGlutenFree, isVegan, diff} = UI.getFormFields();
        name.value = '';
        author.value = '';
        cookTime.value = '';
        diff.value = 'easy';
        isVegan.checked = false;
        isGlutenFree.checked = false;
    }
}

document.addEventListener('DOMContentLoaded', UI.displayRecipes);

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const {name, author, cookTime, isGlutenFree, isVegan, diff} = UI.getFormFields();
    UI.addRecipe(new Recipe(name.value, author.value, cookTime.value, diff.value, isVegan.checked, isGlutenFree.checked));
})

document.querySelector('tbody').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
})

// Constants
const Selector = {
    FORM: 'add-habit',
    HABIT_TEXT: 'habit-text',
    HABIT_NUMBER: 'num-of-repetitions',
    CONTAINER: 'habit-container',
}

const Class = {
    BODY: 'card-body',
    HEADER: 'habit-header',
    NAME: 'habit-name',
    PROGRESS: 'progress',
    PROGRESS_BAR: 'progress-bar',
}

// Elements
const form = document.getElementById(Selector.FORM);
const textInput = document.getElementById(Selector.HABIT_TEXT);
const numberInput = document.getElementById(Selector.HABIT_NUMBER);
const habitContainer = document.getElementById(Selector.CONTAINER);

// Functions
const onDelClick = (habit, habitData) => {
    const timeout = setTimeout(() => {
        habit.remove();
        deleteHabit(habitData.text);
        clearTimeout(timeout);
    }, 200);
}

//

form.addEventListener('submit', event => {
    event.preventDefault();

    let habit = {
        text: textInput.value,
        currentRepetitions: 0,
        maxRepetitions: parseInt(numberInput.value),
    };

    const trimmedValue = textInput.value.trim();
    if (trimmedValue === "") {
        alert('Please enter something other than spaces ;)');
        textInput.value = '';
        return false;
    } else {
        createHabit(habit);
        saveHabit(habit);
    }

    textInput.value = '';
    numberInput.value = '';

})

// habitData -- массив habit выше
function createHabit(habitData) {
    let habit = document.createElement('div');
    habit.classList.add('habit', 'card');

    let habitBody = document.createElement('div');
    habitBody.classList.add(Class.BODY);

    let habitHeader = document.createElement('div');
    habitHeader.classList.add(Class.HEADER);

    let habitName = document.createElement('div');
    habitName.classList.add(Class.NAME);
    habitName.innerText = habitData.text;

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger');
    deleteButton.innerText = 'del';

    deleteButton.addEventListener('click', () => onDelClick(habit, habitData));

    habitHeader.appendChild(habitName);
    habitHeader.appendChild(deleteButton);

    let progress = document.createElement('div');
    progress.classList.add(Class.PROGRESS);

    let percentage = Math.ceil((habitData.currentRepetitions / habitData.maxRepetitions) * 100);

    let progressBar = document.createElement('div');
    progressBar.classList.add(Class.PROGRESS_BAR);
    if (percentage === 100) {
        progressBar.classList.add('bg-success');
    }
    progressBar.setAttribute('style', `width: ${percentage}%`);
    progressBar.innerText = `${percentage}%`;

    progress.appendChild(progressBar);

    let habitFooter = document.createElement('div');
    habitFooter.classList.add('habit-footer');

    let initialNumber = document.createElement('span');

    if (habitData.currentRepetitions < habitData.maxRepetitions) {
        initialNumber.innerText = habitData.currentRepetitions;
    } else {
        initialNumber.innerText = 'Complete!';
    }

    let maxNumber = document.createElement('span');
    maxNumber.innerText = ' / ' + habitData.maxRepetitions;

    let habitRepetitions = document.createElement('div');
    habitRepetitions.classList.add('habit-repetitions');
    habitRepetitions.appendChild(initialNumber);

    if (habitData.currentRepetitions < habitData.maxRepetitions) {
        habitRepetitions.appendChild(maxNumber);
    }

    let plusButton = document.createElement('button');
    plusButton.classList.add('btn', 'btn-sm', 'btn-outline-success');
    plusButton.innerText = 'log';

    plusButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        let currentNumber = parseInt(initialNumber.textContent) + 1;

        if (currentNumber < habitData.maxRepetitions) {
            initialNumber.innerText = currentNumber;
        } else if (currentNumber === habitData.maxRepetitions) {
            initialNumber.innerText = 'Complete!';
            maxNumber.remove();
            plusButton.remove();
        }

        habitData.currentRepetitions = currentNumber;

        updateHabit(habitData);

        percentage = Math.ceil((habitData.currentRepetitions / habitData.maxRepetitions) * 100);
        if (percentage === 100) {
            progressBar.classList.add('bg-success');
        }
        progressBar.setAttribute('style', 'width: ' + percentage + '%');
        progressBar.innerText = percentage + '%';
    });


    habitFooter.appendChild(habitRepetitions);

    if (habitData.currentRepetitions < habitData.maxRepetitions) {
        habitFooter.appendChild(plusButton);
    }

    habitBody.appendChild(habitHeader);
    habitBody.appendChild(progress);
    habitBody.appendChild(habitFooter);

    habit.appendChild(habitBody);

    habitContainer.appendChild(habit);
}

function saveHabit(habit) {
    let habits = getHabits();

    habits.push(habit);

    saveHabits(habits);
}

function updateHabit(habit) {
    let habits = getHabits();

    habits.some(function (currentHabit, index) {
        if (currentHabit.text === habit.text) {
            habits[index] = habit;
            return true;
        }
    });

    saveHabits(habits);
}


function getHabits() {
    let habits = [];

    if (localStorage.getItem('habits') !== null) {
        habits = JSON.parse(localStorage.getItem('habits'));
    }

    return habits;
}

function saveHabits(habits) {
    let jsonHabits = JSON.stringify(habits);

    localStorage.setItem('habits', jsonHabits);
}

function deleteHabit(habitText) {
    let habits = getHabits();

    if (habits) {
        habits.some(function (currentHabit, index) {
            if (currentHabit.text === habitText) {
                habits.splice(index, 1);
                return true;
            }
        });

        saveHabits(habits);
    }
}

function extractFromLocalStorage() {
    let habits = getHabits();
    habits.forEach(habit => {
        createHabit(habit);
    })
}

extractFromLocalStorage();
let form = document.getElementById('add-habit');

form.addEventListener('submit', event => {
    event.preventDefault();

    createHabit();

    let habit = {
        text: document.getElementById('habit-text').value,
        currentRepetitions: 0,
        maxRepetitions: parseInt(document.getElementById('num-of-repetitions').value),
    };

    saveHabit(habit);

})


function createHabit(habitText) {
    let habitContainer = document.getElementById('habit-container');

    let habit = document.createElement('div');
    habit.setAttribute('class', 'habit');

    let habitHeader = document.createElement('div');
    habitHeader.setAttribute('class', 'habit-header');

    let habitName = document.createElement('div');
    habitName.setAttribute('class', 'habit-name');
    habitHeader.innerHTML = getHabitName();

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-sm btn-outline-danger');
    deleteButton.innerHTML = 'x';

    deleteButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        setTimeout(() => {
            habit.remove();
            localStorage.deleteHabit(habitText);
        }, 200);
    });

    habitHeader.appendChild(habitName);
    habitHeader.appendChild(deleteButton);

    let progress = document.createElement('div');
    progress.setAttribute('class', 'progress');

    let progressBar = document.createElement('div');
    progressBar.setAttribute('class', 'progress-bar');
    progressBar.setAttribute('style', 'width: ' + '' + '%');
    progressBar.innerHTML = '' + '%';

    progress.appendChild(progressBar);

    let loggedHabits = document.createElement('div');
    loggedHabits.setAttribute('class', 'logged-habits');

    let numOfRepetitions = document.createElement('div');
    numOfRepetitions.setAttribute('class', 'num-of-times');

    let plusButton = document.createElement('button');
    plusButton.setAttribute('class', 'btn btn-success');
    plusButton.innerHTML = '+';

    plusButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        setTimeout(() => {
            localStorage.addRepetition(repetition);
        }, 200);
    });

    loggedHabits.appendChild(numOfRepetitions);
    loggedHabits.appendChild(plusButton);

    habit.appendChild(habitHeader);
    habit.appendChild(progress);
    habit.appendChild(loggedHabits);

    habitContainer.appendChild(habit);
}

function saveHabit(habit) {
    let habits = getHabits();

    habits.push(habit);

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
    let habit = getHabits();

    if (habit) {
        habit.some(function (currentHabit, index) {
            if (currentHabit.text === habitText) {
                habit.splice(index, 1);
                return true;
            }
        });

        saveHabits(habits);
    }
}

function getHabitName() {
    return document.getElementById('habit-text').value;
}

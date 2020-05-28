let form = document.getElementById('add-habit');

form.addEventListener('submit', event => {
    event.preventDefault();

    let habit = {
        text: document.getElementById('habit-text').value,
        currentRepetitions: 0,
        maxRepetitions: parseInt(document.getElementById('num-of-repetitions').value),
    };

    createHabit(habit);
    saveHabit(habit);
})

// habitData -- массив habit выше
function createHabit(habitData) {
    let habitContainer = document.getElementById('habit-container');

    let habit = document.createElement('div');
    habit.setAttribute('class', 'habit');

    let habitHeader = document.createElement('div');
    habitHeader.setAttribute('class', 'habit-header');

    let habitName = document.createElement('div');
    habitName.setAttribute('class', 'habit-name');
    habitName.innerHTML = habitData.text;

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-sm btn-outline-danger');
    deleteButton.innerHTML = 'x';

    deleteButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        setTimeout(() => {
            habit.remove();
            deleteHabit(habitData.text);
        }, 200);
    });

    habitHeader.appendChild(habitName);
    habitHeader.appendChild(deleteButton);

    let progress = document.createElement('div');
    progress.setAttribute('class', 'progress');

    let percentage = Math.ceil((habitData.currentRepetitions / habitData.maxRepetitions) * 100);

    let progressBar = document.createElement('div');
    progressBar.setAttribute('class', 'progress-bar');
    progressBar.setAttribute('style', 'width: ' + percentage + '%');
    progressBar.innerHTML = percentage + '%';

    progress.appendChild(progressBar);

    let loggedHabits = document.createElement('div');
    loggedHabits.setAttribute('class', 'logged-habits');

    let initialNumber = document.createElement('span');

    if (habitData.currentRepetitions < habitData.maxRepetitions) {
        initialNumber.innerHTML = habitData.currentRepetitions;
    } else {
        initialNumber.innerHTML = 'Complete!';
    }

    let maxNumber = document.createElement('span');
    maxNumber.innerHTML = ' / ' + habitData.maxRepetitions;

    let numOfRepetitions = document.createElement('div');
    numOfRepetitions.setAttribute('class', 'num-of-times');
    numOfRepetitions.appendChild(initialNumber);

    if (habitData.currentRepetitions < habitData.maxRepetitions) {
        numOfRepetitions.appendChild(maxNumber);
    }

    let plusButton = document.createElement('button');
    plusButton.setAttribute('class', 'btn btn-sm btn-success');
    plusButton.innerHTML = '+';

    plusButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        let currentNumber = parseInt(initialNumber.textContent) + 1;

        if (currentNumber < habitData.maxRepetitions) {
            initialNumber.innerHTML = currentNumber;
        } else if (currentNumber === habitData.maxRepetitions) {
            initialNumber.innerHTML = 'Complete!';
            maxNumber.remove();
            plusButton.remove();
        }

        habitData.currentRepetitions = currentNumber;

        updateHabit(habitData);

        percentage = Math.ceil((habitData.currentRepetitions / habitData.maxRepetitions) * 100);
        progressBar.setAttribute('style', 'width: ' + percentage + '%');
        progressBar.innerHTML = percentage + '%';
    });


    loggedHabits.appendChild(numOfRepetitions);

    if (habitData.currentRepetitions < habitData.maxRepetitions) {
        loggedHabits.appendChild(plusButton);
    }

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
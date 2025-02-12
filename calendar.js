function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const today = new Date();

  // Update month title
  document.getElementById("monthTitle").textContent = `${getMonthName(
    currentMonth
  )} ${currentYear}`;

  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = "";

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day";
    calendarDiv.appendChild(emptyDay);
  }

  // Add days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";

    const dateString = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    // Add today class if it's today
    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    // Add selected class if it's the selected date
    if (dateString === selectedDate) {
      dayDiv.classList.add("selected");
    }

    const savedWorkout = localStorage.getItem(`workout_${dateString}`);

    dayDiv.innerHTML = `
        ${day}
        ${
          savedWorkout
            ? `<span class="workout-label">Treino ${savedWorkout}</span>`
            : ""
        }
      `;

    dayDiv.onclick = () => selectDate(dateString);
    calendarDiv.appendChild(dayDiv);
  }
}

function displayCustomWorkoutButtons() {
  const customWorkouts = JSON.parse(
    localStorage.getItem("customWorkouts") || "[]"
  );
  const container = document.getElementById("customWorkoutButtons");

  container.innerHTML = customWorkouts
    .map(
      (workout) => `
      <button 
        class="workout-button" 
        data-workout="${workout.name}"
        onclick="selectWorkout('${workout.name}')"
        style="background: #2d2d2d;"
      >
        ${workout.name}
      </button>
    `
    )
    .join("");
}

function openCalendar() {
  const modal = document.getElementById("calendarModal");
  modal.style.display = "flex";
  renderCalendar();
  displayCustomWorkoutButtons();
}

function closeCalendar() {
  const modal = document.getElementById("calendarModal");
  modal.style.display = "none";
}

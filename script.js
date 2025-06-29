function showStartup() {
  document.getElementById('startupScreen').style.display = 'block';
  document.getElementById('standardScreen').style.display = 'none';
  document.getElementById('journeyScreen').style.display = 'none';
  document.getElementById('routeScreen').style.display = 'none';
}

function showStandard() {
  document.getElementById('startupScreen').style.display = 'none';
  document.getElementById('standardScreen').style.display = 'block';
  document.getElementById('journeyScreen').style.display = 'none';
  document.getElementById('routeScreen').style.display = 'none';
}

function showJourney() {
  document.getElementById('startupScreen').style.display = 'none';
  document.getElementById('standardScreen').style.display = 'none';
  document.getElementById('journeyScreen').style.display = 'block';
  document.getElementById('routeScreen').style.display = 'none';
}

function showRoute() {
  document.getElementById('startupScreen').style.display = 'none';
  document.getElementById('standardScreen').style.display = 'none';
  document.getElementById('journeyScreen').style.display = 'none';
  document.getElementById('routeScreen').style.display = 'block';

  startAnimation();
}

function updateClock() {
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}`;
  }
}

setInterval(updateClock, 1000);
updateClock();

const stops = [
  "1. The Mill",
  "2. Barnwell Turn",
  "3. The Fox Inn, Thorpe Waterville",
  "4. Highfield Road, Thrapston"
];

let currentIndex = 0;
let intervalId = null;

function renderStops() {
  const container = document.querySelector('.stops-content');
  container.innerHTML = ""; // Clear

  // Next stop (if exists)
  if (currentIndex + 1 < stops.length) {
    container.innerHTML += `
      <div class="stop-item">
        <div class="stop-circle next"></div>
        <div class="stop-name next">${stops[currentIndex + 1]}</div>
      </div>`;
  }

  // Current stop
  container.innerHTML += `
    <div class="stop-item">
      <div class="stop-circle current"></div>
      <div class="stop-name current">${stops[currentIndex]}</div>
    </div>`;

  // Passed stops
  for (let i = currentIndex - 1; i >= 0; i--) {
    container.innerHTML += `
      <div class="stop-item">
        <div class="stop-circle passed"></div>
        <div class="stop-name passed">${stops[i]}</div>
      </div>`;
  }
}

function startAnimation() {
  currentIndex = 0;
  renderStops();
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    currentIndex++;
    if (currentIndex >= stops.length) {
      clearInterval(intervalId);
    } else {
      renderStops();
    }
  }, 10000); // Change every 10 seconds
}

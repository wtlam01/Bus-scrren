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
let isThisStop = false;

function renderFixedStops() {
  const container = document.querySelector('.stops-content');
  container.innerHTML = "";

  // Label for first row (next stop)
  let label = isThisStop ? "This stop" : "Next stop";

  // Row 1: Next stop
  if (currentIndex < stops.length) {
    container.innerHTML += `
      <div class="stop-item">
        <div class="stop-circle next"></div>
        <div class="stop-name next">
          <div class="stop-label">${label}</div>
          ${stops[currentIndex]}
        </div>
      </div>`;
  } else {
    container.innerHTML += `
      <div class="stop-item">
        <div class="stop-circle empty"></div>
        <div class="stop-name empty"></div>
      </div>`;
  }

  // Row 2: Previous stop
  const passedIndex = currentIndex - 1;
  if (passedIndex >= 0) {
    container.innerHTML += `
      <div class="stop-item">
        <div class="stop-circle passed"></div>
        <div class="stop-name passed">${stops[passedIndex]}</div>
      </div>`;
  } else {
    container.innerHTML += `
      <div class="stop-item">
        <div class="stop-circle empty"></div>
        <div class="stop-name empty"></div>
      </div>`;
  }
}

function startAnimation() {
  currentIndex = 0;
  isThisStop = false;
  renderFixedStops();
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    // Step 1: Show "This stop" for current stop for 2 seconds
    isThisStop = true;
    renderFixedStops();

    setTimeout(() => {
      // Step 2: After 2 seconds, move to next stop
      isThisStop = false;
      currentIndex++;

      if (currentIndex >= stops.length) {
        clearInterval(intervalId);
      } else {
        renderFixedStops();
      }
    }, 2000);

  }, 10000); // every 10 seconds
}

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
  "4. Highfield Road, Thrapston",
  "5. xxxxxxx",
  "6. Final Stop"
];

let currentIndex = 0;
let intervalId = null;
let isThisStop = false;

function renderFixedStops() {
  const container = document.querySelector('.stops-content');
  container.innerHTML = "";

  const passedIndex = currentIndex - 1;
  container.innerHTML += createStopItem("", stops[passedIndex] ?? "", "passed");

  let label = isThisStop ? "This stop" : "Next stop";
  container.innerHTML += createStopItem(label, stops[currentIndex] ?? "", "current");

  container.innerHTML += createStopItem("", stops[currentIndex + 1] ?? "", "next");
  container.innerHTML += createStopItem("", stops[currentIndex + 2] ?? "", "next");
}

function createStopItem(label, name, status) {
  return `
    <div class="stop-item">
      <div class="stop-circle ${status}"></div>
      <div class="stop-text">
        ${label ? `<div class="stop-label">${label}</div>` : ""}
        <div class="stop-name ${status}">${name}</div>
      </div>
    </div>`;
}


function startAnimation() {
  currentIndex = 0;
  isThisStop = false;
  renderFixedStops();
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    isThisStop = true;
    renderFixedStops();

    setTimeout(() => {
      isThisStop = false;
      currentIndex++;
      if (currentIndex >= stops.length) {
        clearInterval(intervalId);
      } else {
        renderFixedStops();
      }
    }, 2000);

  }, 10000);
}

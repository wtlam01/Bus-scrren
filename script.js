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
  { name: "The Mill", area: "" },
  { name: "Barnwell Turn", area: "" },
  { name: "The Fox Inn", area: "Thorpe Waterville" },
  { name: "Highfield Road", area: "Thrapston" },
  { name: "xxxxxxx", area: "" },
  { name: "Final Stop", area: "" }
];

let currentIndex = 0;
let intervalId = null;
let isThisStop = false;

function createStopItem(label, stop, status, rowClass) {
  let areaHtml = "";
  if (status === "current" && stop.area) {
    areaHtml = `<div class="stop-area">${stop.area}</div>`;
  }
return `
  <div class="stop-item ${rowClass}">
    <div class="stop-circle ${status}"></div>
    <div class="stop-text">
      ${label ? `<div class="stop-label">${label}</div>` : ""}
      <div class="stop-name ${status}">${stop.name || "Previous Stop"}${areaHtml}</div>
    </div>
  </div>`;

}

function renderFixedStops() {
  const container = document.querySelector('.stops-content');
  container.innerHTML = `
    <div class="stops-line">
      ${createStopItem("", stops[currentIndex - 1] ?? { name: "", area: "" }, "passed", "row1")}
      ${createStopItem(isThisStop ? "This stop" : "Next stop", stops[currentIndex] ?? { name: "", area: "" }, "current", "row2")}
      ${createStopItem("", stops[currentIndex + 1] ?? { name: "", area: "" }, "next", "row3")}
      ${createStopItem("", stops[currentIndex + 2] ?? { name: "", area: "" }, "next", "row4")}
    </div>
  `;
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

function showHandrail() {
  document.getElementById('startupScreen').style.display = 'none';
  document.getElementById('standardScreen').style.display = 'none';
  document.getElementById('journeyScreen').style.display = 'none';
  document.getElementById('routeScreen').style.display = 'none';
  document.getElementById('handrailScreen').style.display = 'block';
}

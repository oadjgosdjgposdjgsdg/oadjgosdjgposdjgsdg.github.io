Promise.all([
  fetch('https://raw.githubusercontent.com/CarZoneDB/CarZoneDB.github.io/refs/heads/main/czgameinfo/cars.json').then(res => res.json()),
  fetch('https://raw.githubusercontent.com/CarZoneDB/CarZoneDB.github.io/refs/heads/main/czgameinfo/races.json').then(res => res.json())
])
.then(([carData, raceData]) => {

  const totalCars = Object.values(carData).filter(car => car.CarName).length;
  const totalRaces = Object.keys(raceData).filter(key => key !== 'lastUpdated').length;

  const carUpdated = carData.lastUpdated ? new Date(carData.lastUpdated) : null;
  const raceUpdated = raceData.lastUpdated ? new Date(raceData.lastUpdated) : null;

  const format = date =>
    date
      ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
      : 'Unknown';

  const carDate = format(carUpdated);
  const raceDate = format(raceUpdated);

  let updatedText;

  if (carDate === raceDate) {
    updatedText = `
      Database Last Updated:
      <span style="color:#8E5CF6; font-weight:bold;">
        ${carDate}
      </span>
    `;
  } else {
    updatedText = `
      Cars Last Updated:
      <span style="color:#8E5CF6; font-weight:bold;">${carDate}</span><br>
      Races Last Updated:
      <span style="color:#8E5CF6; font-weight:bold;">${raceDate}</span>
    `;
  }

  document.getElementById('databasestats').innerHTML = `
    Currently keeping track of 
    <span style="color:#8E5CF6; font-weight:bold;">
      ${totalCars.toLocaleString()}
    </span> cars and 
    <span style="color:#8E5CF6; font-weight:bold;">
      ${totalRaces.toLocaleString()}
    </span> races in the game — and counting.<br>
    ${updatedText}
  `;

})
.catch(err => {
  document.getElementById('databasestats').textContent = 'Failed to load stats.';
  console.error(err);
});

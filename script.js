const jyotirlingas = [
    { name: "Somnath", state: "Gujarat" },
    { name: "Mallikarjuna", state: "Andhra Pradesh" },
    { name: "Mahakaleshwar", state: "Madhya Pradesh" },
    { name: "Omkareshwar", state: "Madhya Pradesh" },
    { name: "Kedarnath", state: "Uttarakhand" },
    { name: "Bhimashankar", state: "Maharashtra" },
    { name: "Kashi Vishwanath", state: "Uttar Pradesh" },
    { name: "Trimbakeshwar", state: "Maharashtra" },
    { name: "Vaidyanath", state: "Jharkhand" },
    { name: "Nageshwar", state: "Gujarat" },
    { name: "Rameshwar", state: "Tamil Nadu" },
    { name: "Grishneshwar", state: "Maharashtra" }
];

const distances = {
    "Somnath": {"Mallikarjuna": 1700, "Mahakaleshwar": 750, "Omkareshwar": 900, "Kedarnath": 1700, "Bhimashankar": 950, "Kashi Vishwanath": 1600, "Trimbakeshwar": 1200, "Vaidyanath": 1500, "Nageshwar": 450, "Rameshwar": 2300, "Grishneshwar": 900},
    "Mallikarjuna": {"Somnath": 1700, "Mahakaleshwar": 1200, "Omkareshwar": 1250, "Kedarnath": 1850, "Bhimashankar": 600, "Kashi Vishwanath": 1600, "Trimbakeshwar": 1000, "Vaidyanath": 800, "Nageshwar": 1800, "Rameshwar": 1500, "Grishneshwar": 600},
    "Mahakaleshwar": {"Somnath": 750, "Mallikarjuna": 1200, "Omkareshwar": 150, "Kedarnath": 1300, "Bhimashankar": 650, "Kashi Vishwanath": 1300, "Trimbakeshwar": 400, "Vaidyanath": 1000, "Nageshwar": 1100, "Rameshwar": 1600, "Grishneshwar": 400},
    "Omkareshwar": {"Somnath": 900, "Mallikarjuna": 1250, "Mahakaleshwar": 150, "Kedarnath": 1450, "Bhimashankar": 600, "Kashi Vishwanath": 1200, "Trimbakeshwar": 450, "Vaidyanath": 900, "Nageshwar": 1250, "Rameshwar": 1500, "Grishneshwar": 450},
    "Kedarnath": {"Somnath": 1700, "Mallikarjuna": 1850, "Mahakaleshwar": 1300, "Omkareshwar": 1450, "Bhimashankar": 1600, "Kashi Vishwanath": 450, "Trimbakeshwar": 1550, "Vaidyanath": 1300, "Nageshwar": 2000, "Rameshwar": 2600, "Grishneshwar": 1600},
    "Bhimashankar": {"Somnath": 950, "Mallikarjuna": 600, "Mahakaleshwar": 650, "Omkareshwar": 600, "Kedarnath": 1600, "Kashi Vishwanath": 1500, "Trimbakeshwar": 200, "Vaidyanath": 800, "Nageshwar": 1300, "Rameshwar": 1400, "Grishneshwar": 150},
    "Kashi Vishwanath": {"Somnath": 1600, "Mallikarjuna": 1600, "Mahakaleshwar": 1300, "Omkareshwar": 1200, "Kedarnath": 450, "Bhimashankar": 1500, "Trimbakeshwar": 1400, "Vaidyanath": 500, "Nageshwar": 1800, "Rameshwar": 2200, "Grishneshwar": 1500},
    "Trimbakeshwar": {"Somnath": 1200, "Mallikarjuna": 1000, "Mahakaleshwar": 400, "Omkareshwar": 450, "Kedarnath": 1550, "Bhimashankar": 200, "Kashi Vishwanath": 1400, "Vaidyanath": 1000, "Nageshwar": 1400, "Rameshwar": 1300, "Grishneshwar": 200},
    "Vaidyanath": {"Somnath": 1500, "Mallikarjuna": 800, "Mahakaleshwar": 1000, "Omkareshwar": 900, "Kedarnath": 1300, "Bhimashankar": 800, "Kashi Vishwanath": 500, "Trimbakeshwar": 1000, "Nageshwar": 1700, "Rameshwar": 1900, "Grishneshwar": 800},
    "Nageshwar": {"Somnath": 450, "Mallikarjuna": 1800, "Mahakaleshwar": 1100, "Omkareshwar": 1250, "Kedarnath": 2000, "Bhimashankar": 1300, "Kashi Vishwanath": 1800, "Trimbakeshwar": 1400, "Vaidyanath": 1700, "Rameshwar": 2500, "Grishneshwar": 1300},
    "Rameshwar": {"Somnath": 2300, "Mallikarjuna": 1500, "Mahakaleshwar": 1600, "Omkareshwar": 1500, "Kedarnath": 2600, "Bhimashankar": 1400, "Kashi Vishwanath": 2200, "Trimbakeshwar": 1300, "Vaidyanath": 1900, "Nageshwar": 2500, "Grishneshwar": 1400},
    "Grishneshwar": {"Somnath": 900, "Mallikarjuna": 600, "Mahakaleshwar": 400, "Omkareshwar": 450, "Kedarnath": 1600, "Bhimashankar": 150, "Kashi Vishwanath": 1500, "Trimbakeshwar": 200, "Vaidyanath": 800, "Nageshwar": 1300, "Rameshwar": 1400}
};

const nearestJyotirlingaSelect = document.getElementById('nearest-jyotirlinga');

jyotirlingas.forEach(jyotirlinga => {
    let option = document.createElement('option');
    option.value = jyotirlinga.name;
    option.textContent = `${jyotirlinga.name}, ${jyotirlinga.state}`;
    nearestJyotirlingaSelect.appendChild(option);
});

document.getElementById('tsp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nearestJyotirlinga = nearestJyotirlingaSelect.value;
    if (nearestJyotirlinga) {
        const result = tsp(nearestJyotirlinga);
        displayResult(result);
    } else {
        alert("Please select a Jyotirlinga.");
    }
});

function tsp(start) {
    let visited = new Set();
    let currentCity = start;
    let route = [currentCity];
    let totalDistance = 0;

    while (visited.size < jyotirlingas.length) {
        visited.add(currentCity);
        let nearestCity = null;
        let shortestDistance = Infinity;

        for (let city in distances[currentCity]) {
            if (!visited.has(city) && distances[currentCity][city] < shortestDistance) {
                nearestCity = city;
                shortestDistance = distances[currentCity][city];
            }
        }

        if (nearestCity) {
            route.push(nearestCity);
            totalDistance += shortestDistance;
            currentCity = nearestCity;
        } else {
            break;
        }
    }

    totalDistance += distances[currentCity][start];
    route.push(start);

    return { route, totalDistance };
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    let routeWithStates = result.route.map(city => {
        let jyotirlinga = jyotirlingas.find(j => j.name === city);
        return `${jyotirlinga.name}, ${jyotirlinga.state}`;
    });

    let routeString = routeWithStates.join(' &rarr; ');

    resultDiv.innerHTML = `
        <h2>Shortest Route</h2>
        <p>Route: ${routeString}</p>
        <p>Total Distance: ${result.totalDistance} km</p>
    `;
}

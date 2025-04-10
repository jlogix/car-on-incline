const massSlider = document.getElementById('mass');
const angleSlider = document.getElementById('angle');
const speedSlider = document.getElementById('speed');

const massValueDisplay = document.getElementById('mass-value');
const angleValueDisplay = document.getElementById('angle-value');
const speedValueDisplay = document.getElementById('speed-value');

const powerBar = document.getElementById('power-bar');
const powerValueDisplay = document.getElementById('power-value-display');

const g = 9.81; // m/s^2
const efficiency = 0.85;

// Calculate maximum possible power for scaling the bar
const maxMass = 10000; // kg
const maxAngleDeg = 15; // degrees
const maxAngleRad = (maxAngleDeg * Math.PI) / 180; // radians
const maxSpeedKmps = 50; // km/s
const maxSpeedMps = maxSpeedKmps * 1000; // m/s
const maxPower = (maxMass * g * Math.sin(maxAngleRad) * maxSpeedMps) / efficiency;

function calculatePower() {
    const mass = parseFloat(massSlider.value); // kg
    const angleDeg = parseFloat(angleSlider.value); // degrees
    const speedKmps = parseFloat(speedSlider.value); // km/s

    // Update display values
    massValueDisplay.textContent = mass;
    angleValueDisplay.textContent = angleDeg.toFixed(1);
    speedValueDisplay.textContent = speedKmps.toFixed(1);

    // Convert units for calculation
    const angleRad = (angleDeg * Math.PI) / 180; // Convert angle to radians HERE
    const speedMps = speedKmps * 1000; // m/s

    // Calculate power
    let power = 0;
    // Avoid calculation if angle is 0 (sin(0) = 0) or speed is 0
    // Use angleRad for the check and calculation
    if (angleRad > 0 && speedMps > 0) {
       power = (mass * g * Math.sin(angleRad) * speedMps) / efficiency; // Watts
    }


    // Update power bar height (scaled relative to maxPower)
    // Handle potential division by zero if maxPower is 0 (e.g., if maxAngle is 0)
    const powerPercentage = (maxPower > 0)
        ? Math.min(100, (power / maxPower) * 100) // Cap at 100%
        : 0; // Default to 0% if maxPower is 0
    powerBar.style.height = `${powerPercentage}%`;

    // Update power value display (show in kW, MW, GW for readability)
    let powerDisplayValue;
    let powerUnit;

    if (power >= 1e9) {
        powerDisplayValue = (power / 1e9).toFixed(2);
        powerUnit = 'GW'; // Gigawatts
    } else if (power >= 1e6) {
        powerDisplayValue = (power / 1e6).toFixed(2);
        powerUnit = 'MW'; // Megawatts
    } else if (power >= 1e3) {
        powerDisplayValue = (power / 1e3).toFixed(2);
        powerUnit = 'kW'; // Kilowatts
    } else {
        powerDisplayValue = power.toFixed(0);
        powerUnit = 'W';  // Watts
    }
    powerValueDisplay.textContent = `Power: ${powerDisplayValue} ${powerUnit}`;
}

// Add event listeners
massSlider.addEventListener('input', calculatePower);
angleSlider.addEventListener('input', calculatePower);
speedSlider.addEventListener('input', calculatePower);

// Initial calculation on load
calculatePower();

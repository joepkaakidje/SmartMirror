import { facts } from "./facts.js";
import { compliments } from "./compliments.js";


// =====================
// CLOCK
// =====================
function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
}

setInterval(updateClock, 1000);
updateClock();


// =====================
// DAILY FACTS
// =====================
const dayIndex = Math.floor(Date.now() / 86400000);

const todayFact = facts[dayIndex % facts.length];

document.getElementById("dailyFact").textContent = todayFact.fact;
document.getElementById("factExplanation").textContent = todayFact.explanation;


// =====================
// DAILY COMPLIMENTS
// =====================
const todayCompliment = compliments[dayIndex % compliments.length];

document.getElementById("dailyCompliment").textContent = todayCompliment.compliment;
document.getElementById("complimentExplanation").textContent = todayCompliment.explanation;


// =====================
// REALISTIC MOON PHASE
// =====================
function getMoonPhaseData() {
    const now = new Date();
    const knownNewMoon = new Date('2000-01-06');
    const lunarCycle = 29.53058867;

    const daysSince =
        (now - knownNewMoon) / (1000 * 60 * 60 * 24);

    const phase = (daysSince % lunarCycle) / lunarCycle;

    return phase;
}

function renderMoon() {
    const phase = getMoonPhaseData();

    const shadow = document.getElementById("moonShadow");
    const text = document.getElementById("moonText");

    let name = "";

    if (phase < 0.03) name = "New Moon";
    else if (phase < 0.22) name = "Waxing Crescent";
    else if (phase < 0.28) name = "First Quarter";
    else if (phase < 0.47) name = "Waxing Gibbous";
    else if (phase < 0.53) name = "Full Moon";
    else if (phase < 0.72) name = "Waning Gibbous";
    else if (phase < 0.78) name = "Last Quarter";
    else name = "Waning Crescent";

    text.textContent = name;

    let shadowAmount = 1;

    if (phase <= 0.5) {
        shadowAmount = 1 - (phase * 2);
    } else {
        shadowAmount = (phase - 0.5) * 2;
    }

    shadow.style.transform = `scaleX(${shadowAmount})`;
}

renderMoon();
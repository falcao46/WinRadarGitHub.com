document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculate-btn').addEventListener('click', calculateResults);
    document.getElementById('clear-btn').addEventListener('click', clearResults);
    document.getElementById('toggle-theme-btn').addEventListener('click', toggleTheme);
    loadData();
});

function validateInputs() {
    const scores = document.querySelectorAll('.score');
    for (let score of scores) {
        if (isNaN(score.value) || score.value < 0) {
            alert('Veuillez entrer des nombres valides.');
            return false;
        }
    }
    return true;
}

function calculateResults() {
    if (!validateInputs()) return;

    const scores = document.querySelectorAll('.score');
    let totalMatches = scores.length / 4;
    let winsA = 0, winsB = 0, draws = 0, totalGoalsA = 0, totalGoalsB = 0;

    for (let i = 0; i < scores.length; i += 4) {
        let scoreA = parseInt(scores[i].value) || 0;
        let scoreB = parseInt(scores[i + 1].value) || 0;
        let draw = parseInt(scores[i + 2].value) || 0;
        let goals = parseInt(scores[i + 3].value) || 0;

        if (scoreA > scoreB) winsA++;
        if (scoreA < scoreB) winsB++;
        if (scoreA === scoreB) draws++;

        totalGoalsA += goals;
        totalGoalsB += goals;
    }

    let percentageA = (winsA / totalMatches) * 100;
    let percentageB = (winsB / totalMatches) * 100;
    let percentageDraw = (draws / totalMatches) * 100;
    let averageGoalsA = totalGoalsA / totalMatches;
    let averageGoalsB = totalGoalsB / totalMatches;

    document.getElementById('percentage-A').textContent = percentageA.toFixed(2) + '%';
    document.getElementById('percentage-B').textContent = percentageB.toFixed(2) + '%';
    document.getElementById('percentage-draw').textContent = percentageDraw.toFixed(2) + '%';
    document.getElementById('average-goals-A').textContent = averageGoalsA.toFixed(2);
    document.getElementById('average-goals-B').textContent = averageGoalsB.toFixed(2);
    document.getElementById('total-wins-A').textContent = winsA;
    document.getElementById('total-wins-B').textContent = winsB;
    document.getElementById('total-draws').textContent = draws;

    saveData(scores, winsA, winsB, draws, totalGoalsA, totalGoalsB);
}

function clearResults() {
    const scores = document.querySelectorAll('.score');
    scores.forEach(input => input.value = '');
    document.getElementById('percentage-A').textContent = '';
    document.getElementById('percentage-B').textContent = '';
    document.getElementById('percentage-draw').textContent = '';
    document.getElementById('average-goals-A').textContent = '';
    document.getElementById('average-goals-B').textContent = '';
    document.getElementById('total-wins-A').textContent = '0';
    document.getElementById('total-wins-B').textContent = '0';
    document.getElementById('total-draws').textContent = '0';
}

function saveData(scores, winsA, winsB, draws, totalGoalsA, totalGoalsB) {
    const data = {
        scores: Array.from(scores).map(score => score.value),
        winsA,
        winsB,
        draws,
        totalGoalsA,
        totalGoalsB
    };
    localStorage.setItem('matchData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('matchData'));
    if (data) {
        const scores = document.querySelectorAll('.score');
        scores.forEach((input, index) => input.value = data.scores[index]);
        document.getElementById('total-wins-A').textContent = data.winsA;
        document.getElementById('total-wins-B').textContent = data.winsB;
        document.getElementById('total-draws').textContent = data.draws;
        document.getElementById('percentage-A').textContent = ((data.winsA / (data.scores.length / 4)) * 100).toFixed(2) + '%';
        document.getElementById('percentage-B').textContent = ((data.winsB / (data.scores.length / 4)) * 100).toFixed(2) + '%';
        document.getElementById('percentage-draw').textContent = ((data.draws / (data.scores.length / 4)) * 100).toFixed(2) + '%';
        document.getElementById('average-goals-A').textContent = (data.totalGoalsA / (data.scores.length / 4)).toFixed(2);
        document.getElementById('average-goals-B').textContent = (data.totalGoalsB / (data.scores.length / 4)).toFixed(2);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

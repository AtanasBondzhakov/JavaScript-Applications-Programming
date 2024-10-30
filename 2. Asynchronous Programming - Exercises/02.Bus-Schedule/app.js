function solve() {
    const infoRef = document.querySelector('.info');
    const departBnt = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    let currentStop = '';
    let nextStop = 'depot';

    async function depart() {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStop}`);
        const result = await response.json();
        infoRef.textContent = `Next stop ${result.name}`;

        departBnt.setAttribute('disabled', 'disabled');
        arriveBtn.removeAttribute('disabled');
        nextStop = result.next;
        currentStop = result.name;
    }

    function arrive() {
        infoRef.textContent = `Arriving at ${currentStop}`;
        departBnt.removeAttribute('disabled');
        arriveBtn.setAttribute('disabled', 'disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
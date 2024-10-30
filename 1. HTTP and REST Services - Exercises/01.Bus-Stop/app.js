async function getInfo() {
    const host = 'http://localhost:3030/jsonstore/bus/businfo/';

    const inputRef = document.querySelector('#stopId');
    const stopNameRef = document.querySelector('#stopName');
    const busesRef = document.querySelector('#buses');

    try {
        const response = await fetch(`${host}${inputRef.value}`);
        const result = await response.json();

        clear();
        stopNameRef.textContent = result.name;

        const busesInfo = Object.entries(result.buses);

        busesInfo.forEach(bus => {
            const liEl = document.createElement('li');
            liEl.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            busesRef.appendChild(liEl);
        });
    } catch (error) {
        stopNameRef.textContent = 'Error';
        
    }

    function clear() {
        stopNameRef.textContent = '';
        busesRef.replaceChildren();
    }
}
const form = document.getElementById("form");
const table = document.getElementById("tbody");
let localge = JSON.parse(localStorage.getItem("datos")) || [];

function renderTable() {
    table.innerHTML = localge.map((dato, index) => `
        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${dato.name}
            </th>
            <td class="px-6 py-4">
                ${dato.lastName}
            </td>
            <td class="px-6 py-4">
                ${dato.email}    
            </td>
            <td class="px-6 py-4">
                ${dato.password}
            </td>
            <td class="px-6 py-4">
                <button type="button" class="text-md font-bold text-blue-500" onclick="editar(${index})">Editar</button>
                <button type="button" class="text-md font-bold text-red-500 ml-4" onclick="eliminar(${index})">Eliminar</button>
            </td>
        </tr>
    `).join('');

    if(localge.length < 1){
        table.innerHTML = `
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td scope="row" colspan="100" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                    No hay datos para mostrar
                </td>
            </tr>
        `
    }
}

function eliminar(index) {
    localge.splice(index, 1);
    localStorage.setItem("datos", JSON.stringify(localge));
    renderTable();
}

function editar(index) {
    const datOne = localge[index];
    const name = prompt("Name", datOne.name);
    const lastName = prompt("Last Name", datOne.lastName);
    const email = prompt("Email", datOne.email);
    const password = prompt("Password", datOne.password);

    if (!name || !password || !lastName || !email) {
        return alert("No puede enviar campos vacíos");
    }

    localge[index] = { name, lastName, email, password};
    localStorage.setItem("datos", JSON.stringify(localge));
    renderTable();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const lastName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    
    if (!name || !password || !lastName || !email) {
        return alert("No puede enviar campos vacíos");
    }

    localge.push({ name, lastName, email, password });
    localStorage.setItem("datos", JSON.stringify(localge));
    renderTable();
});

renderTable();

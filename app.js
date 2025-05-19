const form = document.getElementById("form");
const table = document.getElementById("tbody");
let localge = JSON.parse(localStorage.getItem("datos")) || [];

function renderTable() {
    table.innerHTML = localge.map((dato, index) => `
        <tr class="odd:bg-white even:bg-gray-50 border-b">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
            <tr class="odd:bg-white even:bg-gray-50 border-b">
                <td scope="row" colspan="100" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
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
    document.getElementById("name").value = datOne.name;
    document.getElementById("last-name").value = datOne.lastName;
    document.getElementById("email").value = datOne.email;
    document.getElementById("password").value = datOne.password;
    document.getElementById("editingId").value = datOne.id;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements["name"].value;
    const lastName = form.elements["last-name"].value;
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;
    const editingId = Number(form.elements["editingId"].value);

    if (!name || !password || !lastName || !email) {
        return Toastify({
            text: 'All fields are required. Please complete the form.',
            gravity: "bottom",
            close: true,
            style: {
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                borderRadius: "10px"
            },
        }).showToast();
    }

    if (!isNaN(editingId) && editingId !== 0) {
        const index = localge.findIndex(d => Number(d.id) === editingId);
        if (index !== -1) {
            localge[index] = { id: editingId, name, lastName, email, password };
        }
    } else {
        // Create mode
        localge.push({ id: Date.now(), name, lastName, email, password });
    }


    localStorage.setItem("datos", JSON.stringify(localge));
    form.reset();
    form.elements["editingId"].value = '';
    Toastify({
        text: 'Data saved successfully!',
        gravity: "bottom",
        close: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            borderRadius: "10px"
        },
    }).showToast();

    renderTable();
});

renderTable();
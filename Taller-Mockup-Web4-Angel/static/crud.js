async function crear() {
    const nombre = document.getElementById("nuevo").value;
    await addDoc(collection(db, "items"), { nombre });
    cargar();
}
async function cargar() {
    const querySnapshot = await getDocs(collection(db, "items"));
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    querySnapshot.forEach((docu) => {
        lista.innerHTML += `
            <li>
                ${docu.data().nombre}
                <button onclick="borrar('${docu.id}')">X</button>
            </li>
        `;
    });
}
async function borrar(id) {
    await deleteDoc(doc(db, "items", id));
    cargar();
}
import { updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function actualizar(id, nuevoNombre) {
    await updateDoc(doc(db, "items", id), { nombre: nuevoNombre });
    cargar();
}

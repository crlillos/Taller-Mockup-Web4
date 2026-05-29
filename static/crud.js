import { 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    updateDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
                <button onclick="actualizar('${docu.id}', prompt('Nuevo nombre:'))">Editar</button>
            </li>
        `;
    });
}

async function borrar(id) {
    await deleteDoc(doc(db, "items", id));
    cargar();
}

async function actualizar(id, nuevoNombre) {
    if (!nuevoNombre) return;
    await updateDoc(doc(db, "items", id), { nombre: nuevoNombre });
    cargar();
}

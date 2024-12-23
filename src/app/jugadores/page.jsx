// src/app/jugadores/page.jsx

import FiltroJugadores from "./filtroJugadores";

async function obtenerJugadores() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jugadores`);
        if (!response.ok) {
            throw new Error('Error al obtener los jugadores');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export default async function PageJugadores() {
    const jugadores = await obtenerJugadores(); // Obtén los jugadores en el servidor

    return (
        <div className="container">
            <div className="wrapper">
                <FiltroJugadores jugadores={jugadores} />
            </div>
        </div>
    );
}
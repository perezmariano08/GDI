import { URL_API } from "@/utils/constants";
import FiltroJugadores from "./filtroJugadores";

async function obtenerJugadores() {
    try {
        const response = await fetch(`${URL_API}/jugadores`);
        if (!response.ok) {
            console.error('Error al obtener los jugadores:', response.statusText);
            return []; // Devuelve un array vacío si hay error
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al conectar con la API:', error.message);
        return []; // Devuelve un array vacío si hay error
    }
}

export default async function PageJugadores() {
    const jugadores = await obtenerJugadores();

    return (
        <div className="container">
            <div className="wrapper">
                {jugadores.length > 0 ? (
                    <FiltroJugadores jugadores={jugadores} />
                ) : (
                    <p>No hay jugadores disponibles.</p>
                )}
            </div>
        </div>
    );
}

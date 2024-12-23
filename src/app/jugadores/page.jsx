export async function getServerSideProps() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jugadores`);
        if (!response.ok) {
            return { props: { jugadores: [] } }; // Manejo de errores
        }
        const jugadores = await response.json();
        return { props: { jugadores } };
    } catch (error) {
        console.error('Error al obtener los jugadores:', error.message);
        return { props: { jugadores: [] } };
    }
}

export default function PageJugadores({ jugadores }) {
    return (
        <div>
            {jugadores.length > 0 ? (
                <FiltroJugadores jugadores={jugadores} />
            ) : (
                <p>No hay jugadores disponibles.</p>
            )}
        </div>
    );
}

'use client';

import { useState } from 'react';
import styles from './FiltroJugadores.module.css';
import CardJugador from '@/components/cards/Jugadores/CardJugador';

const ITEMS_POR_PAGINA = 20; // Número de jugadores por página
const MAX_PAGINAS_VISIBLES = 10; // Máximo de botones de páginas visibles

export default function FiltroJugadores({ jugadores }) {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);

    // Filtrar jugadores basados en el input
    const jugadoresFiltrados = jugadores.filter((jugador) =>
        jugador.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        jugador.apellido.toLowerCase().includes(filtro.toLowerCase())
    );

    // Calcular la paginación
    const totalPaginas = Math.ceil(jugadoresFiltrados.length / ITEMS_POR_PAGINA);
    const indiceInicial = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const jugadoresPagina = jugadoresFiltrados.slice(indiceInicial, indiceInicial + ITEMS_POR_PAGINA);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
        }
    };

    // Calcular el rango de páginas visibles
    const calcularRangoPaginas = () => {
        const inicio = Math.max(1, paginaActual - Math.floor(MAX_PAGINAS_VISIBLES / 2));
        const fin = Math.min(totalPaginas, inicio + MAX_PAGINAS_VISIBLES - 1);
        return { inicio, fin };
    };

    const { inicio, fin } = calcularRangoPaginas();

    // Componente de Paginación reutilizable
    const Paginacion = () => (
        <div className={styles.paginacion}>
            <span className={styles.paginacionInfo}>
                ({jugadoresFiltrados.length} jugadores)
            </span>
            <button
                onClick={() => cambiarPagina(1)}
                disabled={paginaActual === 1}
                className={styles.paginacionBoton}
            >
                {'<<'}
            </button>
            <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className={styles.paginacionBoton}
            >
                {'<'}
            </button>
            {Array.from({ length: fin - inicio + 1 }, (_, i) => i + inicio).map((numero) => (
                <button
                    key={numero}
                    onClick={() => cambiarPagina(numero)}
                    className={`${styles.paginacionNumero} ${
                        numero === paginaActual ? styles.paginacionActivo : ''
                    }`}
                >
                    {numero}
                </button>
            ))}
            <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className={styles.paginacionBoton}
            >
                {'>'}
            </button>
            <button
                onClick={() => cambiarPagina(totalPaginas)}
                disabled={paginaActual === totalPaginas}
                className={styles.paginacionBoton}
            >
                {'>>'}
            </button>
        </div>
    );

    return (
        <div style={{ width: '100%' }} className={styles.container}>
            {/* Paginación superior */}
            <Paginacion />

            {/* Input de filtro */}
            <input
                type="text"
                placeholder="Buscar por nombre o apellido"
                className={styles.input}
                value={filtro}
                onChange={(e) => {
                    setFiltro(e.target.value);
                    setPaginaActual(1); // Reiniciar a la primera página al filtrar
                }}
            />

            {/* Grid de jugadores */}
            <div className={styles.grid}>
                {jugadoresPagina.length > 0 ? (
                    jugadoresPagina.map((jugador) => (
                        <CardJugador key={jugador.id_jugador} jugador={jugador} />
                    ))
                ) : (
                    <p>No se encontraron jugadores.</p>
                )}
            </div>

            {/* Paginación inferior */}
            <Paginacion />
        </div>
    );
}

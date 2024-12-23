// src/components/cards/JugadorCard.jsx

import Link from 'next/link';
import styles from './CardJugador.module.css';
import { URL_IMAGES_BRANDS, URL_IMAGES_PLAYERS } from '@/utils/constants';

export default function CardJugador({ jugador }) {
    return (
        <div className={styles.jugadorCard}>
            <img src={jugador.img ? `${URL_IMAGES_PLAYERS}${jugador.img}` : `${URL_IMAGES_PLAYERS}default.png`} alt={`Foto de ${jugador.nombre}`} className={styles.jugadorImagen} />
            <div className={styles.jugadorDetalles}>
                <div>
                    <img className='brand' src={jugador.nac && `${URL_IMAGES_BRANDS}${jugador.nac}.png`}/>
                    <p>{jugador.posicion}</p>
                </div>
                <h3 className={styles.jugadorNombre}><span>{jugador.apellido}</span>, {jugador.nombre}</h3>
                <Link className={styles.jugadorBoton} href={`/jugadores/${jugador.id_jugador}`}>Ver Jugador</Link>
            </div>
        </div>
    );
}

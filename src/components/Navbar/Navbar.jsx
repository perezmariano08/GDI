import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Navbar() {
    return (
        <header className={`${styles.header}`}>
            <div className={`container ${styles.top_container}`}>
                <div className={`wrapper ${styles.top_wrapper}`}>
                    <h1>golesde<span>instituto</span></h1>
                    <div className={`${styles.social_icons}`}>
                        <a target='_blank' title='Instagram' href="https://www.instagram.com/golesdeinstituto/"><FaInstagram/></a>
                        <a target='_blank' title='Facebook' href="https://www.facebook.com/golesdeinstituto/"><FaFacebookSquare/></a>
                        <a target='_blank' title='YouTube' href="https://www.youtube.com/golesdeinstituto"><FaYoutube/></a>
                        <a target='_blank' title='Twitter / X' href="https://twitter.com/goles_instituto"><FaTwitter/></a>
                    </div>
                </div>
            </div>
            <div className={`container ${styles.container}`}>
                <div className={`wrapper ${styles.wrapper}`}>
                    <img src="./Escudos/instituto.png"/>
                    <nav>
                        <ul className={styles.navbar_list}>
                            <li className={styles.navLink}><Link href={'/'} className={styles.link}>Inicio</Link></li>
                            <li className={styles.navLink}><Link href={'/jugadores'}>Jugadores</Link></li>
                        </ul>
                    </nav>
                </div>
                
            </div>
        </header>        
    );
}

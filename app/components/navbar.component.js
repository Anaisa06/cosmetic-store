import styles from './navbar.styles.css';
import { navigateTo } from '../Router';
export function Navbar(pageContent, logic){
    const root = document.getElementById('root');
    root.innerHTML = `
    <header>
        <nav>
            <ul class=${styles.navbarList}>
                <li>Productos</li>
                <li>Pedidos</li>
            </ul>
            <button type="button" id="exit-button" class=${styles.exitButton}>Salir</button>
        </nav>
    </header> 
    <main>
    ${pageContent}
    </main>   
    `   
    

    const $exitButton = document.getElementById('exit-button');
    const logOut = () => {
        if (confirm('¿Quieres cerrar tu sesión?')){
            localStorage.removeItem('token');
            localStorage.removeItem('user-id');
            localStorage.removeItem('role');
            navigateTo('/login');
        }        
    }
    $exitButton.addEventListener('click', logOut);
    logic();

}
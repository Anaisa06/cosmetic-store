import { decryptData, encryptData } from '../../../helpers/encrypt';
import { fetchApi } from '../../../helpers/fetchApi';
import { navigateTo } from '../../Router';
import styles from './login.styles.css';
export function LoginScene(){
    const root = document.getElementById('root');
    root.innerHTML = `
    <h1>Cosmetic <span>Store</span></h1>
    <form class="${styles.form}">
        <input type="email" placeholder="username@domain.com" required>
        <input type="password" placeholder="password" required>
        <div class=${styles.buttons}>
            <button type="submit">Ingresar</button>
            <button type="button">Registrarse</button>
        </div>
    </form>
    `
    const $form = document.getElementsByTagName('form')[0];
    const $email = $form.querySelector('input[type="email"]');
    const $password = $form.querySelector('input[type="password"]');
    const $registerButton = $form.querySelector('button[type="button"]');

    const checkUser = async () => {
        const user = await fetchApi(`http://localhost:3000/users?email=${$email.value}`);
        if(user[0]){
            if(decryptData(user[0].password, "123") === $password.value){
                const token = Math.random().toString(36).substring(2);
                const userId = user[0].id;
                localStorage.setItem('token', token);
                localStorage.setItem('user-id', userId);
                if(user[0].role_id === 1){
                    localStorage.setItem('role', 'admin');
                }
                alert('Bienvenida/o, ' + user[0].name);
                navigateTo('/dashboard');
            } else {
                alert('Datos incorrectos');
            }
        } else {
            alert('Datos incorrectos');
        }        
    }

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        checkUser();
    })

    $registerButton.addEventListener('click', () => {
        navigateTo('/register');
    })

}
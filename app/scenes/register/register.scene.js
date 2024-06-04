import styles from './register.styles.css';
import { fetchApi } from '../../../helpers/fetchApi';
import { encryptData } from '../../../helpers/encrypt';
import { navigateTo } from '../../Router';
export function RegisterScene (){
    const root = document.getElementById('root');
    root.innerHTML = `
    <h1>Cosmetic <span>Store</span></h1>
    <form class="${styles.container}">
        <input type="text" name="name" id="name" placeholder="Nombre" required>
        <input type="email" placeholder="usuario@dominio.com" required>
        <label for="birth-date">Fecha de nacimiento</label>
        <input type="date" id="birth-date" required>
        <input type="password" placeholder="Contraseña" required>
        <button type="submit">Registrarse</button>
    </form>
    `

    const $form = document.getElementsByTagName('form')[0];
    const $name = $form.querySelector('input[type="text"');
    const $email = $form.querySelector('input[type="email"');
    const $password = $form.querySelector('input[type="password"');
    const $birthdate = $form.querySelector('input[type="date"');

    const createUser = async () => {
        try {
            const hashedPassword = encryptData($password.value, "123");
            const newUser = await fetchApi('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: $name.value,
                    email: $email.value,
                    password: hashedPassword,
                    role_id: 2
                })                   
            })
            if(newUser){
                alert("Usuario creado!")
            } 
        } catch (err){
            alert("Hubo un error...");
            console.log("Error en create user: " + err);
            return;
        }
    } 
    
    $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        await createUser();
        navigateTo('/login');                
    })


};
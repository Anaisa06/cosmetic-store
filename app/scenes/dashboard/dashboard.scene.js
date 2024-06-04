import styles from './dashboard.styles.css';
import { fetchApi } from '../../../helpers/fetchApi';
import { navigateTo } from '../../Router';
export function DashboardScene(){
    const pageContent = `
    <h2>Productos</h2>
    <div class=${styles.container}></div>    
    ` 
    const logic = async () => {
        const productsContainer = document.querySelector(`.${styles.container}`);
        const products = await fetchApi('http://localhost:3000/products');
        const userId = localStorage.getItem('user-id');
        const user = await fetchApi(`http://localhost:3000/users?id=${userId}`);         

        products.forEach(async product => {
            const productCard = document.createElement('div');
            productCard.classList.add(`${styles.productCard}`);
            productCard.innerHTML = `
            <h4>${product.name}</h4>
            <hr>
            <p>${product.description}</p>            
            <p><spam>${product.category}</spam></p>
            <hr>
            <div class=${styles.cardBottom}>
                <p>Precio: $${product.price}</p>
                <p>Stock: $${product.stock}</p>
            </div>    
            `
            
            if (user[0].role_id === 1){
                const adminButtons = document.createElement('div');                
                adminButtons.innerHTML = `
                <button type="button" class="updateButton" product-id="">Editar</button>
                <button type="button" class="deleteButton" product-id="">Eliminar</button>`
                
                productCard.appendChild(adminButtons);
                const deleteBtn = productCard.querySelector('.deleteButton');
                const updateBtn = productCard.querySelector('.updateButton');
                updateBtn.setAttribute('product-id', product.id);
                deleteBtn.setAttribute('product-id', product.id);
            } else {
                const guestButtons = document.createElement('div');
                guestButtons.innerHTML = `<button type="button" class="buyButton" product-id="">Comprar</button>`
                productCard.appendChild(guestButtons);
            }
            productsContainer.appendChild(productCard);           
        })

        if (user[0].role_id === 1){
            const createButton = document.createElement('div');
            createButton.innerHTML = `<button type="button" id="createButton" class=${styles.createButton}>Nuevo producto</button>`
            productsContainer.appendChild(createButton);
        }

        const $createButton = document.getElementById('createButton');
        $createButton.addEventListener('click', () => {
            navigateTo('/newProduct');
        })

        const $deleteButtons = document.querySelectorAll('.deleteButton');
        const $updateButtons = document.querySelectorAll('.updateButton');
        const $buyButtons = document.querySelectorAll('.buyButton');

        $deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const productId = e.target.getAttribute('product-id');
                if (confirm("¿Deseas eliminar el producto?")) {
                    try {
                        await fetchApi(`http://localhost:3000/products/${productId}`, {
                            method: 'DELETE'
                        });                        
                        e.target.closest(`.${styles.productCard}`).remove();
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                    }
                }
            });
        });

        $updateButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const productId = e.target.getAttribute('product-id');
                localStorage.setItem('product-id', productId);
                navigateTo(`/update`)
            })
        })

    }
    return {
        pageContent,
        logic
    }
}
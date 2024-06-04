import { fetchApi } from "../../../helpers/fetchApi";
import styles from './updateProduct.styles.css';

export function UpdateProductScene() {    
    
    const pageContent =     
    ` <form id="productForm">
        <div class="form-group">
            <label for="productName">Nombre del producto</label>
            <input type="text" id="productName" name="productName" disabled>
        </div>
        <div class="form-group">
            <label for="description">Descripción del producto</label>
            <textarea id="description" name="description" rows="4" required></textarea>
        </div>
        <div class="form-group">
            <label for="price">Precio del producto</label>
            <input type="number" id="price" name="price" step="0.01" required>
        </div>
        <div class="form-group">
            <label for="stock">Stock del producto</label>
            <input type="number" id="stock" name="stock" required>
        </div>
        <div class="form-group">
            <label for="category">Categoría del producto</label>
            <select id="category" name="category" required>
                <option value="" disabled>Selecciona una categoría</option>
                <option value="Skincare">Skincare</option>
                <option value="Makeup">Makeup</option>
                <option value="Haircare">Haircare</option>
                <option value="Fragrance">Fragrance</option>
            </select>
        </div>
        <div class="form-group">
            <button type="submit">Enviar</button>
        </div>
    </form>`

    const logic = async () => {
        const $form = document.getElementById("productForm");
        const $productName = document.getElementById("productName");
        const $description = document.getElementById("description");
                
const $price = document.getElementById("price");
        const $stock = document.getElementById("stock");
        const $category = document.getElementById("category")
        const productId = localStorage.getItem('product-id');
        const product = await fetchApi(`http://localhost:3000/products/${productId}`, {
            method: 'GET'        
        });
        console.log(product);

        $productName.setAttribute('value', product.name);
        $description.innerText = product.description;
        $price.setAttribute('value', product.price);
        $stock.setAttribute('value', product.stock);
        $category.setAttribute('value', product.category);

        
        $form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const $newDescription = document.getElementById('description');
            const $newPrice = document.getElementById("price");
            const $newStock = document.getElementById("stock");
            const $newCategory = document.getElementById("category")
            const updateProduct = await fetchApi(`http://localhost:3000/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: $productName.value,
                    description: $newDescription.innerText,
                    price: $newPrice.value,
                    stock: $newStock.value,
                    category: $newCategory.value
                })
            })
            console.log(updateProduct);
        } )
       
    }

    return {
        pageContent,
        logic
    }   
}
export function NewProductScene(){ 
    const pageContent = 
    ` <form id="productForm">
        <div class="form-group">
            <label for="productName">Nombre del producto</label>
            <input type="text" id="productName" name="productName" required>
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
                <option value="" disabled selected>Selecciona una categoría</option>
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
    const logic = () => {
        console.log('desde create');
    }

    return {
        pageContent,
        logic
    }
}
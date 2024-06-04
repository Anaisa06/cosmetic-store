export async function fetchApi(url, options){
    try {
        const response = await fetch(url, options);
        
        const data =  await response.json();
        return data;
    } catch (err){
        console.log("Error en fetch: ", err);
        alert("Hubo un error");
    }
}
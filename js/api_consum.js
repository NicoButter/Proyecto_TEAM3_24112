function mostrarModal(respuesta) {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");
    if (respuesta && respuesta.drinks) {
        modal.style.display = "block";
        modalContent.innerHTML = "";
        respuesta.drinks.forEach(drink => {
            var drinkElement = document.createElement("div");
            drinkElement.innerHTML = `
                <h2>${drink.strDrink}</h2>
                <p>${drink.strInstructions}</p>
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" style="width:100px;">
            `;
            modalContent.appendChild(drinkElement);
        });
    } else {
        modalContent.innerHTML = "<p>No se encontraron resultados.</p>";
        modal.style.display = "block";
    }
}

function cerrarModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

document.querySelector(".close").addEventListener("click", cerrarModal);

window.addEventListener("click", function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var cocktailName = document.getElementById("cocktail-name").value;
    buscarCocktailPorNombre(cocktailName);
});

function buscarCocktailPorNombre(nombre) {
    var url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;

    fetch(url)
        .then(response => response.json()) 
        .then(data => {
            console.log(data); 
            
            mostrarModal(data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
}

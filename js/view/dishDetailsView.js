class DishDetailsView extends GeneralView{

    constructor(container, model, id) {
        super(container);
        model.addObserver(this);
        this.model = model;
        this.id = id ? id : model.getCurrentId();

        this.addDynamicElements();
        this.button = document.getElementById("buttonAddToMenu");
        this.backButton = document.getElementById("buttonBackToSearch");

    }

    updateDescription (dish) {
      let element = this.container.querySelector("#dishDescriptionP");
      element.innerHTML = dish.instructions;
    }

    updateIngredients(ingredients, totalIngredientsPrice) {
        let dishDetailIngredients = this.container.querySelector("#dishIngredients");
        let nrPeople = this.model.getNumberOfGuests();
        let dishIngredients = `<h3>Ingredients for ${nrPeople} people</h3>
                        <table class="table">
                        <tbody>`;

        ingredients.forEach(ingredient => {
            let totalQuantity = ingredient.amount * nrPeople;
            dishIngredients += `<tr>
                        <td scope="row"> ${totalQuantity} ${ingredient.unit} </td>
                        <td>${ingredient.name}</td>
                    </tr>`;
        });
        dishIngredients += `</tbody>
                    </table>`;

        // Compute price depending on how many people are
        let totalPrice = totalIngredientsPrice * nrPeople;
        dishIngredients += `<p align="right">Total: ${totalPrice} SEK </p>
                </div>`;
        dishDetailIngredients.innerHTML = dishIngredients;
    }

    addDynamicElements () {
        $(".se-pre-con").fadeIn("slow");
        let dishDetailDescription = this.container.querySelector("#dishDescription");
        let dishID = this.model.getCurrentId();
        this.model.getDish(dishID).then(dish => {
            let dishDescription = `<h3 id="dishNameID">${dish.title}</h3>
                            <div id="imageDetails">
                                <img id="imageDetailsId" class="img-thumbnail" src="${dish.image}" alt="${dish.title}">
                            </div>
                            <p id="dishDescriptionP"></p>`;
            dishDetailDescription.innerHTML = dishDescription;

            this.updateDescription(dish);
            this.updateIngredients(dish.extendedIngredients, dish.pricePerServing);
        });

        $(".se-pre-con").fadeOut("slow");
    }

    update(model, changeDetails) {
        this.id = model.getCurrentId();
        this.model = model;

        if(changeDetails == "currentDish") {
            this.addDynamicElements();
        }
    }
}

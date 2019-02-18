class DishDetailsView extends GeneralView{

    constructor(container, model, id) {
        super(container);
        model.addObserver(this);
        this.model = model;
        this.button = document.getElementById("buttonAddToMenu");
        this.backButton = document.getElementById("buttonBackToSearch");
        this.detailsContent = document.getElementById("detailsContent");
        this.loading = document.getElementById("detailsLoader");
        this.currentDish = new Dish(0, "", "", [], "", "");
        this.addDynamicElements();
    }

    showLoading() {
        this.loading.style.display = "block";
        this.detailsContent.style.display = "none";
    }

    hideLoading() {
        this.detailsContent.style.display = "inline";
        this.loading.style.display = "none";
    }

    addDynamicElements () {
        this.showLoading();
        let dishDetailDescription = this.container.querySelector("#dishDescription");
        let dish = this.currentDish;
        let dishDescription = `<h3 id="dishNameID">${dish.title}</h3>
                        <div id="imageDetails">
                            <img id="imageDetailsId" class="img-thumbnail" src="${dish.image}" alt="${dish.title}">
                        </div>
                        <p id="dishDescriptionP"></p>`;
        dishDetailDescription.innerHTML = dishDescription;
        this.updateDescription(dish);
        this.updateIngredients(dish.extendedIngredients, dish.pricePerServing);
        this.hideLoading();
    }

    update(model, changeDetails) {
        // Show loading
        this.showLoading();
        model.getCurrentDish().then( dish => {
                this.currentDish = dish;
                if(changeDetails == "currentDish" || changeDetails == "numberOfGuests") {
                    this.addDynamicElements();
                }
                this.hideLoading();
        });

    }

    updateDescription (dish) {
        let element = this.container.querySelector("#dishDescriptionP");
        element.innerHTML = dish.instructions;
    }

    updateIngredients(ingredients, totalIngredientsPrice) {
        if (!ingredients) {
            console.log("No ingredients found.");
            return;
        }
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
}

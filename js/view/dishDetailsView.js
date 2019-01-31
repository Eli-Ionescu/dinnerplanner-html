class DishDetailsView {

    constructor(container, model, id) {
        model.addObserver(this);
        this.container = container;
        this.model = model;
        this.id = id;

        this.init();
        this.button = document.getElementById("buttonAddToMenu");
        this.backButton = document.getElementById("buttonBackToSearch");
    }

    addInitialElements() {
        this.container.html(`<div class="container-fluid" id="dishDetailsContainer">
            <div class="row">
                <div class="col-md-6">
                    <div id="dishDescription">
                    </div>
                    <button class="button" id="buttonBackToSearch">Back to search</button>
                </div>
                <!--Third column with the ingredients-->
                <div class="col-md-6" id="dishIngredients">
                        <p align="right"></p>
                </div>
            </div>
        </div>`);
    }

    addDynamicElements () {
        let dishDetailDescription = this.container.find("#dishDescription");
        let dish = this.model.getDish(this.id);
        let dishDescription = `<h3>${dish.name}</h3>
                            <div class="row">
                                <img src=../images/${dish.image} alt=${dish.name}>
                            </div>
                            <p> ${dish.description}</p>`;

        dishDetailDescription.html(dishDescription);

        // Ingredients list
        let dishDetailIngredients = this.container.find("#dishIngredients");
        let ingredients = dish.ingredients;
        let nrPeople = this.model.getNumberOfGuests();

        let dishIngredients = `<h3>Ingredients for ${nrPeople} people</h3>
                        <table class="table">
                        <tbody>`;

        for (let i in ingredients) {
            let totalQuantity = ingredients[i].quantity * nrPeople;
            let totalPrice = ingredients[i].price * nrPeople;
            dishIngredients += `<tr>
                            <td scope="row"> ${totalQuantity} ${ingredients[i].unit} </td>
                            <td>${ingredients[i].name}</td>
                            <td> SEK </td>
                            <td> ${totalPrice}</td>
                        </tr>`;
        }

        dishIngredients += `</tbody>
                    </table>
                    <hr>
                    <button class="button-add-to-menu" id="buttonAddToMenu">Add to menu</button>`;

        // Compute total
        let dishPrice = this.model.getDishPrice(dish.id);
        // the total price depending on how many people are
        let totalPrice = dishPrice * nrPeople;
        dishIngredients += `<p align="right">Total: ${totalPrice} SEK </p>
                    </div>`;

        dishDetailIngredients.html(dishIngredients);
    }

    init() {
        this.addInitialElements();
        this.addDynamicElements();
    }

    update(model, changeDetails) {
        this.model = model;
        this.addDynamicElements();
    }
}

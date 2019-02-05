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

    addDynamicElements () {
        let dishDetailDescription = this.container.querySelector("#dishDescription");
        let dish = this.model.getDish(this.model.getCurrentId());
        let dishDescription = `<h3 id="dishNameID">${dish.name}</h3>
                            <div class="row" id="imageDetails">
                                <img class="img-thumbnail" src="images/${dish.image}" alt=${dish.name}>
                            </div>
                            <p> ${dish.description}</p>`;

        dishDetailDescription.innerHTML = dishDescription;

        // Ingredients list
        let dishDetailIngredients = this.container.querySelector("#dishIngredients");
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
                    `;

        // Compute total
        let dishPrice = this.model.getDishPrice(dish.id);
        // the total price depending on how many people are
        let totalPrice = dishPrice * nrPeople;
        dishIngredients += `<p align="right">Total: ${totalPrice} SEK </p>
                    </div>`;

        dishDetailIngredients.innerHTML = dishIngredients;
    }

    // TODO: modify this
    update(model, changeDetails) {
        this.id = model.getCurrentId();
        this.model = model;
        this.addDynamicElements();
    }

}

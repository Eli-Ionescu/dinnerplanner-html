class DishDetailsView {

    constructor(container, model, id) {
        this.container = container;
        this.model = model;
        this.id = id;
    }

    init() {
        let dishDetailDescription = this.container.find("#dishDescription");

        let dish = this.model.getDish(this.id);

        console.log("NAME: " + dish.name + " " + dish.image);
        let dishDescription = `<h3>${dish.name}</h3>
                            <div class="row">
                                <img src=../images/${dish.image} alt=${dish.name}>
                            </div>
                            <p> ${dish.description}</p>
                            <div class="row">
                            </div>
                            <div class="row">
                            <button class="button">Back to search</button>`;

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
                    <button class="button-add-to-menu">Add to menu</button>`;

        // Compute total
        let dishPrice = this.model.getDishPrice(dish.id);
        // the total price depending on how many people are
        let totalPrice = dishPrice * nrPeople;
        dishIngredients += `<p align="right">Total: ${totalPrice} SEK </p>
                    </div>`;

        dishDetailIngredients.html(dishIngredients);
    }
}
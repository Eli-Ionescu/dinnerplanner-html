class DishDetailsView extends GeneralView{

    constructor(container, model, id) {
        super(container);
        model.addObserver(this);
        this.model = model;
        this.id = id ? id : model.getCurrentId();

        this.ingredients = [];
        // this.getRecepiesSearch()
        //     .then(data => {
        //         this.dishes = data.results;
        //         this.baseUri = data.baseUri;
        //     })
        //     .catch(error => console.error(error));
        this.addDynamicElements();
        this.button = document.getElementById("buttonAddToMenu");
        this.backButton = document.getElementById("buttonBackToSearch");

    }

    updateDescription (dish) {
      let elemenet = this.container.querySelector("#dishDescriptionP");
      elemenet.innerHTML = dish["summary"];
    }

    updateIngredients(ingredients, totalIngredientsPrice) {
        let dishDetailIngredients = this.container.querySelector("#dishIngredients");
        let nrPeople = this.model.getNumberOfGuests();
        let dishIngredients = `<h3>Ingredients for ${nrPeople} people</h3>
                        <table class="table">
                        <tbody>`;

        this.ingredients.forEach(ingredient => {
            console.log(ingredient);
            let totalQuantity = ingredient.amount * nrPeople;
            // let totalPrice = ingredients[i].price * nrPeople;
            dishIngredients += `<tr>
                        <td scope="row"> ${totalQuantity} ${ingredient.unit} </td>
                        <td>${ingredient.name}</td>
                        <!--<td> SEK </td>-->
                        <!--<td> bla</td>-->
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
        let dish = this.model.getDish(dishID);

        let dishDescription = `<h3 id="dishNameID">${dish.title}</h3>
                        <div class="row" id="imageDetails">
                            <img id="imageDetailsId" class="img-thumbnail" src="${this.model.baseUri}${dish.image}" alt="${dish.title}">
                        </div>
                        <p id="dishDescriptionP"></p>`;
        dishDetailDescription.innerHTML = dishDescription;

        // update description
        this.model.getDishDescription(dishID)
          .then(dish => this.updateDescription(dish))
          .catch( error => {});

        this.model.getDishIngredients(dishID)
            .then(data => {
                this.ingredients = data[0].extendedIngredients;
                this.totalIngredientsPrice = data[0].pricePerServing;
                this.updateIngredients(this.ingredients, this.totalIngredientsPrice);
            })
            .catch(error => {});

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

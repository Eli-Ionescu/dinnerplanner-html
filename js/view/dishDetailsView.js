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
      let elemenet = this.container.querySelector("#dishDescriptionP");
      elemenet.innerHTML = dish["summary"];
    }

    updateIngredients(ingredients) {
        console.log(ingredients);
    }

    addDynamicElements () {
        $(".se-pre-con").fadeIn("slow");
        let dishDetailDescription = this.container.querySelector("#dishDescription");
        let dishID = this.model.getCurrentId();
        let dish = this.model.getDish(dishID);

        console.log(dishID);
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
            .then(ingredients => this.updateIngredients(ingredients))
            .catch(error => {});


        $(".se-pre-con").fadeOut("slow");

        // update title and image path

        // let dishDescription = `<h3 id="dishNameID">${dish.name}</h3>
        //                     <div class="row" id="imageDetails">
        //                         <img class="img-thumbnail" src="images/${dish.image}" alt=${dish.name}>
        //                     </div>
        //                     <p> ${dish.description}</p>`;



        // Ingredients list
        // let dishDetailIngredients = this.container.querySelector("#dishIngredients");
        // let ingredients = dish.ingredients;
        // let nrPeople = this.model.getNumberOfGuests();
        //
        // let dishIngredients = `<h3>Ingredients for ${nrPeople} people</h3>
        //                 <table class="table">
        //                 <tbody>`;
        //
        // for (let i in ingredients) {
        //     let totalQuantity = ingredients[i].quantity * nrPeople;
        //     let totalPrice = ingredients[i].price * nrPeople;
        //     dishIngredients += `<tr>
        //                     <td scope="row"> ${totalQuantity} ${ingredients[i].unit} </td>
        //                     <td>${ingredients[i].name}</td>
        //                     <td> SEK </td>
        //                     <td> ${totalPrice}</td>
        //                 </tr>`;
        // }
        //
        // dishIngredients += `</tbody>
        //             </table>`;
        //
        // // Compute total
        // let dishPrice = this.model.getDishPrice(dish.id);
        // // the total price depending on how many people are
        // let totalPrice = dishPrice * nrPeople;
        // dishIngredients += `<p align="right">Total: ${totalPrice} SEK </p>
        //             </div>`;
        //
        // dishDetailIngredients.innerHTML = dishIngredients;
    }

    update(model, changeDetails) {
        this.id = model.getCurrentId();
        this.model = model;

        if(changeDetails == "currentDish") {
            this.addDynamicElements();
        }
    }

}

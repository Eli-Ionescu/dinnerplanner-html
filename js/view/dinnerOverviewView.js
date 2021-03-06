class DinnerOverviewView extends GeneralView{

    constructor(container, model) {
        super(container);
        model.addObserver(this);
        this.model = model;

        this.updateNumberOfPeople();
        this.updateDishesOverview();

        // The button id that will trigger the click event
        this.button = document.getElementById("buttonFullRecipe");
    }

    updateNumberOfPeople() {
        let nrPeople = this.container.querySelector("#numberPeopleOverview");
        let nrPeopleValue = this.model.getNumberOfGuests();
        let nrPeopleString = `My Dinner: ${nrPeopleValue} people`;
        nrPeople.innerHTML = nrPeopleString;
    }

    updateDishesOverview() {

        let dinnerList = this.container.querySelector("#dinnerList");
        let selectedDishes = this.model.getAllSelectedDishes();
        let dinnerListHTML = "";

        dinnerList.innerHTML = dinnerListHTML;

        for (let i in selectedDishes) {
            dinnerListHTML += `<div class="col-md-3">
                                    <div class="thumbnail">
                                        <a>
                                            <img class="img-thumbnail" src="${selectedDishes[i].image}"  alt="" ${selectedDishes[i].title}>
                                                 <div class="caption" id="captionOverview">
                                                     <p>${selectedDishes[i].title} ${selectedDishes[i].pricePerServing} SEK</p>
                                                 </div>
                                         </a>
                                    </div>
                                </div>`;
        }

        // Get the total
        dinnerListHTML += `<div class="col-md-2 vertical_line">
                                <p id="total_overview"> Total: <br> ${this.model.getTotalMenuPrice()} SEK</p>
                           </div>`;
        dinnerList.innerHTML = dinnerListHTML;
    }

    update(model, changeDetails) {
        this.model = model;

        if(changeDetails == "numberOfGuests") {
            this.updateNumberOfPeople()
        }

        if(changeDetails == "addDishToMenu") {
            this.updateDishesOverview();
        }
    }
}
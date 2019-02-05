class DinnerOverviewView extends GeneralView{

    constructor(container, model) {
        super(container);
        model.addObserver(this);
        this.model = model;

        this.addDynamicElements();

        // The button id that will trigger the click event
        this.button = document.getElementById("buttonFullRecipe");
    }

    addDynamicElements() {
        let nrPeople = this.container.find("#numberPeopleOverview");
        let nrPeopleValue = this.model.getNumberOfGuests();
        let nrPeopleString = `My Dinner: ${nrPeopleValue} people`;
        nrPeople.html(nrPeopleString);

        let dinnerList = this.container.find("#dinnerList");
        let selectedDishes = this.model.getAllSelectedDishes();
        let dinnerListHTML = "";

        dinnerList.html(dinnerListHTML);

        for (let i in selectedDishes) {
            dinnerListHTML += `<div class="col-md-3">
                                    <div class="thumbnail">
                                        <a>
                                            <img class="img-thumbnail" src=../images/${selectedDishes[i].image} alt="" ${selectedDishes[i].name}>
                                                 <div class="caption" id="captionOverview">
                                                     <p>${this.model.getDishPrice(selectedDishes[i].id)} SEK</p>
                                                 </div>
                                         </a>
                                    </div>
                                </div>`;
        }

        // Get the total
        dinnerListHTML += `<div class="col-md-2 vertical_line">
                                <p id="total_overview"> Total: <br> ${this.model.getTotalMenuPrice()} SEK</p>
                           </div>`;
        dinnerList.html(dinnerListHTML);
    }

    // TODO: modify this
    update(model, changeDetails) {
        this.model = model;
        this.addDynamicElements();
    }
}
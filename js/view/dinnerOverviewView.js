class DinnerOverviewView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    addInitialElements () {
        this.container.html(`<div class="container">
            <div class="row">
                <h3 class="text-left col-md-6" id="numberPeople"></h3>
                <div class="text-right col-md-6">
                    <button class="button button-back" type="button">Go back and edit dinner</button>
                </div>
            </div>
        </div>
        <hr>
        <div class="container">
            <div class="row" id="dinnerList">
            </div>
        </div>`);
    }

    init() {
        this.addInitialElements();

        let nrPeople = this.container.find("#numberPeople");
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
                                            <img src=../images/${selectedDishes[i].image} alt="" ${selectedDishes[i].name}>
                                                 <div class="caption">
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
}
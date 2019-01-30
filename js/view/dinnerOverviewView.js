class DinnerOverviewView {

    constructor(container, model) {
        this.container = container;
        this.model = model;
    }

    init() {
        let nrPeople = this.container.find("#numberPeople");
        let nrPeopleValue = this.model.getNumberOfGuests();
        let nrPeopleString = `My Dinner: ${nrPeopleValue} people`;
        nrPeople.html(nrPeopleString);

        let dinnerList = this.container.find("#dinnerList");
        let selectedDishes = this.model.getAllSelectedDishes();
        let dinnerListHTML = "";

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
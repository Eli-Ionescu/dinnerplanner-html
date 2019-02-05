class PrintoutView extends GeneralView{
    constructor(container, model) {
        super(container);
        model.addObserver(this);
        this.model = model;

        this.addDynamicElements();
    }

    addDynamicElements () {
        let nrPeople = this.container.querySelector("#numberPeoplePrintout");
        let nrPeopleValue = this.model.getNumberOfGuests();
        let nrPeopleString = `My Dinner: ${nrPeopleValue} people`;
        nrPeople.innerHTML = nrPeopleString;

        // The printout of the selected dishes
        let printoutList = this.container.querySelector("#printoutList");
        let selectedDishes = this.model.getAllSelectedDishes();
        let listHTML = "";
        for (let i in selectedDishes) {
            listHTML += `<div id="dinnerItem" class="row">
                             <div class="col-md-2" id="imageContainer">
                               <img class="img-thumbnail" src="images/${selectedDishes[i].image}">
                             </div>
                             <div class="col-md-4" id="descriprtion">
                                <h2>${selectedDishes[i].name}</h2>
                                <p>${selectedDishes[i].description}</p>
                             </div>
                             <div class="col-md-6" id="preparation">
                                <h3>PREPARATION</h3>
                                <p>${selectedDishes[i].description}</p>
                             </div>
                         </div>`
        }
        printoutList.innerHTML = listHTML;
    }

    // TODO: modify this
    update () {
        this.addDynamicElements();
    }
}
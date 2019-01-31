class PrintoutView {
    constructor(container, model) {
        model.addObserver(this);
        this.container = container;
        this.model = model;

        this.init();
    }

    addInitialElements () {
        this.container.html(
            `<div class="container">
                <div class="row">
                    <h3 class="text-left col-md-6" id="numberPeoplePrintout"></h3>
                    <div class="text-right col-md-6">
                        <button class="button button-back" type="button" id="buttonBackAndEdit">Go back and edit dinner</button>
                    </div>
                </div>
            </div>
            <hr>
            <div class="container" id="printoutList">
            </div>`
        );
    }

    addDynamicElements () {
        let nrPeople = this.container.find("#numberPeoplePrintout");
        let nrPeopleValue = this.model.getNumberOfGuests();
        let nrPeopleString = `My Dinner: ${nrPeopleValue} people`;
        nrPeople.html(nrPeopleString);

        // The printout of the selected dishes
        let printoutList = this.container.find("#printoutList");
        let selectedDishes = this.model.getAllSelectedDishes();
        let listHTML = "";
        for (let i in selectedDishes) {
            listHTML += `<div id="dinnerItem" class="row">
                             <div class="col-md-2" id="imageContainer">
                               <img src="../images/${selectedDishes[i].image}">
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
        printoutList.html(listHTML);
    }

    init () {
        this.addInitialElements();
        this.addDynamicElements();
    }

    update () {
        this.addDynamicElements();
    }

}
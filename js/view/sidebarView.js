/**
 * View for the sidebar
 * @param container
 * @param model
 * @constructor
 */
class SidebarView {
    constructor (container, model) {
        model.addObserver(this);
        this.container = container;
        this.model = model;
        this.people = this.container.find("#numberPeople");
    }

    addInitialElments () {
        this.container.html(`<div id="row" id="sidebarHeader">
                <h3 class="col-xs-4">My Dinner</h3>
                <div id="button_collapse" class="hidden-sm-up col-xs-4">
                    <i class="fa fa-bars fa-2x" aria-hidden="true" data-toggle="collapse" data-target="#innerSidebar"></i>
                </div>
            </div>
            <div class="hidden-xs sidebar" id="innerSidebar">
                <label for="numberPeople">People:</label>
                <select id="numberPeople">
                </select>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Dish Name</th>
                        <th scope="col">Cost</th>
                    </tr>
                    </thead>
                    <tbody id="selectedDishTableBody">
                    </tbody>
                </table>
                <p align="right" id="totalPrice"></p>
                <button align="middle" class="button" id="confirmDinner">
                    Confirm Dinner
                </button>
            </div>`);
    }

    addDynamicElements () {
        // Selection menu for number of people
        let numberPeopleSelect = this.container.find("#numberPeople");
        let numberPeople = this.model.getNumberOfGuests();
        let selectPeople = "";
        for (let i=1; i <= numberPeople; i++){
            selectPeople += `<option>${i}</option>`;
        }
        numberPeopleSelect.html(selectPeople);

        // Get a list with selected dishes and add them in the sidebar table
        let selectedDish = this.container.find("#selectedDishTableBody");
        let allSelectedDishes = this.model.getAllSelectedDishes();
        let selectedDishHTML = "";

        for(let i in allSelectedDishes){
            selectedDishHTML += `<tr> 
                                    <td scope=row>${allSelectedDishes[i].name}</td>
                                    <td>${this.model.getDishPrice(allSelectedDishes[i].id)}</td>
                                </tr>`;
        }
        selectedDish.html(selectedDishHTML);

        // Get the total price of the menu
        let totalPrice = this.container.find("#totalPrice");
        let totalPriceValue = this.model.getTotalMenuPrice();
        let totalPriceHTML = "Total: ";
        totalPriceHTML += totalPriceValue.toString();
        totalPriceHTML += " SEK";
        totalPrice.html(totalPriceHTML);
    }

    init() {
        // Add the initial elements
        this.addInitialElments();
        this.addDynamicElements();
    }
}
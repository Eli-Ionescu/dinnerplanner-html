
class SidebarView {
    constructor (container, model) {
        model.addObserver(this);
        this.container = container;
        this.model = model;

        this.init();
        this.people = document.getElementById("numberPeople");
        this.confirmButton = document.getElementById("confirmDinner");
    }

    // Returns a list with all the "span" elements that are used as delete buttons
    getSelectedDishesDeleteButtons () {
        let buttons = [];
        let table = document.getElementById("selectedDishTableBody");
        for (let row = 0; row < table.children.length; row++){
            // get the span, which is the element on index
            let span = table.children[row].children[2].firstChild;
            buttons.push(span);
        }
        return buttons;
    }

    getDishDeleteId (span) {
        return span.id.replace("delete", "");
    }

    addDynamicElements () {
        // Selection menu for number of people
        let numberPeopleSelect = this.container.find("#numberPeople");
        let numberPeople = this.model.getMaxNrGuests();
        let selectPeople = "";
        for (let i=1; i <= numberPeople; i++){
            selectPeople += (i == this.model.getNumberOfGuests()) ?
                `<option selected>${i}</option>` :
                `<option>${i}</option>`;

          }
        numberPeopleSelect.html(selectPeople);

        // Get a list with selected dishes and add them in the sidebar table
        let selectedDish = this.container.find("#selectedDishTableBody");
        let allSelectedDishes = this.model.getAllSelectedDishes();
        let selectedDishHTML = "";

        for(let i in allSelectedDishes){
            selectedDishHTML += `<tr> 
                                    <td scope=row>${allSelectedDishes[i].name}</td>
                                    <td>${this.model.getNumberOfGuests() * this.model.getDishPrice(allSelectedDishes[i].id)}</td>
                                    <td><span id="delete${allSelectedDishes[i].id}"class="close">&times;</span></td>
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
        this.addDynamicElements();
    }

    // TODO: modify this
    update (model, changeDetails) {
        this.model = model;
        this.addDynamicElements();
    }
}
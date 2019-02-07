
class SidebarView extends GeneralView{
    constructor (container, model) {
        super(container);
        model.addObserver(this);
        this.model = model;

        this.updateNumberOfGuests();
        this.updateDishList();
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

    updateNumberOfGuests () {
        // Selection menu for number of people
        let numberPeopleSelect = this.container.querySelector("#numberPeople");
        let numberPeople = this.model.getMaxNrGuests();
        let selectPeople = "";
        for (let i=1; i <= numberPeople; i++){
            selectPeople += (i == this.model.getNumberOfGuests()) ?
                `<option selected>${i}</option>` :
                `<option>${i}</option>`;
        }
        numberPeopleSelect.innerHTML = selectPeople;
    }

    updateDishList() {
        // Get a list with selected dishes and add them in the sidebar table
        let selectedDish = this.container.querySelector("#selectedDishTableBody");
        let allSelectedDishes = this.model.getAllSelectedDishes();
        let selectedDishHTML = "";

        for(let dish of allSelectedDishes){
            selectedDishHTML += `<tr>
                                    <td scope=row>${dish.title}</td>
                                    <td>${this.model.getNumberOfGuests() * dish.price}</td>
                                    <td><span id="delete${dish.id}"class="close">&times;</span></td>
                                </tr>`;
        }
        selectedDish.innerHTML = selectedDishHTML;

        // Get the total price of the menu
        let totalPrice = this.container.querySelector("#totalPrice");
        let totalPriceValue = this.model.getTotalMenuPrice();
        let totalPriceHTML = "Total: ";
        totalPriceHTML += totalPriceValue.toString();
        totalPriceHTML += " SEK";
        totalPrice.innerHTML = totalPriceHTML;
    }

    update (model, changeDetails) {
        this.model = model;

        if(changeDetails == "numberOfGuests") {
            this.updateNumberOfGuests();
            this.updateDishList();
        }

        if(changeDetails == "addDishToMenu") {
            this.updateDishList();
        }
    }
}
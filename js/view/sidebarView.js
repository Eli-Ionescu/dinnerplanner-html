/**
 * View for the sidebar
 * @param container
 * @param model
 * @constructor
 */
var SidebarView = function (container, model) {

    // Selection menu for number of people
    var numberPeopleSelect = container.find("#numberPeople");
    var numberPeople = model.getNumberOfGuests();
    let selectPeople = "";
    for (let i=1; i <= numberPeople; i++){
        selectPeople += "<option>";
        selectPeople += i;
        selectPeople += "</option>";
    }
    numberPeopleSelect.html(selectPeople);

    // Get a list with selected dishes and add them in the sidebar table
    var selectedDish = container.find("#selectedDishTableBody");
    var allSelectedDishes = model.getAllSelectedDishes();
    var selectedDishHTML = "";

    for(let dish in allSelectedDishes){
        selectedDishHTML += "<tr>\n";
        selectedDishHTML += "<td scope=\"row\">" + dish.name + "</td>\n";
        selectedDishHTML += " <td>"+ model.getDishPrice(dish.id) +"</td>\n";
        selectedDishHTML += "</tr>";
    }
    selectedDish.html(selectedDishHTML);

    // Get the total price of the menu
    var totalPrice = container.find("#totalPrice");
    var totalPriceValue = model.getTotalMenuPrice();
    var totalPriceHTML = "Total: ";
    totalPriceHTML += totalPriceValue.toString();
    totalPriceHTML += "SEK";
    totalPrice.html(totalPriceHTML);
};
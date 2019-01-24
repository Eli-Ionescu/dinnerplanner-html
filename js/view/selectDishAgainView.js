/**
 * View for the select dish again page
 * @param container
 * @param model
 * @constructor
 */
var SelectDishAgainView = function (container, model) {

    // Just the elements that are specific to the SelectDishAgain are added
    // The elements for number of people, dish types and dish images should
    // be taken from SelectDishView

    // Get a list with selected dishes and add them in the table
    var selectedDish = container.find(".selectedDishTableBody");
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
    var totalPrice = container.find(".totalPrice");
    var totalPriceValue = model.getTotalMenuPrice();
    var totalPriceHTML = "Total: ";
    totalPriceHTML += totalPriceValue.toString();
    totalPriceHTML += "SEK";

    totalPrice.html(totalPriceHTML);

}
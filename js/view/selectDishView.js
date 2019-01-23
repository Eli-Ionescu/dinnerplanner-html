/**
 * View for the dish selection page
 * @param container
 * @param model
 * @constructor
 */
var SelectDishView = function (container, model) {

    // Selection menu for number of people
    var numberPeopleSelect = container.find(".numberPeople");
    var numberPeople = model.getNumberOfGuests();
    let selectPeople = "";
    for (let i=1; i <= numberPeople; i++){
        selectPeople += "<option>";
        selectPeople += i;
        selectPeople += "</option>";
    }
    numberPeopleSelect.html(selectPeople);

    // Drop-down list for dish types
    var dishSelect = container.find("#dishSelect");
    var allDishTypes = model.getAllDishTypes();
    let dropDownTypeList = "<option value=\"\"> All </option>\n";

    for(let dishType in allDishTypes){
        dropDownTypeList += "<option value=\"\"> ";
        dropDownTypeList += dishType;
        dropDownTypeList += "</option>\n";
    }
    dishSelect.html(dropDownTypeList);

    // List with all the dishes
    var dishList = container.find("#dishList");
    var allDishes = model.getFullMenu();
    var dishListHTML = "";

    allDishes.forEach(dish => {
        dishListHTML += "<div class=\"dishItem\">\n";
        dishListHTML += "<img src=\"";
        dishListHTML += dish.image;
        dishListHTML += ">\n";
        dishListHTML += "<h3>";
        dishListHTML += dish.name;
        dishListHTML += "</h3></div>"
    });
    dishList.html(dishListHTML);

};
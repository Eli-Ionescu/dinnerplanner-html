/**
 * View for the dish selection page
 * @param container
 * @param model
 * @constructor
 */
var DishSearchView = function (container, model) {

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

    //TODO: check this code how the new dish item view gets created
    allDishes.forEach(dish => {
        var dishItemView = new DishItemView(container, model, dish.id);
    });
    dishList.html(dishListHTML);
};
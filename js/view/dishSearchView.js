/**
 * View for the dish selection page
 * @param container
 * @param model
 * @constructor
 */
var DishSearchView = function (container, model) {

    // Drop-down list for dish types
    let dishSelect = container.find("#dishType");
    let allDishTypes = model.getAllDishTypes();
    let dropDownTypeList = "<option value=\"\"> All </option>\n";

    allDishTypes.forEach((dishType => {
        dropDownTypeList += "<option value=\"\">";
        dropDownTypeList += dishType;
        dropDownTypeList += "</option>\n";
    }));
    dishSelect.html(dropDownTypeList);

    // List with all the dishes
    let dishList = container.find("#dishList");
    let allDishes = model.getFullMenu();
    let HTMLString = "";

    allDishes.forEach(dish => {
        console.log(dish);
        HTMLString += "<div class=\"col-md-2\">";
        HTMLString += "<div class=\"thumbnail\">";
        HTMLString += "<a>";
        HTMLString += "<img src=\"../images/"+ dish.image +"\" alt=\""+ dish.name +"\">";
        HTMLString += "<div class=\"caption\">\n";
        HTMLString += "<p>" + dish.name +"<\p>";
        HTMLString += "</div></a></div></div>\n";
    });
    dishList.html(HTMLString);
};
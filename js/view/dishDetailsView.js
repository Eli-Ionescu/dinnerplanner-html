var DishDetailsView = function (container, model, id) {

    // Create the 
    let dishDetailDescription = container.find("#dishDetailList");
    let dish = model.getDish(id);

    let dishDescription = "<div id=\"dishDescription\" class=\"col-md-6\">\n";
    dishDescription += "<h3>"+ dish.name +"</h3>\n";
    dishDescription += "<div class=\"row\">\n";
    dishDescription += "<img src=\"../images/" + dish.image + "alt=\"" + dish.name + "\" width=\"420\" height=\"188\">\n";
    dishDescription += "</div>";
    dishDescription += "<div class=\"row\">";
    dishDescription += "<p>Lasagne is a type of wide, flat pasta, possibly one of the oldest types of pasta.\n" +
        "        Lasagne, or the singular lasagna, commonly refers to a culinary dish made with\n" +
        "        stacked layers of pasta alternated with sauces and ingredients such as meats,\n" +
        "        vegetables and cheese, and sometimes topped with melted grated cheese.\n" +
        "    </p>";
    dishDescription += "</div>";
    dishDescription += " <div class=\"row\">\n" +
        "        <button class=\"button\">Back to search</button>\n" +
        "    </div>";

    // Ingredients list
    let ingredients = dish.ingredients;
    let nrPeople = model.getNumberOfGuests();

    dishDescription += "<div class=\"col-md-6\">\n" +
        "        <h3>Ingredients for " + nrPeople + " people</h3>\n" +
        "    <table class=\"table\">" +
        "       <tbody>";

    for (let ingredient in ingredients) {
        dishDescription += "<tr>\n";
        dishDescription += "<td scope=\"row\">" + ingredient.quantity+ " " + ingredient.unit +"</td>";
        dishDescription += "<td> " + ingredient.name + " </td>";
        dishDescription += "<td> SEK </td>";
        dishDescription += "<td> " + ingredient.price+ " </td>";
        dishDescription += " </tr>\n";
    }
    dishDescription += "</tbody>\n" +
        "    </table> " +
        "    <hr>";

    dishDescription += "<button class=\"button-add-to-menu\">Add to menu</button>\n";

    // Compute total
    var total = container.find("#dishDetailTotal");
    var totalPrice = model.getDishPrice(dish.id);
    dishDescription += "<p align=\"right\"> Total: " + totalPrice+ "</p>";
    dishDescription += "</div>";

    dishDetailDescription.html(dishDescription)
};
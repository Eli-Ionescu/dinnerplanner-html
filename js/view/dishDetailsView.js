var DishDetailsView = function (container, model, id) {

    let dishDetailDescription = container.find("#dishDescription");
    let dish = model.getDish(id);

    // let dishDescription = "<div class=\"col-md-6\">";
    let dishDescription = "<h3>"+ dish.name +"</h3>\n";
    dishDescription += "<div class=\"row\">\n";
    dishDescription += "<img src=\"../images/"+ dish.image +"\" alt=\""+ dish.name +"\">";
    dishDescription += "</div>";
    dishDescription += "<p>" + dish.description + "</p>";
    dishDescription += "<div class=\"row\">";
    dishDescription += "</div>";
    dishDescription += " <div class=\"row\">\n" +
        "        <button class=\"button\">Back to search</button>\n";

    dishDetailDescription.html(dishDescription);

    // Ingredients list
    let dishDetailIngredients = container.find("#dishIngredients");
    let ingredients = dish.ingredients;
    let nrPeople = model.getNumberOfGuests();

    let dishIngredients = "<h3>Ingredients for " + nrPeople + " people</h3>\n"
    dishIngredients  += "<table class=\"table\">" +
        "<tbody>";

    for (let i in ingredients) {
        let totalQuantity = ingredients[i].quantity * nrPeople;
        let totalPrice = ingredients[i].price * nrPeople;
        dishIngredients += "<tr>\n";
        dishIngredients += "<td scope=\"row\">" + totalQuantity + " " + ingredients[i].unit +"</td>";
        dishIngredients += "<td> " + ingredients[i].name + " </td>";
        dishIngredients += "<td> SEK </td>";
        dishIngredients += "<td> " +totalPrice + " </td>";
        dishIngredients += " </tr>\n";
    }
    dishIngredients += "</tbody>\n" +
        "    </table> " +
        "    <hr>";
    dishIngredients += "<button class=\"button-add-to-menu\">Add to menu</button>\n";

    // Compute total
    var dishPrice = model.getDishPrice(dish.id);
    // the total price depending on how many people are
    var totalPrice = dishPrice * nrPeople;
    dishIngredients += "<p align=\"right\"> Total: " + totalPrice + " SEK" + "</p>";
    dishIngredients += "</div>";

    dishDetailIngredients.html(dishIngredients);
};
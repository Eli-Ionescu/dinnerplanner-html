var PrintoutView = function (container, model) {
    if (!container) {return;}

    let nrPeople = container.find("#numberPeoplePrintout");
    let nrPeopleValue = model.getNumberOfGuests();
    let nrPeopleString = "My Dinner: " + nrPeopleValue + " people";
    nrPeople.html(nrPeopleString);

    // The printout of the selected dishes
    let printoutList = container.find("#printoutList");
    let selectedDishes = model.getAllSelectedDishes();
    let listHTML = "";
    for (let i in selectedDishes) {
        listHTML += "            <div id=\"dinnerItem\" class=\"row\">\n";
        listHTML += "                <div class=\"col-md-2\" id=\"imageContainer\">\n";
        listHTML += "                    <img src=\"..\\images\\" + selectedDishes[i].image + "\">\n";
        listHTML += "                </div>\n";
        listHTML += "                <div class=\"col-md-4\" id=\"descriprtion\">\n";
        listHTML += "                    <h2>" + selectedDishes[i].name + "</h2>\n";
        listHTML += "                    <p>" + selectedDishes[i].description + "</p>\n";
        listHTML += "                </div>\n";
        listHTML += "                <div class=\"col-md-6\" id=\"preparation\">\n";
        listHTML += "                    <h3>PREPARATION</h3>\n";
        listHTML += "                    <p>" + selectedDishes[i].description + "</p>\n";
        listHTML += "                </div>\n";
        listHTML += "            </div>";
    }

    printoutList.html(listHTML);

}
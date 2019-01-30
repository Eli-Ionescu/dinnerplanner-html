var DinnerOverviewView = function (container, model) {

    let nrPeople = container.find("#numberPeople");
    let nrPeopleValue = model.getNumberOfGuests();
    let nrPeopleString = "My Dinner: " + nrPeopleValue + " people";
    nrPeople.html(nrPeopleString);

    let dinnerList = container.find("#dinnerList");
    let selectedDishes = model.getAllSelectedDishes();
    let dinnerListHTML = "";

    for (let i in selectedDishes) {
        dinnerListHTML += " <div class=\"col-md-2\">\n";
        dinnerListHTML += "     <div class=\"thumbnail\">\n";
        dinnerListHTML += "         <a>\n";
        dinnerListHTML += "             <img src=\"../images/" + selectedDishes[i].image+"\" alt=\"" + selectedDishes[i].name+ "\">\n";
        dinnerListHTML += "             <div class=\"caption\">\n";
        dinnerListHTML += "                 <p>" + model.getDishPrice(selectedDishes[i].id)+ " SEK</p>\n";
        dinnerListHTML += "</div></a></div></div>\n";
    }

    // Get the toal
    dinnerListHTML += "<div class=\"col-md-2 vertical_line\">";
    dinnerListHTML += "  <p id=\"total_overview\"> Total: <br> " + model.getTotalMenuPrice() + " SEK</p>\n";
    dinnerListHTML += "</div>";

    dinnerList.html(dinnerListHTML);

}
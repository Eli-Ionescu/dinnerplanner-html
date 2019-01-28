var DishItemView = function (container, model, id) {

    var itemContainer = container.find("#itemViewList");
    var dish = model.getDish(id);

    var HTMLString = "";
    HTMLString += "<div class=\"col-md-2\">";
    HTMLString += "<div class=\"thumbnail\">";
    HTMLString += "<a>";
    HTMLString += "<img src=\""+ dish.image +"alt=\""+ dish.name +"\">";
    HTMLString += "<div class=\"caption\">\n";
    HTMLString += "<p>" + dish.name +"<\p>";
    HTMLString += "</div></a></div></div>\n";


    itemContainer.html(itemContainer.html + HTMLString);
};
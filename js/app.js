$(function() {
	//We instantiate our model
    var model = new DinnerModel();
    model.setNumberOfGuests(3);
    model.addDishToMenu(1);
    model.addDishToMenu(102);
    model.addDishToMenu(202);
	
	// And create the instance of ExampleView
	// var exampleView = new ExampleView($("#exampleView"));
    var sidebarView = new SidebarView($("#sidebar"), model);
    var dishSearchView = new DishSearchView($("#main"), model);

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

});
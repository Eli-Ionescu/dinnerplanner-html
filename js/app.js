window.onload = function() {

    //We instantiate our model
    let model = new DinnerModel();
    model.setNumberOfGuests(5);
    model.addDishToMenu(1);
    model.addDishToMenu(102);
    model.addDishToMenu(202);

	// And create the instance of ExampleView
	// var exampleView = new ExampleView($("#exampleView"));

    let homeView = new HomeView($("#home"));

    // Select dish
    let sidebarView = new SidebarView($("#sidebar"), model, this);
    let sidebarController = new DishSidebarController(sidebarView, model, this);

    let indexDishSearchView = new DishSearchView($("#selectDish"), model, this);
    let dishSearchController = new DishSearchController(indexDishSearchView, model, this);


    // Select dish and select dish again for Lab 1
    let dishSearchView = new DishSearchView($("#mainSearch"), model, this);
    let dishSearchViewAgain = new DishSearchView($("#mainAgain"), model, this);

    // Dish detail view
    let dishDetailsView = new DishDetailsView($("#dishDetails"), model, 100);
    let dishDetailsController = new DishDetailsController(dishDetailsView, model, this);

    // Overview view
    let overviewView = new DinnerOverviewView($("#dinnerOverview"), model);
    let overviewController = new DinnerOverviewController(overviewView, model, this);

    // Printout view
    let printoutView = new PrintoutView($("#printout"), model);

	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

	let showHome = function () {
        $("#home").show();
    };

	let hideHome = function () {
        $("#home").hide();
    };

	let showSidebar = function () {
	    $("#sidebar").show();
    };

	let hideSidebar = function () {
	    $("#sidebar").hide();
    };

    let showSelectDish = function () {
        $("#selectDish").show();
    };

    let hideSelectDish = function () {
        $("#selectDish").hide();
    };

    let showDishDetails = function (id) {
        let dishDetailsView = new DishDetailsView($("#dishDetails"), model, id);
        let dishDetailsController = new DishDetailsController(dishDetailsView, model, this);

        $("#dishDetails").show();
    };

    let hideDishDetails = function () {
        $("#dishDetails").hide();
    };

    let showDinnerOverview = function () {
        $("#dinnerOverview").show();
    };

    let hideDinnerOveviw = function () {
        $("#dinnerOverview").hide();
    };

    let showPrintout = function () {
        $("#printout").show();
    };

    let hidePrintout = function () {
        $("#printout").hide();
    };

    let hideAll = function () {
        hideHome();
        hideSidebar();
        hideSelectDish();
        hideDishDetails();
        hideDinnerOveviw();
        hidePrintout();
    };

    this.showHomePage = function () {
        hideAll();
        showHome();
    };

    this.showSelectDishPage = function () {
        hideAll();
        showSidebar();
        showSelectDish();
    };

    this.showDishDetailsPage = function (id) {
        hideAll();
        showSidebar();
        showDishDetails(id);
    };

    this.showDinnerOverviewPage = function () {
        hideAll();
        showDinnerOverview();
    };

    this.showPrintoutPage = function () {
        hideAll();
        showPrintout();
    };

    // Start the app with home
    hideAll();
    this.showHomePage();

    // Set buttons
    $("#newDinnerButton").click(function () {
        showSelectDishPage();
    });

    $("#buttonBackToSearch").click(function () {
       showSelectDishPage();
    });

    $("#buttonBackAndEdit").click(function () {
        showDinnerOverviewPage();
    });

    $("#buttonGoBackEditDinner").click(function () {
        showSelectDishPage();
    });
};
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
    homeView.init();

    // Select dish
    let sidebarView = new SidebarView($("#sidebar"), model);
    // let sidebarController = new DishSidebarController(sidebarView, model, this);

    let indexDishSearchView = new DishSearchView($("#selectDish"), model);
    // let dishSearchController = new DishSearchController(indexDishSearchView, model, this);

    // Select dish for lab 1
    let dishSearchView = new DishSearchView($("#mainSearch"), model);
    let dishSearchViewAgain = new DishSearchView($("#mainAgain"), model);

    // Dish detail view
    let dishDetailsView = new DishDetailsView($("#dishDetails"), model, 100);
    // let dishDetailsController = new DishDetailsController(dishDetailsView, model, this);

    // Overview view
    let overviewView = new DinnerOverviewView($("#dinnerOverview"), model);
    // let overviewController = new DinnerOverviewController(overviewView, model, this);

    // Printout view
    let printoutView = new PrintoutView($("#printout"), model);


	/**
	 * IMPORTANT: app.js is the only place where you are allowed to
	 * use the $('someSelector') to search for elements in the whole HTML.
	 * In other places you should limit the search only to the children 
	 * of the specific view you're working with (see exampleView.js).
	 */

	this.showHome = function () {
	    console.log("dumb");
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

    this.showDishDetails = function () {
        $("#dishDetails").show();
    };

    let hideDishDetails = function () {
        $("#dishDetails").hide();
    };

    this.showDinnerOverview = function () {
        $("#dinnerOverview").show();
    };

    let hideDinnerOveviw = function () {
        $("#dinnerOverview").hide();
    };

    this.showPrintout = function () {
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

    this.showDishDetailsPage = function () {
        hideAll();
        showSidebar();
        showDishDetails();
    };

    this.showDinnerOverviewPage = function () {
        hideAll();
        showDinnerOverview();
    };

    this.showPrintoutPage = function () {
        hideAll();
        showPrintout();
    }

    // Start the app with home
   // hideAll();
   // this.showHome();

    let showFirstPage = this.showSelectDishPage;

    $("#newDinnerButton").click(function () {
        showFirstPage();
    });

    $("#buttonBackToSearch").click(function () {
       showSelectDishPage();
    });
    //hideAll();
    // this.showSelectDishPage();
};
$(function() {
	//We instantiate our model
    let model = new DinnerModel();
    model.setNumberOfGuests(3);
    model.addDishToMenu(1);
    model.addDishToMenu(102);
    model.addDishToMenu(202);
	
	// And create the instance of ExampleView
	// var exampleView = new ExampleView($("#exampleView"));

    let homeView = new HomeView($("#home"));
    homeView.init();

    // Select dish
    let sidebarView = new SidebarView($("#sidebar"), model);
    sidebarView.init();
    let dishSearchView = new DishSearchView($("#mainSearch"), model);
    dishSearchView.init();

    let indexDishSearchView = new DishSearchView($("#selectDish"), model);
    indexDishSearchView.init();

    // Select dish again
    let sidebarViewAgian = new SidebarView($("#sidebarAgain"), model);
    sidebarViewAgian.init();
    let dishSearchViewAgain = new DishSearchView($("#mainAgain"), model);
    dishSearchViewAgain.init();

    // Dish detail view
    let dishDetailSideBar = new SidebarView($("#sidebarDishDetails"), model);
    dishDetailSideBar.init();
    let dishDetailsView = new DishDetailsView($("#dishDetailsContainer"), model, 100);
    dishDetailsView.init();

    // Overview view
    let overviewView = new DinnerOverviewView($("#dinnerOverview"), model);
    overviewView.init();

    // Printout view
    let printoutView = new PrintoutView($("#printout"), model);
    printoutView.init();


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

    let showDishDetails = function () {
        $("#dishDetails").show();
    };
    let hideDishDetails = function () {
        $("#dishDetails").hide();
    };

    let showDinnerOveviw = function () {
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

    let showHomePage = function () {
        hideAll();
        showHome();
    };

    let showSelectDishPage = function () {
        hideAll();
        showSidebar();
        showSelectDish();
    };

    let showDishDetailsPage = function () {
        hideAll();
        showSidebar();
        showDishDetails();
    };

    let showDinnerOverviewPage = function () {
        hideAll();
        showDinnerOveviw();
    };

    let showPrintoutPage = function () {
        hideAll();
        showPrintout();
    }

    // Start the app with home
    showHome();

    $("#newDinnerButton").click(function () {
        showSelectDishPage();
    });
});
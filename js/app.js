window.onload = function() {

    //We instantiate our model
    let model = new DinnerModel();
    model.setNumberOfGuests(5);
    model.addDishToMenu(1);
    model.addDishToMenu(102);
    model.addDishToMenu(202);

    // Initialise the general state controller
    let generalController = new GeneralStateController();

    // Create the views
    let sidebarView = new SidebarView($("#sidebar"), model, this);
    generalController.addView(sidebarView);
    let sidebarController = new DishSidebarController(sidebarView, model, this);

    let dishSearchView = new DishSearchView($("#selectDish"), model, this);
    generalController.addView(dishSearchView);
    let dishSearchController = new DishSearchController(dishSearchView, model, this);

    let dishDetailsView = new DishDetailsView($("#dishDetails"), model);
    generalController.addView(dishDetailsView);
    let dishDetailsController = new DishDetailsController(dishDetailsView, model, this);

    let overviewView = new DinnerOverviewView($("#dinnerOverview"), model);
    generalController.addView(overviewView);
    let overviewController = new DinnerOverviewController(overviewView, model, this);

    let printoutView = new PrintoutView($("#printout"), model)
    generalController.addView(printoutView);

    generalController.addScreen("SEARCH", [sidebarView, dishSearchView]);
    generalController.addScreen("DETAIL", [sidebarView, dishDetailsView]);
    generalController.addScreen("OVERVIEW", [overviewView]);
    generalController.addScreen("PRINTOUT", [printoutView]);
    //
	// let showHome = function () {
    //     $("#home").show();
    // };
    //
	// let hideHome = function () {
    //     $("#home").hide();
    // };
    //
	// let showSidebar = function () {
	//     $("#sidebar").show();
    // };
    //
	// let hideSidebar = function () {
	//     $("#sidebar").hide();
    // };
    //
    // let showSelectDish = function () {
    //     $("#selectDish").show();
    // };
    //
    // let hideSelectDish = function () {
    //     $("#selectDish").hide();
    // };
    //
    // let showDishDetails = function (id) {
    //     let dishDetailsView = new DishDetailsView($("#dishDetails"), model, id);
    //     let dishDetailsController = new DishDetailsController(dishDetailsView, model, this);
    //
    //     $("#dishDetails").show();
    // };
    //
    // let hideDishDetails = function () {
    //     $("#dishDetails").hide();
    // };
    //
    // let showDinnerOverview = function () {
    //     $("#dinnerOverview").show();
    // };
    //
    // let hideDinnerOveviw = function () {
    //     $("#dinnerOverview").hide();
    // };
    //
    // let showPrintout = function () {
    //     $("#printout").show();
    // };
    //
    // let hidePrintout = function () {
    //     $("#printout").hide();
    // };
    //
    // let hideAll = function () {
    //     hideHome();
    //     hideSidebar();
    //     hideSelectDish();
    //     hideDishDetails();
    //     hideDinnerOveviw();
    //     hidePrintout();
    // };
    //
    // this.showHomePage = function () {
    //     hideAll();
    //     showHome();
    // };
    //
    // this.showSelectDishPage = function () {
    //     hideAll();
    //     showSidebar();
    //     showSelectDish();
    // };
    //
    // this.showDishDetailsPage = function (id) {
    //     hideAll();
    //     showSidebar();
    //     showDishDetails(id);
    // };
    //
    // this.showDinnerOverviewPage = function () {
    //     hideAll();
    //     showDinnerOverview();
    // };
    //
    // this.showPrintoutPage = function () {
    //     hideAll();
    //     showPrintout();
    // };
    //
    // // Start the app with home
    // hideAll();
    // this.showHomePage();

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
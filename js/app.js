window.onload = function() {

    //We instantiate our model
    let model = new DinnerModel();
    model.setNumberOfGuests(5);

    // Initialise the general state controller
    let generalController = new GeneralStateController();

    // Create the views
    let homeView = new HomeView(document.getElementById("home"));
    generalController.addView(homeView);
    let homeController = new HomeController(homeView, model, generalController);

    let sidebarView = new SidebarView(document.getElementById("sidebar"), model, this);
    generalController.addView(sidebarView);
    let sidebarController = new DishSidebarController(sidebarView, model, this);

    let dishSearchView = new DishSearchView(document.getElementById("selectDish"), model, this);
    generalController.addView(dishSearchView);
    let dishSearchController = new DishSearchController(dishSearchView, model, this);

    let dishDetailsView = new DishDetailsView(document.getElementById("dishDetails"), model, model.getCurrentId());
    generalController.addView(dishDetailsView);
    let dishDetailsController = new DishDetailsController(dishDetailsView, model, this);

    let overviewView = new DinnerOverviewView(document.getElementById("dinnerOverview"), model);
    generalController.addView(overviewView);
    let overviewController = new DinnerOverviewController(overviewView, model, this);

    let printoutView = new PrintoutView(document.getElementById("printout"), model);
    generalController.addView(printoutView);

    let loadingView = new LoadingView(document.getElementById("loader"));
    generalController.addView(loadingView);

    // Add all the screens
    generalController.addScreen("HOME", [homeView]);
    generalController.addScreen("SEARCH", [sidebarView, dishSearchView]);
    generalController.addScreen("DETAIL", [sidebarView, dishDetailsView]);
    generalController.addScreen("OVERVIEW", [overviewView]);
    generalController.addScreen("PRINTOUT", [printoutView]);
    generalController.addScreen("LOADING", [loadingView]);

    this.hideAll = function () {
       generalController.hideAll();
    };

    this.showHomePage = function () {
        generalController.showScreen("HOME");
    };

    this.showSelectDishPage = function () {
        hideAll();
        generalController.showScreen("SEARCH");
    };

    this.showDishDetailsPage = function (id) {
        hideAll();
        model.setCurrentId(id);
        generalController.showScreen("DETAIL");
    };

    this.showDinnerOverviewPage = function () {
        hideAll();
        generalController.showScreen("OVERVIEW");
    };

    this.showPrintoutPage = function () {
        hideAll();
        generalController.showScreen("PRINTOUT");
    };

    // Start the app with home
    this.showHomePage();

    // Set buttons
    $("#newDinnerButton").click(function () {
        homeController.loadData();
        document.getElementById("dishSearchButton").click();
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

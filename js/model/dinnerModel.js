
//DinnerModel Object constructor
class DinnerModel extends Observable{

    constructor () {
		super();
		this.numberOfGuests = 3;
        this.selectedDishes = [];
        this.dishTypes = dishTypes;

        this.dishes = [];
        this.baseUri = "";

        this.getRecepiesSearch()
          .then(data => {
            this.dishes = data.results;
            this.baseUri = data.baseUri;
          })
          .catch(error => console.error(error));
        // Initialise the current id with the first id in the dish list
        this.currentId = 0;
        this.dummyDish = constDish;
    }

    getRecepiesSearch () {
      return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search`, {
          headers: {
              'X-Mashape-Key': "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"
          }
      }).then(response => response.json());
    }

    getDishIngredients(id) {
        return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk?ids=` + id, {
            headers: {
                'X-Mashape-Key': "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"
            }
        }).then(response => response.json());
            // .then(dataIngredients => dataIngredients.extendedIngredients));
    }

    setCurrentId (id) {
        this.currentId = id;
        this.notifyObservers("currentDish");
    }

    getCurrentId (){
        return this.currentId;
    }

	setNumberOfGuests (num) {
		this.numberOfGuests = num;
		this.notifyObservers("numberOfGuests");
	}

	getNumberOfGuests () {
		return this.numberOfGuests;
	}

	//Returns the dish that is on the menu for the selected type
	getSelectedDish (type) {
	    let selectedDishes = [];
		for(let i in selectedDishes) {
			if(selectedDishes[i].type == type) {
			    selectedDishes.push(selectedDishes[i]);
			}
		}
		return selectedDishes;
	}

	//Returns all the dishes on the menu.
	getFullMenu () {
		return this.dishes;
	}

	// Returns the selected dishes
    getAllSelectedDishes () {
        return this.selectedDishes;
    }

	//Returns all ingredients for all the dishes on the menu.
	getAllIngredients () {
		let allIngredients = [];
		for(let i in this.dishes) {
			for(let ingredientIndex in this.dishes[i].ingredients) {
				allIngredients.push(this.dishes[i].ingredients[ingredientIndex]);
			}
		}
		return allIngredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	getTotalMenuPrice () {
		let total = 0;
		for (let dish in this.selectedDishes) {
		    total += this.getDishPrice(this.selectedDishes[dish].id);
		}
		return total * this.numberOfGuests;
	}

	//Adds the passed dish to the menu
	addDishToMenu (id) {
		let newDish = this.getDish(id);
        this.selectedDishes.push(newDish);
		this.notifyObservers("addDishToMenu");
	}

	//Removes dish from menu
	removeDishFromMenu (id) {
		let index = this.selectedDishes.indexOf(this.getDish(id));
		if (index > -1) {
			this.selectedDishes.splice(index, 1);
		}
        this.notifyObservers("removeDishFromMenu");
    }

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
    getAllDishes (type, filter) {
    	  // Get all the dishes of the certain type
		    if (type && (type != "All")) {
            return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type=${type}`, {
                headers: {
                    'X-Mashape-Key': API_KEY
                }
            }).then(response => response.json())
                .then(data => this.filterResults(data.results, filter));
        } else {
    			// Get all the dishes
                return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search`, {
                    headers: {
                        'X-Mashape-Key': API_KEY
                    }
                }).then(response => response.json())
                    .then(data => this.filterResults(data.results, filter));
    		}
    }

    filterResults(results, filter) {
        // Filter the data based on the filter
        return results.filter (function (dish) {
            let found = false;
            if (dish.title.indexOf(filter) != 1) {
                found = true;
            }
            return found;
        })
    }

    getDishDescription(id) {
        return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/summary`,{
            headers:{
                'X-Mashape-Key': API_KEY
            }
        }).then(response => response.json());
    }


	//function that returns a dish of specific ID
  getDish (id) {
	  for(let key in this.dishes){
			if(this.dishes[key].id == id) {
				return this.dishes[key];
			}
		}
    return this.dummyDish;
  }

	// Return a list with all the dish types
	getAllDishTypes () {
		return this.dishTypes;
	}

	// Returns the price of a dish
	getDishPrice (id) {
		let dish = this.getDish(id);
	    let price = 0;
	    for(let key in dish.ingredients) {
            price += dish.ingredients[key].price;
        }
        return price;
    }

    getMaxNrGuests () {
        return 10;
    }
}

const dishTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread",
    "breakfast", "soup", "beverage", "sauce", "drink"];

const constDish = {
  id: 0,
  title: "",
  image: ""
}


//DinnerModel Object constructor
class DinnerModel extends Observable{

    constructor () {
		super();
		this.numberOfGuests = 3;
        this.selectedDishes = [];
        this.dishes = [];
        this.dishTypes = dishTypes;

        // Initialise the current id with the first id in the dish list
        this.currentId = this.dishes[0].id;
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
        return fetch("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search",{
            headers:{
                'X-Mashape-Key': "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767"
            }
        }).then(response => response.json())
            .then(data => data.results)

    }

    // getAllDishes (type,filter) {
	//   return this.dishes.filter(function(dish) {
	// 	let found = true;
	// 	if(filter){
	// 		found = false;
	// 		dish.ingredients.forEach(function(ingredient) {
	// 			if(ingredient.name.indexOf(filter)!=-1) {
	// 				found = true;
	// 			}
	// 		});
	// 		if(dish.name.indexOf(filter) != -1)
	// 		{
	// 			found = true;
	// 		}
	// 	}
    //     return (type == "All" || !type) ? found : (dish.type == type && found);
	//   });
	// }

	//function that returns a dish of specific ID
	getDish (id) {
	  for(let key in this.dishes){
			if(this.dishes[key].id == id) {
				return this.dishes[key];
			}
		}
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
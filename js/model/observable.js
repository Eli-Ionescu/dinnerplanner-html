class Observable {

    constructor(){
        this._observers = [];
    }

    addObserver(observer){
        this._observers.push(observer);
    }

    notifyObservers(changeDetails) {
        for(let i=0; i<this._observers.length; i++) {
            this._observers[i].update(this, changeDetails);
        }
    }

    removeObserver(observer){
        for(let i in this._observers) {
            if(this._observers[i] == observer) {
                this._observers.splice(i, 1);
            }
        }
    }
}
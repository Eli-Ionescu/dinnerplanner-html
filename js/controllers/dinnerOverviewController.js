// class DinnerOverviewController {
//
//     constructor(view, model, controller) {
//         this.controller = controller;
//
//         console.log(view.button);
//         view.button.addEventListener("click",
//             () => {
//                 console.log("heheherhh");
//                 this.controller.showPrintout();
//                 });
//
//     }
// }

let DinnerOverviewController = function(view, model, controller) {

    view.button.click(function () {
        console.log("click");
        controller.showPrintout();
    });
}

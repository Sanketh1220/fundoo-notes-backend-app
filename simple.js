// console.log("Hello");

// function firstFunc () {
//     console.log("This is general func");
// }

// function empty () {
//     firstFunc();
// }

// firstFunc();

function data (callBack) {
    getData (function (error, data) {
        if(error) {
            console.log("An error occured");
            return callBack(error)
        }
        data += 1;
        callBack(data)
    }) ;
}
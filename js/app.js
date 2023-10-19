// ---------- Validaiton ----------

const form = document.querySelector("#request-quote")


// ---------- Events ---------
document.addEventListener('DOMContentLoaded', afterLoad)
document.addEventListener('submit', submitForm)


// this function for Priority page loading js file components
function afterLoad() {
    // get the current year
    fixNumbers(currentYear());
}


// -------------- submit Form ---------------
function submitForm(e) {
    // Prevent page loading
    e.preventDefault()

    const make = document.querySelector('#make').value
    const year = document.querySelector('#year').value
    const level = document.querySelector('input[name="level"]:checked')

    if (make === "" || year === "" || level === "") {
        displayMsg('بهت گفتم بس کن... بم گفتی خستم😭')
    } else {
        alert("ثبت شد")

        let insuranceCase = {
            make: make,
            year: year,
            level: level
        }

        // calculate
        calculaterPrice(insuranceCase)

    }

}


// Information (car base price and coefficient) :
// Note: The configuration can be easily changed
const config = {
    price: 0,
    basePrice: 2000000,
    make1: 1.15,
    make2: 1.3,
    make3: 1.8,
    basic: 1.3, //  =>  30%
    complete: 1.5, //  =>  50%
};


// Price calculation 
// Functions to handle calculations

function calculaterPrice(info) {
    // variables
    let price = config.price;

    // + Calculate the price based on the Make chosen by user
    price = carMake(info.make, price);

    // + Calculate the price based on the Year chosen by user
    const year = fixNumbers(info.year);

    // + Calculate year diffrence
    const diffrence = yearDiffrence(year);

    // 3% cheaper for each year
    price = price - ((diffrence * 3) / 100) * price;

    // + Calculate the price based on the level chosen by user
    price = carLevel(info.level, price);
}

// year diffrence

function yearDiffrence(year) {
    //Get the biggest year
    const max = currentYear();
    const diffrence = max - year;
    //The current year's difference is the largest of its kind
    return diffrence;
}


// get the price based on the chosen make 

function carMake(chosenMake, price) {
    // variables for config Properties
    const make = chosenMake;
    const basePrice = config.basePrice;
    const make1 = config.make1;
    const make2 = config.make2;
    const make3 = config.make3;

    //calculation of the base price with the car factor
    switch (make) {
        case "1":
            // 0 = 2000000 * 1.15
            return (price = basePrice * make1);
        case "2":
            // 0 = 2000000 * 1.3
            return (price = basePrice * make2);
        case "3":
            // 0 = 2000000 * 1.8
            return (price = basePrice * make3);
    }
}


//Calculation of the insurance price based on the specified base

function carLevel(chosenLevel, price) {
    const basic = config.basic;
    const complete = config.complete;
    if (chosenLevel == "basic") {
        // 0 = 0 * 1.3 => 30%
        return (price = price * basic);
    } else {
        // 0 = 0 * 1.5 => 50%
        return (price = price * complete);
    }

}


// Display message box (Creates an html element)
//This function is executed to html elements if there is an error

function displayMsg(msg) {
    // create message box
    const messageBox = document.createElement("div");
    messageBox.classList = "error";
    messageBox.innerText = msg;

    // show message error
    form.insertBefore(messageBox, document.querySelector(".form-group"));

    // remove message box error After 5 seconds
    setTimeout(() => {
        document.querySelector(".error").remove();
    }, 5000);
}


// Making the current year and calling the previous years
function currentYear() {
    let curentNowYear = new Date().toLocaleDateString("fa-IR");

    // Slice date
    curentNowYear = curentNowYear.slice(0, 4);

    // get max year
    let maxYear = fixNumbers(curentNowYear);
    // previous years
    lastYears(maxYear);
    return maxYear;
}


// Convert Arabic and Persian string numbers to Gregorian numerals

function fixNumbers(str) {
    // Convert to number
    let persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
    ],
        arabicNumbers = [
            /٠/g,
            /١/g,
            /٢/g,
            /٣/g,
            /٤/g,
            /٥/g,
            /٦/g,
            /٧/g,
            /٨/g,
            /٩/g,
        ];

    //Checking the input type to see if it is a string or not
    if (typeof str === "string") {
        for (var i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }

    // return prometr numbric
    return parseInt(str);
}

//
// Show the last 20 years based on the current year
function lastYears(maxYear) {
    // get min year
    let minYear = maxYear - 20;

    //Create a title for the build year input
    yearMakerOpt("", `- انتخاب -`);

    //Creating titles for internal options (for example, سال 1402)
    for (let i = maxYear; i >= minYear; i--) {
        yearMakerOpt(i, `سال ${i}`);
    }
}


// Making and creating the year of manufacture option

function yearMakerOpt(valueOpt, valueTxt) {
    // access to the select tag
    const tagYearOption = document.querySelector("#year");

    // create option tag
    const optionTag = document.createElement("option");
    optionTag.value = valueOpt;
    optionTag.innerText = valueTxt;

    // append option to the YearOption
    tagYearOption.appendChild(optionTag);
}

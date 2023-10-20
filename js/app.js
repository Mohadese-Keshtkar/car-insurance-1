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
    carFactors: {

        pride: 1.15,
        optima: 1.3,
        porsche: 1.8,
    },
    levelFactors: {

        //  =>  30%
        basic: 1.3,
        //  =>  50%
        complete: 1.5,
    },

    yearFactors: {
        perYear: 0.03,
        //get 20 years
        lastTwentyYears: 20,
    },
};


// Price calculation 
// Functions to handle calculations

function calculaterPrice(info) {
    // new Variables
    let price = config.price;

    // calculate the price based on Choosing a car model
    price *= getCarFactor(info.make);

    // calculate the price based on the year of the car
    const year = fixNumbers(info.year);

    // Calculate the difference between the current year
    // and the year selected by the user
    const diffrence = yearDiffrence(year);

    // Each year is 3% cheaper than the next year
    price -= (diffrence * config.yearFactors.perYear * price);

    // Price calculation is announced based on the level
    price *= getCarLevel(info.level);

    // get price (return)
    return price;
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

function getCarFactor(chosenMake, price) {
    // variables for config Properties
    const make = chosenMake;
    const basePrice = config.basePrice;
    const pride = config.carFactors.pride;
    const optima = config.carFactors.optima;
    const porsche = config.carFactors.porsche;

    //calculation of the base price with the car factor
    switch (make) {
        case "1":
            // 0 = 2000000 * 1.15
            return (price = basePrice * pride);
        case "2":
            // 0 = 2000000 * 1.3
            return (price = basePrice * optima);
        case "3":
            // 0 = 2000000 * 1.8
            return (price = basePrice * porsche);
    }
}


//Calculation of the insurance price based on the specified base

function getCarLevel(chosenLevel, price) {
    const basic = config.levelFactors.basic;
    const complete = config.levelFactors.complete;
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
    let minYear = maxYear - config.lastTwentyYears;

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

    // create a document fragment
    const fragment = document.createDocumentFragment()

    // add option to the fragment
    fragment.appendChild(optionTag)

    // append fragment to the YearOption
    tagYearOption.appendChild(fragment);
}

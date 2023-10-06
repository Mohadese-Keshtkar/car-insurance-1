
function yearsFunction() {

    //Convert string to number

    let
        iranainNumber = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],

        arabicNumber = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],

        fixNumbers = function (str) {

            if (typeof str === 'string') {

                for (let i = 0; i < 10; i++) {

                    str = str.replace(iranainNumber[i], i).replace(arabicNumber[i], i);

                }
            }

            return parseInt(str);
        }



    //get new year
    let curentYear = new Date().toLocaleDateString('fa-IR')

    //Slice year Data
    curentYear = curentYear.slice(0, 4)

    //get max year
    let maxYear = fixNumbers(curentYear)

    console.log(maxYear)


    //get min year
    let minYear = maxYear - 20
    console.log(minYear)
    const selectYear = document.querySelector('#year')

    //create option for loop
    for (let i = maxYear; i >= minYear; i--) {
        // creat tag 
        const tagOption = document.createElement('option')
        tagOption.value = i;
        tagOption.innerText = `سال ${i}`

        //append option tag
        selectYear.appendChild(tagOption)
    }
}

yearsFunction()
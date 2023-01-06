/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */


/*
* Checks if the searchTerm is in the line
@param {string} searchTerm - The word or term we're searching for.
@param {string} line - A line of text
@returns {boolean}
*/
function searchWordIsInLine(searchTerm, text) {
    searchTerm = searchTerm.replace(/[^a-zA-Z]+/g, '');
    let wordList = text.split(" ")

    for (let i=0; i<wordList.length; i++) {
        let word = wordList[i]
        word = word.replace(/[^a-zA-Z]+/g, '');
        if (word.length > 0 && word === searchTerm) {
            return true;
        }
    }

    return false;
}

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    if (typeof searchTerm !== "string") {
        throw "keyWord is not a string";
    }

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    for (let i=0; i<scannedTextObj.length; i++) {
        let book = scannedTextObj[i];

        let title = book["Title"]
        let isbn = book["ISBN"];
        let contentList = book["Content"];

        for (let j=0; j<contentList.length; j++) {
            let content = contentList[j];

            let page = content["Page"];
            let line = content["Line"];
            let text = content["Text"];

            if (searchWordIsInLine(searchTerm, text)) {
                result["Results"].push({
                    "ISBN": isbn,
                    "Page": page,
                    "Line": line
                });
            }
        }

    }
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and I"
            } 
        ] 
    }
]

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

 /** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

////////
// MATT'S UNIT TESTS
////////


/**
Helper function that executes unit tests given the proper params
@param {string} testName - Short description of the unit test
@param {string} searchTerm - searchTerm input for the unit test
@param {JSON} scannedTestObj - scannedTestObj input for the unit test
@param {JSON} expectedResult - expected result of the unit test
*/
function runUnitTest(testName, searchTerm, scannedTestObj, expectedResult) {
    let result = findSearchTermInBooks(searchTerm, scannedTestObj);
    if (JSON.stringify(result) === JSON.stringify(expectedResult)) {
        console.log("PASS:", testName);
    } else {
        console.log("FAIL:", testName);
        console.log("Expected:", expectedResult);
        console.log("Received:", result);
    }
}

/** Check that, given an unkown input, we got an empty output. */
const test3Name = "Test no matches";
const test3SearchTerm = "Now";
const test3Result = {
    "SearchTerm": "Now",
    "Results": []
}
runUnitTest(test3Name, test3SearchTerm, twentyLeaguesIn, test3Result)

/** Check that we return matches, even when the words in the text have punctuation*/
const test4Name = "Test punctuation matches"
const test4SearchTerm = "momentum"
const test4Result = {
    "SearchTerm": "momentum",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
runUnitTest(test4Name, test4SearchTerm, twentyLeaguesIn, test4Result)

/** Check that we return no matches when searching for the empty string*/
const test5Name = "Test empty string search"
const test5SearchTerm = " "
const test5Result = {
    "SearchTerm": " ",
    "Results": []
}
runUnitTest(test5Name, test5SearchTerm, twentyLeaguesIn, test5Result)

/** Check that test runs when we give an input with no books*/
const test6Name = "Test no books input"
const test6SearchTerm = "And"
const test6ScannedTestObj = []
const test6Result = {
    "SearchTerm": "And",
    "Results": []
}
runUnitTest(test6Name, test6SearchTerm, test6ScannedTestObj, test6Result)

/** Check for a word that appears multiple times in same line*/
const test7Name = "Test multiple matches on same line"
const test7SearchTerm = "I"
const test7Result = {
    "SearchTerm": "I",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}
runUnitTest(test7Name, test7SearchTerm, twentyLeaguesIn, test7Result)


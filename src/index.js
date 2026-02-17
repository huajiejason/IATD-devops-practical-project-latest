import readlineSync from "readline-sync";
import { isValidDateString, logSeparated, logWrapped, wrapString } from "./utilities.js";
import { createItemEntry, printInventoryTable } from "./inventoryDisplay.js";

const lineLength = 73;
const mainMenuOptions = ["View current inventory", "Log inventory change", "EXIT"];
const invChangeMenuOptions = ["Add/remove stock for existing item", "Add stock for new item"];
//const invChange = 0;

let itemCategories = ["Food", "Clothing", "Electronics"];
let inventoryItems = [
    {name: "Peaches", category: "Food", amount: 55, restocked: "15/05/2024"},
    {name: "Apples", category: "Food", amount: 17, restocked: "07/01/2024"},
    {name: "Jackets", category: "Clothing", amount: 25, restocked: "22/09/2024"},
    {name: "Pants", category: "Clothing", amount: 103, restocked: "19/09/2024"},
    {name: "AMD Ryzen 5 7500f", category: "Electronics", amount: 4, restocked: "12/03/2023"},
    {name: "Cat. 5 Network Cable 20m", category: "Electronics", amount: 13, restocked: "10/10/2024"},
];

function main() {
    let input = "";

    do {
        console.clear();
        logSeparated("MENU", lineLength);
        input = readlineSync.keyInSelect(mainMenuOptions, "Please select an action to continue", {cancel: false});

        switch (input) {
            case 0:
            console.clear();
            logSeparated("Current Schedule", lineLength);
            printScheduleTable(flights);
            readlineSync.keyInPause(wrapString("Press q to return to main menu..."), {limit: ["q"], guide: false});
            console.clear();
            break;
        case 1: {
            console.clear();
            logSeparated("Update Schedule", lineLength);
            const choice = readlineSync.keyInSelect(scheduleChangeMenuOptions, "Please select an action to continue");
            console.clear();
            logSeparated("Change Flight Date", lineLength);
            switch (choice) {
                case 0: {
                    let flightId = "";
                    let flightIndex = -1;
                    flightId = flightId;
                    do {
                        flightId = readlineSync.question(wrapString("Enter the id of the flight to change the date for: "));
                        for (let i = 0; i < flights.length; i++) {
                            if (flights[i].id.toLowerCase() === flightId.toLowerCase()) {
                                flightIndex = i;
                                break;
                            }
                        }
                        if (flightIndex < 0) {
                            logWrapped(`ERROR: Flight ID ${flightId} not found. Please enter the ID of a flight already tracked by this system.`);
                        } else if (flightIndex < 0);
                    } while (flightIndex < 0);

                    logWrapped(`The current departure date for ${flights[flightIndex].id} is ${flights[flightIndex].date}`);

                    const date = enterFlightDate();
                    flights[flightIndex].date = date;
                    
                    logWrapped(`Flight successfully updated!`);
                    readlineSync.keyInPause(wrapString("Press q to return to main menu..."), {limit: ["q"], guide: false});
                    break;
                }
                case 1: {
                    console.clear();
                    logSeparated("Add New Flight", lineLength);

                    let airlineIndex = 0;
                    let cachedLength = 0;
                    do {
                        airlineIndex = readlineSync.keyInSelect([...airlines, "Add New Airline"], "Select an existing airline or add a new one ", {cancel: false});
                        cachedLength = airlines.length;
                        if (airlineIndex === airlines.length) {
                            let isValid = false;
                            let oldLength = airlines.length;
                            do {
                                airlines = addAirline(readlineSync.question(wrapString("Enter the name of the airline to add: ")), airlines);
                                isValid = oldLength !== airlines.length;
                            } while (!isValid);
                        }
                    } while (airlineIndex === cachedLength);

                    const origin = readlineSync.question(wrapString("Enter the location the flight will depart from: "));
                    const destination = readlineSync.question(wrapString("Enter the destination of the flight: "));

                    const date = enterFlightDate();

                    const flight = {id: generateFlightId(airlines[airlineIndex]), airline: airlines[airlineIndex], origin, destination, date};
                    flights.push(flight);

                    logWrapped(`Successfully added flight ${flight.id} with the following details:`);
                    console.log(createFlightEntry(flight));
                    readlineSync.keyInPause(wrapString("Press q to return to main menu..."), {limit: ["q"], guide: false});
                    break;
                }
                case 2:
                    break;
            }
            console.clear();
            break;
        }
        case 2:
            break;
    }           
} while (input !== 2);

    console.clear();
    logWrapped("EXITING...", lineLength);
}

function enterStockChangeDate() {
    let date = "";
    let isValid = false;
    do {
        date = readlineSync.question(wrapString("Enter the date of this stock change using the format DD/MM/YYYY: "));
        isValid = isValidDateString(date);
        if (!isValid) logWrapped("ERROR: The provided date does not use the correct format or is not a real date, please re-enter the date.");
    } while (!isValid);

    return date;
}

/**
 * Returns true and adds the specified category to the list of categories if it is not a blank/empty string or the name of an existing category. Returns false otherwise.
 * 
 * @param {string} category the name of the category to add
 */
function addCategory(category) {
    if (category.trim() === "") {
        logWrapped("ERROR: Category cannot be blank.");
        return false;
    }

    let existing = false;

    itemCategories.forEach(cat => {
        if (cat === category) {
            logWrapped("ERROR: Category already exists.");
            existing = true;
        }
    });

    if (existing) return false;

    itemCategories.push(category);
    logWrapped(`Category ${category} successfully added.`);
    return true;
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}
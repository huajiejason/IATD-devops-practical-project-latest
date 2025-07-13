import { wrapString } from "./utilities.js";

const columnDimensions = [20, 20, 6, 14];
const columnHeadings = ["Item Name", "Category", "Amount", "Last Restocked"];

/**
 * Returns a formatted string containing the table header for displaying the current inventory.
 */
export function createTableHeader() {
    let header = "|";
    for (let i = 0; i < columnHeadings.length; i++) {
        header = header.concat(" ", columnHeadings[i]);

        const diff = columnDimensions[i] - columnHeadings[i].length;
        if (diff > 0) {
            header = header.concat(" ".repeat(diff), " |");
        } else {
            header = header.concat(" |");
        }
    }

    header = header.concat("\n", "=".repeat(header.length));

    return header;
}

/**
 * Returns a formatted string containing the information for the provided item.
 * 
 * @param {{name: string, category: string, amount: number, restocked: string}} item the item to create an entry for
 */
export function createItemEntry(item) {
    const itemName = wrapString(item.name, columnDimensions[0]).split("\n");
    const category = wrapString(item.category, columnDimensions[1]).split("\n");
    const amount = wrapString(item.amount.toString(), columnDimensions[2]).split("\n");

    const maxRows = Math.max(itemName.length, category.length, amount.length);

    let lines = [""];

    for (let i = 0; i < maxRows; i++) {
        lines[i] = "| ";
        if (itemName.length > i) {
            lines[i] = lines[i].concat(itemName[i], " ".repeat(columnDimensions[0] - itemName[i].length), " | ");
        } else {
            lines[i] = lines[i].concat(" ".repeat(columnDimensions[0]), " | ");
        }
        if (category.length > i) {
            lines[i] = lines[i].concat(category[i], " ".repeat(columnDimensions[1] - category[i].length), " | ");
        } else {
            lines[i] = lines[i].concat(" ".repeat(columnDimensions[1]), " | ");
        }
        if (amount.length > i) {
            lines[i] = lines[i].concat(amount[i], " ".repeat(columnDimensions[2] - amount[i].length), " | ");
        } else {
            lines[i] = lines[i].concat(" ".repeat(columnDimensions[2]), " | ");
        }
        if (i === 0) {
            lines[i] = lines[i].concat(item.restocked, " ".repeat(columnDimensions[3] - item.restocked.length), " |");
        } else {
            lines[i] = lines[i].concat(" ".repeat(columnDimensions[3]), " |");
        }
    }

    return lines.join("\n").concat("\n", "-".repeat(lines[0].length));
}

/**
 * Prints a table displaying the current content of the inventory.
 * 
 * @param {{name: string, category: string, amount: number, restocked: string}[]} items the items in inventory
 */
export function printInventoryTable(items) {
    console.log(createTableHeader());
    items.forEach(item => {
        console.log(createItemEntry(item));
    });
}
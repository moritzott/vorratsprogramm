// import { Produkt } from './Produkt.js'
let stock = [];
let stockFoods = [];
let stockDrinks = [];
let stockHygiene = [];
let stockPharmacy = [];
let stockFireProtection = [];
let stockLuggage = [];
let stockTechStack = [];
let stockElse = [];


/* This main.js File handles the basic operations
    of the page.
*/

function formatReadableDate(rawDate) {
    // from YYYY-MM-DD to DD.MM.YYYY
    // nur formatieren, wenn auch ein Datum gesetzt wurde, 
    // wenn keines angegeben, dann auch "" nur zurückgeben!
    if (rawDate.length > 0){
        const year = rawDate.slice(0, 4);
        const month = rawDate.slice(5, 7);
        const day = rawDate.slice(8); // 'til end

        const germanDate = `${day}.${month}.${year}`;
        
        return germanDate;
    } else {
        return "";
    }
    
}

// check if there is local storage
function doesLocalStorageExist() {
    if(localStorage.length > 0){
        return true;
    } else {
        return false;
    }
}

function generateRandomId(){
    // generate a random integer string to be used as an ID between 1 and 1 000 000
    // mit oberem Limit, weil wahrscheinlich kein privater. Vorsorge-Keller mehr als 1 mio. Produkte
    // lagert
    return (Math.floor(Math.random() * (1000001 - 1) ) + 1).toString();
}

function doesIdAlreadyExist(Id){
    // if the Id is null, the Id is not already used
    if(localStorage.getItem(Id) == null){
        return false;
    } else {
        return true;
    }
}

function generateUnusedId() {
    let newId = generateRandomId();
    // check if it exists, if true, then seet new random integer ID as long as it a new
    // one which is not used
    while (doesIdAlreadyExist(newId)) {
        newId = generateRandomId();
    }
    return newId;
}

// Funktion, um das Formular zur Produktaufnahme,
// nach der Aufnahme wieder als Blanko-Form zu haben.
// Die Felder müssen geleert werden.
function resetFormFields() {
    fieldIDs = ["produktname", "produktmenge", "produktmhd"];
    for (let i = 0; i < fieldIDs.length; i++) {
        document.getElementById(fieldIDs[i]).value = "";
    }
}

function readNewProductInformation() {
    // read the data from the input form
    const name = document.getElementById('produktname').value;

    // get the select 'KAtegorie' element
    const selectedCategory = document.getElementById('produktkategorie');
    // And get the selected option:
    const kategorie = selectedCategory.options[selectedCategory.selectedIndex].value;
    
    const menge = document.getElementById('produktmenge').value;

    // get the selected 'produktmengeneinheit' Element:
    const selectedAmountMeasure = document.getElementById('produktmengeneinheit');
    // And get the selected option:
    const mengeneinheit = selectedAmountMeasure.options[selectedAmountMeasure.selectedIndex].value;

    const mhd = document.getElementById('produktmhd').value;

    // return values as an object
    return {
        name,
        kategorie,
        menge,
        mengeneinheit,
        mhd
    };

}

// function to clear any stock variable
function clearStockVariable(name){
    // clear stock variable:
    while (name.length > 0) {
        name.pop();
    }
}

function readLocalStorage() {
    // read local storage an write it to the variable 'stock'
    Object.keys(localStorage).forEach((key) => {
        // Schlüssel plus die Angaben zurück rechnen(parse) und an Array 'Stock' anhängen
        let productKey = key;
        let productDescription = JSON.parse(localStorage.getItem(key));
        let product = {
            productKey,
            productDescription
        };
        stock.push(product);
    });

}

// function to sort stock by product name:
function sortStockAlphabetic() {
    console.log("Enter sort function");
    // stock ist ein Array von Objekten; der Name ist pro Objekt: productDescription.name
    stock.sort(function (a, b) {
        let x = a.productDescription.name.toLowerCase();
        let y = b.productDescription.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    // console.table(stock);
}

function checkRequiredForInput() {
    const name = document.getElementById("produktname").value;
    if (name === ""){
        return false;
    } else {
        return true;
    }
}

function addNewProductToStock() {
    console.log('Enter function to add new Product to Stock...');
    // check if the name field is set
    if (checkRequiredForInput()) {
        console.log("Filled in alle Infos");
        // gather all information
        const enteredProductInfo = readNewProductInformation();

        // create a new Produkt Object with these product Informations
        const product = new Produkt(
            enteredProductInfo.name,
            enteredProductInfo.kategorie,
            enteredProductInfo.menge,
            enteredProductInfo.mengeneinheit,
            enteredProductInfo.mhd
        );
        
        // generate a unused ID
        let productId = generateUnusedId();

        // write Product (jsonified) to local storage
        localStorage.setItem(productId, JSON.stringify(product));

        // reload stock variable from storage (maybe change this functionality)
        clearStockVariable(stock);
        if (doesLocalStorageExist()) {
            readLocalStorage();
        }

        // close the Add Product Modal
        closeAddModal();

        // clear / reset the form input Modal
        resetFormFields();

        // open notification modal 'New Product Added'
        openProductAddedNotification();
    } else {
        console.log("Not filled in all infos");
        openPleaseFillInAllInfosModal();
    }
    
}




function clearTable(id) {
    // clear table 
    const content = document.getElementById(id);
    while (content.children.length > 0) {
        content.removeChild(content.childNodes[0]);
    }
    
}

/* function createTableHeader(){
    const headerRow = document.createElement('tr');

    // create table headers
    // const cellIdHeader = document.createElement('th');
    const cellNameHeader = document.createElement('th');
    // const cellCategoryHeader = document.createElement('th');
    const cellAmountHeader = document.createElement('th');
    // const cellAmoundMeasureHeader = document.createElement('th');
    const cellMhdHeader = document.createElement('th');
    const cellActionHeader = document.createElement('th');

    // table header content
    // const textIdHeader = document.createTextNode("ID");
    const textNameHeader = document.createTextNode("Name");
    // const textCategoyHeader = document.createTextNode("Kategorie");
    const textAmountHeader = document.createTextNode("Menge");
    // const textAmoundMeasureHeader = document.createTextNode("Einheit");
    const textMhdHeader = document.createTextNode("MHD");
    const textActionHeader = document.createTextNode("Aktion");

    // append table header content to cells
    // cellIdHeader.appendChild(textIdHeader);
    cellNameHeader.appendChild(textNameHeader);
    // cellCategoryHeader.appendChild(textCategoyHeader);
    cellAmountHeader.appendChild(textAmountHeader);
    // cellAmoundMeasureHeader.appendChild(textAmoundMeasureHeader);
    cellMhdHeader.appendChild(textMhdHeader);
    cellActionHeader.appendChild(textActionHeader);

    // append header cells to header row;
    // headerRow.appendChild(cellIdHeader);
    headerRow.appendChild(cellNameHeader);
    // headerRow.appendChild(cellCategoryHeader);
    headerRow.appendChild(cellAmountHeader);
    // headerRow.appendChild(cellAmoundMeasureHeader);
    headerRow.appendChild(cellMhdHeader);
    headerRow.appendChild(cellActionHeader);

    // append header ro to table:
    // document.getElementById('stockTable').appendChild(headerRow);
} */

function deleteProduct() {
    const id = document.getElementById("deleteConfirmButton").getAttribute("deleteProductWithId");
    
    // löschen
    localStorage.removeItem(id);
    
    // attribut von Button wieder entfernen
    document.getElementById("deleteConfirmButton").removeAttribute("deleteProductWithId");

    // Bestätigungsfenster schließen
    closeDeleteProductConfirmation();

    // Warenübersicht schließen
    closeStockModal();

    // und neu öffnen und neue Warenliste laden
    openStockModal();

    // und darüber: öffne "Deleted Notification":
    openDeletedNotification();
}

function deleteProductConfirmation(event) {
    const id = event.target.getAttribute("productId");
    console.log(`CONFIRM DELETE ${id}`);

    document.getElementById("deleteConfirmButton").setAttribute("deleteProductWithId", id)

    // open window to confirm to delete the product
    openDeleteProductConfirmation(id);
}

// build new updated Product
function buildNewUpdatedProduct() {

    // nehme neuen Namen
    const newName = document.getElementById("updateProduktname").value;

    // neue Kategorie (erst Auswahlfeld schnappen!)
    const newSelectedCategory = document.getElementById('updateProduktkategorie');
    // And get the selected option:
    const newKategorie = newSelectedCategory.options[newSelectedCategory.selectedIndex].value;
    
    const newMenge = document.getElementById('updateProduktmenge').value;

    // get the new selected 'produktmengeneinheit' Element:
    const newSelectedAmountMeasure = document.getElementById('updateProduktmengeneinheit');
    // And get the selected option:
    const newMengeneinheit = newSelectedAmountMeasure.options[newSelectedAmountMeasure.selectedIndex].value;

    const newMhd = document.getElementById('updateProduktmhd').value;

    // erstelle ein neues Objekt der KLasse Produkt und liefere das zurück
    const updatedProduct = new Produkt(newName, newKategorie, newMenge, newMengeneinheit, newMhd);

    return updatedProduct;
    
}

// updateProduct function
function updateProduct() {
    // wird ausgeführt, wenn der Update-Button gedrückt wurde im Formularfeld

    // schnappe ID von dem Span Element und wandle nach Integer um:
    const id = parseInt(document.getElementById("productIdToBeUpdated").innerText);

    // erstelle neues Produkt mit den neuen Daten und speichere es in einer Variable:
    const updatedProduct = buildNewUpdatedProduct();

    // speichere es im localStorage mit der alten ID und den neuen Werten:
    localStorage.setItem(id, JSON.stringify(updatedProduct));

    // schließe das Update-Fenster
    closeUpdateModal();

    // öffne das Bestands-Fenster (wird neu geladen)
    openStockModal();

    // öffne darüber ein neues Fenster (mit dem Hinweis: Produkt gespeichert.)
    openProductHasBeenUpdatedNotification();
}


// gather informatio for update modal and fill in the old informaitons which
// can be updated
function getInformationForUpdate(event) {
    const id = event.target.getAttribute("productId");
    console.log(`UPDATE ${id}`);

    // open update window:
    openUpdateModal();

    // sammle bisherige Infos zum Produkt aus dem lokalen Speicher:
    let productInformation = JSON.parse(localStorage.getItem(id));

    // schreibe bisherige Informationen in das Formularfeld zum Ändern
    document.getElementById("productIdToBeUpdated").innerText = id;
    document.getElementById("updateProduktname").value = productInformation.name;
    document.getElementById("updateProduktkategorie").value = productInformation.kategorie;
    document.getElementById("updateProduktmenge").value = productInformation.menge;
    document.getElementById("updateProduktmengeneinheit").value = productInformation.mengeneinheit;
    document.getElementById("updateProduktmhd").value = productInformation.mhd;

}

function stockToSubStock() {
    for (let index = 0; index < stock.length; index++) {
        const element = stock[index];
        // in verschiedene SubStocks hinzufügen
        if (element.productDescription.kategorie == "Lebensmittel") {
            stockFoods.push(element);
        } else if (element.productDescription.kategorie == "Getränke") {
            stockDrinks.push(element);
        } else if (element.productDescription.kategorie == "Hygiene") {
            stockHygiene.push(element);
        } else if (element.productDescription.kategorie == "Hausapotheke") {
            stockPharmacy.push(element);
        } else if (element.productDescription.kategorie == "Brandschutz") {
            stockFireProtection.push(element);
        } else if (element.productDescription.kategorie == "Notgepäck") {
            stockLuggage.push(element);
        } else if (element.productDescription.kategorie == "Technik") {
            stockTechStack.push(element);
        } else if (element.productDescription.kategorie == "Sonstiges") {
            stockElse.push(element);
        } else {
            console.log("Category error.");
        }
        
    }
}


function buildTables(stockArray) {
    for (let index = 0; index < stockArray.length; index++) {
        const currentStock = stockArray[index];

        // check if stock is empty, then leave blank on table:
        if (currentStock.length == 0){
            // nichts machen
        } else {
            // the div element to put content into:
            const contentDiv = document.getElementById("stockContent");

            // write heading for table:
            const heading = document.createElement("h3");
            // take the first element and take the category as heading
            const headingContent = document.createTextNode(currentStock[0].productDescription.kategorie);

            // append heading Content to heading:
            heading.appendChild(headingContent)

            // append heading to div element:
            contentDiv.appendChild(heading);

            // create table element:
            const table = document.createElement("table");
            table.classList.add("w3-table-all");

            // create table header row:
            const headerRow = document.createElement("tr");

            // create header row cells:
            const cellNameHeader = document.createElement("th");
            const cellAmountHeader = document.createElement("th");
            const cellMhdHeader = document.createElement("th");
            const cellActionHeader = document.createElement("th");

            // write contents of table headers:
            const cellNameHeaderContent = document.createTextNode("Name");
            const cellAmountHeaderContent = document.createTextNode("Menge");
            const cellMhdHeaderContent = document.createTextNode("MHD");
            const cellActionHeaderContent = document.createTextNode("Aktion");

            // append header contents to header cells
            cellNameHeader.appendChild(cellNameHeaderContent);
            cellAmountHeader.appendChild(cellAmountHeaderContent);
            cellMhdHeader.appendChild(cellMhdHeaderContent);
            cellActionHeader.appendChild(cellActionHeaderContent);

            // append header cells to header row:
            headerRow.appendChild(cellNameHeader);
            headerRow.appendChild(cellAmountHeader);
            headerRow.appendChild(cellMhdHeader);
            headerRow.appendChild(cellActionHeader);

            // append header row to table:
            table.appendChild(headerRow);

            // now: for every item in the stock --> create a row with cells

            for (let item = 0; item < currentStock.length; item++) {
                const product = currentStock[item];
                
                // create a new row:
                const productRow = document.createElement("tr");

                // create product cells
                const cellName = document.createElement("td");
                const cellAmount = document.createElement("td");
                const cellMhd = document.createElement('td');
                const cellAction = document.createElement('td');

                // create cells contents [Menge und Maß in eines!], Buttons nicht vergessen!
                const cellNameContent = document.createTextNode(product.productDescription.name);
                const cellAmountContent = document.createTextNode(
                    product.productDescription.menge.toString() + " " + product.productDescription.mengeneinheit
                )
                const cellMhdContent = document.createTextNode(formatReadableDate(product.productDescription.mhd));

                // for the action cell: two buttons (one for UPDATE, one for DELETE):
                const updateButton = document.createElement("button");
                const deleteButton = document.createElement("button");
                updateButton.classList.add("w3-button");
                updateButton.classList.add("w3-pale-yellow");
                deleteButton.classList.add("w3-button");
                deleteButton.classList.add("w3-pale-red");
                // add attribute with IDs to the buttons (for identification)
                updateButton.setAttribute("productId", product.productKey);
                deleteButton.setAttribute("productId", product.productKey);
                
                // add EventListener to thesde two buttons:
                updateButton.addEventListener("click", getInformationForUpdate);
                deleteButton.addEventListener("click", deleteProductConfirmation);

                // create text content for the two buttons:
                const updateButtonContent = document.createTextNode("✏");
                const deleteButtonContent = document.createTextNode("✖");

                // append text content to the buttons:
                updateButton.appendChild(updateButtonContent);
                deleteButton.appendChild(deleteButtonContent);


                // append cell contents to product cells
                cellName.appendChild(cellNameContent);
                cellAmount.appendChild(cellAmountContent);
                cellMhd.appendChild(cellMhdContent);
                cellAction.appendChild(updateButton);
                cellAction.appendChild(deleteButton);

                // append product cells to product row
                productRow.appendChild(cellName);
                productRow.appendChild(cellAmount);
                productRow.appendChild(cellMhd);
                productRow.appendChild(cellAction);


                // append new row to table:
                table.appendChild(productRow);
            }

            // add the table to the div:
            contentDiv.appendChild(table);

        }
        
    }
}

function writeStockToTable() {

    
    clearTable('stockContent');

    // clear all stock variables
    clearStockVariable(stock);
    clearStockVariable(stockFoods);
    clearStockVariable(stockDrinks);
    clearStockVariable(stockHygiene);
    clearStockVariable(stockPharmacy);
    clearStockVariable(stockFireProtection);
    clearStockVariable(stockLuggage);
    clearStockVariable(stockTechStack);
    clearStockVariable(stockElse);

    // load from local Storage:
    if (doesLocalStorageExist()) {
        readLocalStorage();

        // sort stock alphabetic:
        sortStockAlphabetic();

        // call function to transfer products to stockSubVariables (Food, Drinks , etc.)
        stockToSubStock();

        // build tables...
        buildTables([stockFoods, 
            stockDrinks,
            stockHygiene,
            stockPharmacy,
            stockFireProtection,
            stockLuggage,
            stockTechStack,
            stockElse
        ]);

    } else {
        // ausgeben, dass keine Produkte im Vorrat sind
        const emptyStockParagraph = document.createElement("p");
        emptyStockParagraph.classList.add("w3-center");
        const emptyStockMessage = document.createTextNode("Keine Produkte im Vorrat!");
        emptyStockParagraph.appendChild(emptyStockMessage);
        document.getElementById("stockContent").appendChild(emptyStockParagraph);
    }
}



function getCriticalProductsFromStock() {
    const criticalArray = [];
    const today = new Date();

    // filter stock Variable, solche, die vom heutigen DAtum max 60 Tage entfernt (MHD) sind in neuen Array übertragne
    for (let index = 0; index < stock.length; index++) {
        const product = stock[index];

        const mhd = product.productDescription.mhd;
        const mhdDate = new Date(mhd);

        const diffInSeconds = mhdDate.getTime() - today.getTime();

        const diffInDays = diffInSeconds / (1000 * 60 * 60 * 24);

        if (diffInDays < 60) {
            // Produkt in neuen Array übertragen:
            criticalArray.push(product);
        }
    }
    return criticalArray;
}

function buildCriticalTables(stockArray) {
    let itemsCounter = 0;
    for (let index = 0; index < stockArray.length; index++) {
        const currentStock = stockArray[index];

        if (currentStock.length == 0) {
            // do nothing
        } else {

            // the div element to put content into:
            const contentDiv = document.getElementById("criticalProductsInStock");

            // write heading for table:
            const heading = document.createElement("h3");
            // take the first element and take the category as heading
            const headingContent = document.createTextNode(currentStock[0].productDescription.kategorie);

            // append heading Content to heading:
            heading.appendChild(headingContent)

            // append heading to div element:
            contentDiv.appendChild(heading);

            // create table element:
            const table = document.createElement("table");
            table.classList.add("w3-table-all");

            // create table header row:
            const headerRow = document.createElement("tr");

            // create header row cells:
            const cellNameHeader = document.createElement("th");
            const cellAmountHeader = document.createElement("th");
            const cellMhdHeader = document.createElement("th");

            // write contents of table headers:
            const cellNameHeaderContent = document.createTextNode("Name");
            const cellAmountHeaderContent = document.createTextNode("Menge");
            const cellMhdHeaderContent = document.createTextNode("MHD");


            // append header contents to header cells
            cellNameHeader.appendChild(cellNameHeaderContent);
            cellAmountHeader.appendChild(cellAmountHeaderContent);
            cellMhdHeader.appendChild(cellMhdHeaderContent);


            // append header cells to header row:
            headerRow.appendChild(cellNameHeader);
            headerRow.appendChild(cellAmountHeader);
            headerRow.appendChild(cellMhdHeader);
          

            // append header row to table:
            table.appendChild(headerRow);

            // now: for every item in the stock --> create a row with cells
            const today = new Date();

            for (let item = 0; item < currentStock.length; item++) {
                itemsCounter++;
                const product = currentStock[item];
                
                // create a new row:
                const productRow = document.createElement("tr");

                // Produkt läuft bald ab? Oder schon abgelaufen? Unterschiedlich farbig machen!
                
                const mhdDate = new Date(product.productDescription.mhd);
                const diffInSeconds = mhdDate.getTime() - today.getTime();
                const diffInDays = diffInSeconds / (1000 * 60 * 60 * 24);

                if (diffInDays <= 0) {
                    // roter Hintergrund
                    productRow.classList.add("w3-pale-red");
                } else {
                    productRow.classList.add("w3-pale-yellow");
                }

                // create product cells
                const cellName = document.createElement("td");
                const cellAmount = document.createElement("td");
                const cellMhd = document.createElement('td');
                

                // create cells contents [Menge und Maß in eines!], Buttons nicht vergessen!
                const cellNameContent = document.createTextNode(product.productDescription.name);
                const cellAmountContent = document.createTextNode(
                    product.productDescription.menge.toString() + " " + product.productDescription.mengeneinheit
                )
                const cellMhdContent = document.createTextNode(formatReadableDate(product.productDescription.mhd));

                // append cell contents to product cells
                cellName.appendChild(cellNameContent);
                cellAmount.appendChild(cellAmountContent);
                cellMhd.appendChild(cellMhdContent);


                // append product cells to product row
                productRow.appendChild(cellName);
                productRow.appendChild(cellAmount);
                productRow.appendChild(cellMhd);



                // append new row to table:
                table.appendChild(productRow);
            }

            // add the table to the div:
            contentDiv.appendChild(table);

        }
        
    }
    // wenn gar keine Produkte aufgelistet werden:

    // if (itemsCounter === 0) {
    //     console.log("Hello");
    //     console.log(itemsCounter);
    //     // keine kritischen Produkte im Vorrat
    //     clearTable("infoParagraphDiv");

    //     // schreibe kurze Info, um was es geht in der Tabelle
    //     const infoParagraph = document.createElement("p");
    //     const infoParagraphMessage = document.createTextNode(
    //         "Es befinden sich keine abgelaufenen oder bald ablaufende Produkte in Ihrem Vorrat!"
    //     );
    //     infoParagraph.appendChild(infoParagraphMessage);
    //     document.getElementById("infoParagraphDiv").appendChild(infoParagraph);
        
    // }
    
}

function writeCriticalStockTable() {
    console.log("Enter writing critical stock table");
    // erstelle Tabelle mit kritischen Produkten,
    // die bald ablaufen werden.
    
    // lösche bisherige Tabelle im Modal:
    clearTable("criticalProductsInStock");

    // clear all stock variables
    clearStockVariable(stock);
    clearStockVariable(stockFoods);
    clearStockVariable(stockDrinks);
    clearStockVariable(stockHygiene);
    clearStockVariable(stockPharmacy);
    clearStockVariable(stockFireProtection);
    clearStockVariable(stockLuggage);
    clearStockVariable(stockTechStack);
    clearStockVariable(stockElse);

    // falls lokaler Speicher Daten enthält, laden; falls nicht: dieses anzeigen:
    if (doesLocalStorageExist()) {
        readLocalStorage();

        // jetzt in der Variablen Stock alle Elemente entfernen, 
        // die länger als zwei Monate haltbar sind
        let criticalProductsArray = getCriticalProductsFromStock();

        // stock leeren
        clearStockVariable(stock);

        // dann Elemente von criticalProductsArray in stock schreiben (wir wollen mit Stock arbeiten):
        stock.push(...criticalProductsArray);

        // criticalProductsArray löschen
        clearStockVariable(criticalProductsArray)

        // sort stock alphabetic:
        sortStockAlphabetic();

        // call function to transfer products to stockSubVariables (Food, Drinks , etc.)
        stockToSubStock();



        // build tables...
        buildCriticalTables([stockFoods, 
            stockDrinks,
            stockHygiene,
            stockPharmacy,
            stockFireProtection,
            stockLuggage,
            stockTechStack,
            stockElse
        ]);

        
    } else {
        // ausgeben, dass keine Produkte im Vorrat sind
        clearTable("criticalProductsInStock");
        const emptyStockParagraph = document.createElement("p");
        emptyStockParagraph.classList.add("w3-center");
        emptyStockParagraph.classList.add("w3-pale-green");
        emptyStockParagraph.classList.add("w3-padding");
        const emptyStockMessage = document.createTextNode("Keine kritischen Produkte gefunden!");
        emptyStockParagraph.appendChild(emptyStockMessage);
        document.getElementById("criticalProductsInStock").appendChild(emptyStockParagraph);
    }
    
    const criticalStockTable = document.getElementById("criticalProductsInStock");
    
    if (criticalStockTable.childElementCount === 0) {
        // ausgeben, dass keine Produkte kritisch sind
        clearTable("criticalProductsInStock");
        const emptyStockParagraph = document.createElement("p");
        emptyStockParagraph.classList.add("w3-center");
        emptyStockParagraph.classList.add("w3-pale-green");
        emptyStockParagraph.classList.add("w3-padding");
        const emptyStockMessage = document.createTextNode("Keine kritischen Produkte gefunden!");
        emptyStockParagraph.appendChild(emptyStockMessage);
        document.getElementById("criticalProductsInStock").appendChild(emptyStockParagraph);
    }



}

function initLocalStorage() {
    if (doesLocalStorageExist()) {
        readLocalStorage();
    }
}


// erase stock:
function eraseStock() {
    clearStockVariable(stock); // und auch andere Stock variablen, falls sie vorkommen!
    localStorage.clear();
    // close eraseStockConfirmationWindow
    closeEraseStockConfirmation();

    // open deleted notification
    openStockDeletedNotificaiton();
}

function openInfoModal(){
    document.getElementById('infoModal').style.display = 'block';
}

function closeInfoModal(){
    document.getElementById('infoModal').style.display = 'none';
}

function openAddModal(){
    document.getElementById('addModal').style.display = 'block';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none'
}

function openStockModal() {
    document.getElementById('stockModal').style.display = 'block';
    // console.log(stock);
    // write stock to a table:
    writeStockToTable();
}

function closeStockModal() {
    document.getElementById('stockModal').style.display = 'none';
}

function openCriticalTable() {
    writeCriticalStockTable();
    document.getElementById("criticalModal").style.display = "block";
    

}

function closeCriticalTable() {
    document.getElementById("criticalModal").style.display = "none";
    
}

function openProductAddedNotification() {
    document.getElementById('productAddedNotification').style.display = "block";
}

function closeProductAddedNotification() {
    document.getElementById('productAddedNotification').style.display = "none";
}

function openEraseStockConfirmation() {
    document.getElementById('eraseStockConfirmation').style.display = "block";
}

function closeEraseStockConfirmation() {
    document.getElementById("eraseStockConfirmation").style.display = "none";
}

function openDeleteProductConfirmation(id) {
    // Produktdetails vor Löschung ausgeben:
    const product = JSON.parse(localStorage.getItem(id));
    const productName = product.name;
    const productAmount = product.menge + product.mengeneinheit;
    const productMhd = formatReadableDate(product.mhd);
    let productPrompt = "";
    if (productMhd === "" && product.menge === ""){
        productPrompt = `${productName}.`;
    } else if (productMhd === "") {
        productPrompt = `${productName}, ${productAmount}.`;
    } else  {
        productPrompt = `${productName}, ${productAmount}, haltbar bis ${productMhd}`;
    }


    // productPrompt in ConfirmationModal schreiben:
    document.getElementById("productToBeDeleted").innerText = productPrompt;

    document.getElementById("confirmDeleteModal").style.display = "block";

}

function closeDeleteProductConfirmation() {
    // productPrompt Feld wieder zurücksetzen:
    document.getElementById("productToBeDeleted").innerText = "";
    document.getElementById("confirmDeleteModal").style.display = "none";
}

function openDeletedNotification() {
    document.getElementById("productDeletedNotification").style.display = "block";
}

function closeDeletedNotification() {
    document.getElementById("productDeletedNotification").style.display = "none";
}

function openStockDeletedNotificaiton() {
    document.getElementById("stockDeletedNotification").style.display = "block";
}

function closeStockDeletedNotification() {
    document.getElementById("stockDeletedNotification").style.display = "none";
}

function openUpdateModal() {
    document.getElementById("updateModal").style.display = "block";
}

function closeUpdateModal() {
    document.getElementById("updateModal").style.display = "none";
}

function openProductHasBeenUpdatedNotification() {
    document.getElementById("productHasBeenUpdated").style.display = "block";
}

function closeProductHasBeenUpdatedNotification() {
    document.getElementById("productHasBeenUpdated").style.display = "none";
}

function openTipsModal() {
    document.getElementById("TipsModal").style.display = "block";
}

function closeTipsModal() {
    document.getElementById("TipsModal").style.display = "none";
}

function openPleaseFillInAllInfosModal() {
    console.log("Entered");
    // document.getElementById('addModal').style.display = 'none'
    document.getElementById("pleaseFillInAllInfosModal").style.display = "block";
}

function closePleaseFillInAllInfosModal() {
    console.log("close...");
    document.getElementById("pleaseFillInAllInfosModal").style.display = "none";
}

function addHandlers(){
    // log for debugging:
    console.log("Page loaded...");
    console.log("Enter Function addHandlers()");

    // open info Modal
    document.getElementById('showInfoButton').addEventListener('click', openInfoModal);
    
    // close info Modal
    document.getElementById('closeInfoButtonTop').addEventListener('click', closeInfoModal);
    document.getElementById('closeInfoButtonBottom').addEventListener('click', closeInfoModal);

    // open Add Modal
    document.getElementById('openAddModalButton').addEventListener('click', openAddModal);

    // close Add Modal
    document.getElementById('closeAddModalTop').addEventListener('click', closeAddModal);
    document.getElementById('closeAddModalBottom').addEventListener('click', closeAddModal);

    // Add Product to stock Button
    document.getElementById('addProductToStockButton').addEventListener('click', addNewProductToStock);

    // Open Show Stock Modal
    document.getElementById('openStockModalButton').addEventListener('click', openStockModal);

    // close Stock Modal
    document.getElementById('closeStockModalTop').addEventListener('click', closeStockModal);
    document.getElementById('closeStockModalBottom').addEventListener('click', closeStockModal);

    // close productAddedNotification
    document.getElementById('closeProductAddedNotification').addEventListener('click', closeProductAddedNotification);

    // open eraseStockConfirmation
    document.getElementById('eraseStockButton').addEventListener("click", openEraseStockConfirmation);

    // close and do not confirm eraseStockConfirmation
    document.getElementById("closeEraseStockConfirmation").addEventListener("click", closeEraseStockConfirmation);

    // eraseStockConfirmationButton -> erase stock
    document.getElementById("confirmEraseStockConfirmation").addEventListener("click", eraseStock);

    // open critical products table
    document.getElementById("openCriticalProductsButton").addEventListener("click", openCriticalTable);

    // close critical products table
    document.getElementById("closeCriticalButtonTop").addEventListener("click", closeCriticalTable);
    document.getElementById("closeCriticalModalBottom").addEventListener("click", closeCriticalTable);

    // close confirm to delete product modal
    document.getElementById("deleteStopButton").addEventListener("click", closeDeleteProductConfirmation);

    // delete button:
    document.getElementById("deleteConfirmButton").addEventListener("click", deleteProduct);

    // close DeletedNotification
    document.getElementById("closeProductDeletedNotification").addEventListener("click", closeDeletedNotification);

    // close deletedStockNotification
    document.getElementById("closeStockDeletedNotification").addEventListener("click", closeStockDeletedNotification);

    // close updateModal:
    document.getElementById("closeUpdateModalTop").addEventListener("click", closeUpdateModal);
    document.getElementById("closeUpdateModalBottom").addEventListener("click", closeUpdateModal);

    // update Product Button:
    document.getElementById("updateProductButton").addEventListener("click", updateProduct);

    // close productHasBeenUpdatedNotification:
    document.getElementById("closeProductHasBeenUpdated").addEventListener("click", closeProductHasBeenUpdatedNotification);

    // open Tips Modal
    document.getElementById("openTipsModalButton").addEventListener("click", openTipsModal);

    // close Tips Modal
    document.getElementById("closeTipsButtonTop").addEventListener("click", closeTipsModal);
    document.getElementById("closeTipsModalBottom").addEventListener("click", closeTipsModal);

    // close Modal about required infos
    document.getElementById("confirmFillInRequiredInfos").addEventListener("click", closePleaseFillInAllInfosModal);

}


window.addEventListener('load', addHandlers);
window.addEventListener('load', initLocalStorage);


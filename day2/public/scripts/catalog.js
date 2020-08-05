var catalog = []; //array
var categories = [];

function fetchData(){
    $.ajax({
        url: 'http://restclass.azurewebsites.net/api/points',
        type: 'GET',
        success: function(allItems){
            //travel allItems
            //check if the items belong to me
            //if so, push to catalog array

            for(let i = 0; i < allItems.length; i++){
                var item = allItems[i];
                if(item.user === "Brit"){
                    catalog.push(item);

                    
                    /* if array DOES NOT contain category then add the category */

                    // if(!categories.includes(item.category)){ 
                    if(categories.indexOf(item.category) == -1){ //-1 means item is not in the array
                        categories.push(item.category);
                    }
                }
            }
            
            displayCatalog();
            displayCategories();
        },
        error: function(errorDetails){
            console.error("Error fetching data.", errorDetails); //.error will cause text to appear in red, warn is yellow
        }

    });
}

function displayCategories() {
    //travel the categories array
    //get each category form the array
    //create a syntax for li
    //append the syntax to #categories

    for(let i=0; i < categories.length; i++){
        var cats = categories[i];

        var syntax = `
        <li onclick="search('${cats}')" class="list-group-item list-group-item-action">${cats}</li>
        
        
        `;


        $("#categories").append(syntax);
    }
}


function displayCatalog() { 
    //travel the array
    //travel the array of items with for loop
    //get each item
    //display the item on the HTML

    for(let i=0; i < catalog.length; i++){ //rendered syntax
        var item = catalog[i]; //this will give us the item from the catalog

        displayItem(item);

        
    }

}

function displayItem(item){
    var syntax = 
        `<div class = "item">
            <img class="food-item" src="${item.image}">
            <div class = "info">
                <label class = "code">${item.code}</label>
                <label class = "title">${item.title}</label>
                <label class = "price">$${item.price}</label>

                <button>Add</button>
            </div>
        </div>
        `;
        $("#catalog-container").append(syntax);
}

function search(text){
   console.log(text);

    //clear previous results
    //travel the array
    //get each item
    //if the item title contains text
    //display the item

    $("#catalog-container").html('');
    for(let i=0; i<catalog.length; i++){
        var item = catalog[i];

        if(item.title.toLowerCase().includes(text.toLowerCase()) || 
        item.category.toLowerCase().includes(text.toLowerCase()) ||
        item.code.toLowerCase().includes(text.toLowerCase()) ){
            displayItem(item);
        }
    }
}

function init(){
    console.log("Catalog is working");
    //hook events
    $("#btnSearch").click(function () {
        var text = $("#txtSearch").val();
        search(text);
    });

    //get data
    fetchData();
    // displayCatalog();
}

window.onload = init;

/*


*/
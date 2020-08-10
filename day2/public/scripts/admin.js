/* 

    AJAX
    Async Javascript and Xml

    url:  'http://restclass.azurewebsites.net/api/test',
    http verbs (request methods):
        GET: get info (cannot send data but you can send and receive on the other methods)
        POST: create/send data
        PUT: update some existing element (send the whole object to make changes)
        PATCH: update part of an existing element (only send what you need to edit)
        DELETE: remove an existing element

        you need to implement these methods

*/

//capital letters indicate object constructor
//object constructor for items
function Item(code, title, category, price, image){
    this.code = code;
    this.title = title;
    this.category = category;
    this.price = price;
    this.image = image;
    this.user = "Brit";

}

function refreshPage(){
    window.location.reload();
} 

function register(){
    var code = $("#txtCode").val();
    var title = $("#txtTitle").val();
    var category = $("#txtCategory").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImg").val();

    var item = new Item (code, title, category, price, image);
    console.log(item);
    console.log(JSON.stringify(item));


    // create the AJAX request

    $.ajax({
        url: 'http://localhost:8080/api/items',
        type: 'POST', 
        data: JSON.stringify(item), //specify the object we want to send
        contentType: 'application/json', //data is encoded using json
        success:  function(response){
            console.log("Yippee");

        },
        error: function(errorDetails){
            console.log("Oopsie", errorDetails);
        }
    });
}




function init(){
    //hook events
    $("#btnSave").click(register);
    $("#btnSave").click(refreshPage);
}

window.onload = init;
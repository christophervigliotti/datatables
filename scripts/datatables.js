$(document).ready( function () {
    loadDatatable();
} );

function loadDatatable(){

    // get the url param 'example'
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var example = parseInt(urlParams.get('example'));
    var descriptionHtml = "";

    example = (example === null || example === undefined) ? 1 : example;       
    descriptionHtml = "Example " + example + ": ";
    consoleOutputArray = [];

    console.log(descriptionHtml);

    switch(example){

        case 1:
            $('#theTable').DataTable();
            descriptionHtml += "Basic call to .DataTable() with no options.";
        break;        

        case 2:
            var data = [
                {
                    "last_name": "McBoomerson",
                    "first_name": "boomer",
                    "email_address": "orange_cat@fake_email.address"
                },
                {
                    "last_name": "2Dot",
                    "first_name": "Dot",
                    "email_address": "smol_cat@totally_legit_email.address"
                }
            ];
            $('#theTable').DataTable(
                {
                    data:data,
                    columns: [
                        {data: 'last_name'},
                        {data: 'first_name'},
                        {data: 'email_address'}
                    ]
                }
            );
            consoleOutputArray.push(data);
            descriptionHtml += "Feeding in object-based data.";
        break;

        default:
            descriptionHtml = 'Invalid Example #.';
    }

    consoleOutputArray.unshift(descriptionHtml);
    console.log(consoleOutputArray);
    $('#description').html(descriptionHtml);
}
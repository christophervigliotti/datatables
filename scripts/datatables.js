$(document).ready( function () {
    loadDatatable();
} );

function drawDescription(exampleNumber,suffix){
    var descriptionHtml = "Example " + exampleNumber + ": " + suffix;
    $('#description').html(descriptionHtml);
}

function loadDatatable(){

    // get the url param 'exampleNumber'
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var exampleNumber = parseInt(urlParams.get('exampleNumber'));

    exampleNumber = (exampleNumber === null || exampleNumber === undefined) ? 1 : exampleNumber;       

    switch(exampleNumber){
        case 1:
            drawDescription(exampleNumber,"Basic call to .DataTable() with no options.");
            $('#theTable').DataTable();
        break;        
        case 2:
            drawDescription(exampleNumber,"Feeding in object-based data.");
            caseTwo();
        break;
        case 3:
            drawDescription(exampleNumber,"Defining sort-by logic for dates.");
            caseThree();
        break;
        case 4:
            drawDescription(exampleNumber,"Simple AJAX.");
            caseFour();
        break;
        case 5:
            drawDescription(exampleNumber,"AJAX + specifying column order via {data: 0}, {data: 1}, etc.");
            caseFive();
        break;
        default:
            $('#description').html('Invalid or missing exampleNumber specified.  Use "?exampleNumber=1" format in URL.');
        // end default
   } // end switch
} // end jquery ready


// error https://datatables.net/manual/ajax << heading "Column Data Points"
function caseFive(){
    $('#theTable').DataTable( {
        ajax: '/data/5.txt',
        columns: [
            {data: 0},
            {data: 1},
            {data: 2},
            {data: 3}
        ]
    } );
}

function caseFour(){
    $('#theTable').DataTable( {
        ajax: {
            url: '/data/4.txt',
            dataSrc: 'data'
        },
        columns: [
            {data: 'last_name'},
            {data: 'first_name'},
            {data: 'email_address'},
            {data: 'date_added'}
        ]
    } );
}

/* 
https://datatables.net/manual/data/orthogonal-data
ERROR! DataTables warning: table id=theTable - Requested unknown parameter 'date_added' for row 0, column 3. For more information about this error, please see http://datatables.net/tn/4
*/
function caseThree(){
    var data = [
        {
            "last_name": "McBoomerson",
            "first_name": "Boomer",
            "email_address": "orange_cat@fake_email.address",
            "date_added": {
                "display": "1/11/1991",
                "timestamp": "19910111"
            }
        },
        {
            "last_name": "2Dot",
            "first_name": "Dot",
            "email_address": "smol_cat@totally_legit_email.address",
            "date_added": {
                "display": "2/22/1992",
                "timestamp": "19920222"
            }
        }
    ];    
    $('#theTable').DataTable(
        {
            data:data,
            columns: [
                {data: 'last_name'},
                {data: 'first_name'},
                {data: 'email_address'},
                {
                    data: 'date_added',
                    render: 
                    {
                        _: "date_added.display",
                        sort: "date_added.timestamp"
                    }
                }
            ]
        }
    );
    consoleOutputArray.push(data);
}

function caseTwo(){
    var data = [
        {
            "last_name": "McBoomerson",
            "first_name": "Boomer",
            "email_address": "orange_cat@fake_email.address",
            "date_added": "1/11/1991"
        },
        {
            "last_name": "2Dot",
            "first_name": "Dot",
            "email_address": "smol_cat@totally_legit_email.address",
            "date_added": "2/22/1992"
        }
    ];
    $('#theTable').DataTable(
        {
            data:data,
            columns: [
                {data: 'last_name'},
                {data: 'first_name'},
                {data: 'email_address'},
                {data: 'date_added'}
            ]
        }
    );
    consoleOutputArray.push(data);
}
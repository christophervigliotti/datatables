// fire when ready
$(document).ready( function () {
    loadDatatable();
} );

// updates #description with helpful text
function drawDescription(exampleNumber,suffix){
    var descriptionHtml = "Example " + exampleNumber + ": " + suffix;
    $('#description').html(descriptionHtml);
}

// wat
function caseSeven(){
    alert('Under construction.  Stay tuned!');
}

// AJAX, flattening nested object data (and some options).
function caseSix(){
    $('#theTable').DataTable( 
        {
            'processing':true, // <= https://datatables.net/reference/option/processing
            'ajax':'data/6.txt',
            paging:false,
            scrollY: 200,
            columns: [
                {
                    title: 'LaSt NaMe', // <= change column header display name
                    data: 'last_name'
                },
                {data: 'first_name'},
                {data: 'email_addresses.primary'},
                {
                    data: 'date_added',
                    render: 
                    {
                        _: 'display',
                        sort: "timestamp"
                    }
                }
            ]
        } 
    );    
}

// AJAX, specifying column order via {data: 0}, {data: 1}, etc.
function caseFive(){
    $('#theTable').DataTable( 
        {
            'ajax':'data/5.txt',
            columns: [
                {data: 0},
                {data: 2},
                {data: 1},
                {data: 3}
            ]
        } 
    );
}

// Simple AJAX.
function caseFour(){
    $('#theTable').DataTable( {
        ajax: {
            url: 'data/4.txt',
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

// Defining sort-by logic for dates.
function caseThree(){
    var data = [
        {
            "last_name": "3!McBoomerson",
            "first_name": "Boomer",
            "email_address": "orange_cat@fake_email.address",
            "date_added": {
                "display": "1/11/1991",
                "timestamp": "19910111"
            }
        },
        {
            "last_name": "3!2Dot",
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
                        _: 'display',
                        sort: "timestamp"
                    }
                }
            ]
        }
    );
}

// Feeding in object-based data.
function caseTwo(){
    var data = [
        {
            "last_name": "2!McBoomerson",
            "first_name": "Boomer",
            "email_address": "orange_cat@fake_email.address",
            "date_added": "1/11/1991"
        },
        {
            "last_name": "2!Dot",
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
}

// loads the example specified in url param exampleNumber
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
            drawDescription(exampleNumber,"AJAX, specifying column order via {data: 0}, {data: 1}, etc.");
            caseFive();
        break;
        case 6:
            drawDescription(exampleNumber,"AJAX, flattening nested object data (and some options).");
            caseSix();
        break;
        case 7:
            drawDescription(exampleNumber,"Using 'columnDefs'");
            caseSeven();
        break;
        /*
        case 8:
            drawDescription(exampleNumber,"TBD");
            caseEight();
        break;
        case 9:
            drawDescription(exampleNumber,"TBD");
            caseNine();
        break;
        */
        // new example cases go here
        default:
            $('#theTable').hide();
            $('#description').html('Choose from one of the examples above.');

        // end default
   } // end switch
} // end loadDatatables()
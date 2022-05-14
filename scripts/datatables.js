// fire when ready

$(document).ready( function () {
    loadDatatable();
} );

// updates #description with helpful text
function drawDescription(exampleNumber,suffix){
    var descriptionHtml = "Example " + exampleNumber + ": " + suffix;
    $('#description').html(descriptionHtml);
}

function writeFunctionToScreen(str) {
    str = str.toString();
    str = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    $('#moreStuff').html(str);
}

function caseNine(){

    var columnCount = 0;

    // add a row to the end (dynamically)
    $('#theTable').find('tr').each(function(){ 	
        $(this).find('th').eq(-1).after('<th>Actions</th>'); 	
        $(this).find('td').eq(-1).after('<td>&nbsp;</td>'); 
    });

    lastColumnNumber = $('#theTable thead tr th').length - 1;

    // then do the datatable thing
    var table = $('#theTable').DataTable({
        columnDefs: [
            // last name
            {
                targets: 0,
                data: 'last_name',
            },
            // first name
            {
                targets: 1,
                data: 'first_name',
            },
            // email (complex rendering) using 'render'
            {
                targets: 2,
                data: 'email_address',
                // render => https://datatables.net/reference/option/columns.render
                render: function ( data, type, row, meta ) {
                    console.log(arguments);
                    var email_string = 'Email  ' + row.first_name;
                    return '<a href="mailto:'+data+'">' + email_string + '</a>';
                  }
            },
            // date
            {
                targets: 3,
                data: 'date_added',
            },

            // action, simple rendering using 'defaultContent'
            {
                targets: lastColumnNumber,
                data: null,
                defaultContent: '<button>Edit</button>',
                orderable:false
            },
        ],
    });

    $('#theTable tbody').on('click','button',function(){
        var data = table.row($(this).parents('tr')).data();
        var responseHtml = 'You clicked "' + data['first_name'] + ' ' + data['last_name'] + '"';
        $('#responseDiv').html(responseHtml);
    });
}

function caseEight(){
    // making an edit button
    var table = $('#theTable').DataTable({
        columnDefs: [
            {
                targets: -1,
                data: null,
                defaultContent: '<button>Edit</button>'
            },
        ],
        columns: [
            {
                title: 'Laaaast Naaaameee', // <= change column header display name
                data: 'last_name'
            },
            {data: 'first_name'},
            {data: 'email_addresses.primary'},
            {title: 'Actions'}
        ],
    });

    // listen for clicks...display output
    $('#theTable tbody').on('click','button',function(){
        var data = table.row($(this).parents('tr')).data();
        var responseHtml = 'You clicked "' + data['first_name'] + ' ' + data['last_name'] + '"';
        $('#responseDiv').html(responseHtml);
    });
}

function caseSeven(){
    // controlling visibility with columnDefs
    var table = $('#theTable').DataTable({
        columnDefs: [
            {targets: [0,1],visible:true},
            {targets: '_all',visible:false}
        ],
    });
}

function caseSix(){
    // AJAX, flattening nested object data (and some options).
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
            ],
            columnDefs: [
                /*
                // hide all other than 0 and 1
                {targets: [0,1],visible:true},
                {targets: '_all',visible:false}

                // hide only 2 and 3
                {targets: [2,3],visible:false},
                */

                // disable sorting on column 1
                {targets: [1],orderable:false},
            ],
            
            /* 
            playing with "Buttons for DataTables"
            https://datatables.net/extensions/buttons/examples/initialisation/simple.html
            DOES NOT WORK

            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
            */
        } 
    );    
}

function caseFive(){
    // AJAX, specifying column order via {data: 0}, {data: 1}, etc.
    $('#theTable').DataTable( 
        {
            'ajax':'data/5.txt',
            columns: [
                {data: 0},
                {data: 2},
                {data: 1},
                {data: 3}
            ],
            colReorder: true
        } 
    );
}

// Simple AJAX.
function caseFour(){

    // getting ajax data
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

    // adding more complex data...
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

    // ... and then telling it to sort by timestamp
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

function caseTwo(){
    // Feeding in object-based data.

    // declare the object data
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

    // defining which data goes in each cell
    $('#theTable').DataTable(
        {
            data:data,
            columns: [
                {data: 'last_name'},
                {data: 'first_name'},
                {data: 'email_address'},
                {data: 'date_added'},
            ]
        }
    );
}

function caseOne(){
    // dirt-simple
    $('#theTable').DataTable();    
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
            caseOne();
            writeFunctionToScreen(caseOne);
        break;        
        case 2:
            drawDescription(exampleNumber,"Feeding in object-based data.");
            caseTwo();
            writeFunctionToScreen(caseTwo);
        break;
        case 3:
            drawDescription(exampleNumber,"Defining sort-by logic for dates.");
            caseThree();
            writeFunctionToScreen(caseThree);
        break;
        case 4:
            drawDescription(exampleNumber,"Simple AJAX.");
            caseFour();
            writeFunctionToScreen(caseFour);
        break;
        case 5:
            drawDescription(exampleNumber,"AJAX, specifying column order via {data: 0}, {data: 1}, etc.");
            caseFive();
            writeFunctionToScreen(caseFive);
        break;
        case 6:
            drawDescription(exampleNumber,"AJAX, flattening nested object data, using columnDefs to hide rows 2 and 3...and some other stuff.");
            caseSix();
            writeFunctionToScreen(caseSix);
        break;
        case 7:
            drawDescription(exampleNumber,"Using 'columnDefs', hiding _all columns other than 0 and 1.");
            caseSeven();
            writeFunctionToScreen(caseSeven);
        break;
        case 8:
            drawDescription(exampleNumber,"Using 'columnDefs', adding a button.");
            caseEight();
            writeFunctionToScreen(caseEight);
        break;
        case 9:
            drawDescription(exampleNumber,"Same as 8, but using only columnDefs and dynamically adding a new row for 'Actions'...and doing some other stuff");
            caseNine();
            writeFunctionToScreen(caseNine);
        break;
        // new example cases go here
        default:
            $('#theTable').hide();
            $('#description').html('Choose from one of the examples above.');
            $('#moreStuff').html('');

        // end default
   } // end switch
} // end loadDatatables()
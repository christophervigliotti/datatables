# Datatables

https://datatables.net

## Next Steps

1. fix syntax error from refactoring, verify first two examples working, then...
2. resume at "Objects" on page https://datatables.net/manual/data/

## Overview

Quick ramp-up on the datatables jQuery plugin

## Setup

1. Include these two files 

```
//cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css
//cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css
```

2. Call this single function 

```
$(document).ready( function () {
    $('#myTable').DataTable();
} );
```

More at https://datatables.net/manual/installation

## Up & Running

`python3 -m http.server --bind 127.0.0.1`
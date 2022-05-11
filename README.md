# Datatables

https://datatables.net

## Overview

Quick ramp-up on the datatables jQuery plugin

## The Code

* [index.htm](https://github.com/christophervigliotti/datatables/blob/main/index.htm)
* [scripts\datatables.js](https://github.com/christophervigliotti/datatables/blob/main/scripts/datatables.js) << my js code
* [data\4.txt](https://github.com/christophervigliotti/datatables/blob/main/data/4.txt) << 'ajax' response for example 4
* [data\5.txt](https://github.com/christophervigliotti/datatables/blob/main/data/5.txt) << 'ajax' response for example 5
* [data\6.txt](https://github.com/christophervigliotti/datatables/blob/main/data/6.txt) << 'ajax' response for example 6

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
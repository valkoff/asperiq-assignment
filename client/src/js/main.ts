// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'

// Import RouteTable
import { RouteTable } from './routeTable'

document.addEventListener('DOMContentLoaded', async function() {

    const tableBody: HTMLElement | null = document.getElementById('data-rows');
    if(!tableBody) {
        throw new Error('Could not find the table body');
    }
    const routeTable: RouteTable = new RouteTable(tableBody);
    await routeTable.loadTable();

});
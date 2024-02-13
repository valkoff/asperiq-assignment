interface Route {
    destination: string;
    gateway: string;
    flags: string;
    netif: string;
    expire?: number;
}

interface RouteResponse {
    data: Route[];
}

export class RouteTable {

    public url: string = 'http://127.0.0.1:3000/api/v1/routes';

    async loadTable(tableBody: HTMLElement): Promise<void> {
        const routes: Route[] = await this.getRoutes();

        if (routes.length === 0) {
            const row: HTMLTableRowElement = document.createElement('tr');
            row.insertCell(0).innerHTML = 'No routes found';
            tableBody.appendChild(row);
            return;
        }

        routes.forEach((item: Route, index: number): void => {
            const row: HTMLTableRowElement = document.createElement('tr');
            row.insertCell(0).innerHTML = String(index + 1);
            row.insertCell(1).innerHTML = item.destination;
            row.insertCell(2).innerHTML = item.gateway;
            row.insertCell(3).innerHTML = item.flags;
            row.insertCell(4).innerHTML = item.netif;

            // Create a switch cell
            const switchCell: HTMLTableCellElement = row.insertCell(5);
            switchCell.innerHTML = `
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch">
            </div>`;

            // Append the created row to the table
            tableBody.appendChild(row);

            // Add event listener to the switch for the route row
            const checkbox: HTMLInputElement|null = switchCell.querySelector('input[role="switch"]');
            if (!checkbox) {
                throw new Error('Could not find the switch input');
            }
            checkbox.addEventListener('change', () => this.switchStatus(item, checkbox.checked));
        });

    }

    async getRoutes(): Promise<Route[]> {
        try {
            const request: Response = await fetch(this.url);
            const data: RouteResponse = await request.json();
            return data.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async switchStatus(item: Route, isChecked: boolean): Promise<void> {
        const status = isChecked ? 'enabled' : 'disabled';
        console.log(`Switch status for route ${item.destination} into ${status}`);
    }

}
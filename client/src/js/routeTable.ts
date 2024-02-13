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
    private tableBody: HTMLElement;

    constructor(tableBody: HTMLElement) {
        this.tableBody = tableBody;
    }

    async loadTable(): Promise<void> {
        const routes: Route[] = await this.getRoutes();

        if (routes.length === 0) {
            const row: HTMLTableRowElement = document.createElement('tr');
            row.insertCell(0).innerHTML = 'No routes found';
            this.tableBody.innerHTML = '';
            this.tableBody.appendChild(row);
            return;
        }

        const fragment: DocumentFragment = document.createDocumentFragment();

        routes.forEach((item: Route, index: number): void => {
            const row: HTMLTableRowElement = document.createElement('tr');
            row.insertCell(0).innerHTML = String(index + 1);
            row.insertCell(1).innerHTML = item.destination;
            row.insertCell(2).innerHTML = item.gateway;
            row.insertCell(3).innerHTML = item.flags;
            row.insertCell(4).innerHTML = item.netif;
            row.insertCell(5).appendChild(this.createStatusSwitch(item));
            row.insertCell(6).appendChild(this.createDeleteButton(item));

            // Append the created row to the table
            fragment.appendChild(row);
        });

        this.tableBody.innerHTML = '';
        this.tableBody.appendChild(fragment);
    }

    private createStatusSwitch(item: Route): HTMLDivElement {
        // Create the status switch
        const switchContainer: HTMLDivElement = document.createElement('div');
        switchContainer.setAttribute('class', 'form-check form-switch');

        // Create a switch cell
        const switchCheckbox: HTMLInputElement = document.createElement('input');
        switchCheckbox.setAttribute('type', 'checkbox');
        switchCheckbox.setAttribute('class', 'form-check-input');
        switchCheckbox.setAttribute('role', 'switch');
        switchCheckbox.checked = item.expire !== null;

        // Add the switch to the switch container and the switch container to the row as a cell
        switchContainer.appendChild(switchCheckbox);

        // Add event listener to the switch for the route row
        switchCheckbox.addEventListener('change', () => this.switchStatus(item, switchCheckbox.checked));

        return switchContainer;
    }

    private createDeleteButton(item: Route): HTMLButtonElement {
        // Create the delete button
        const deleteButton: HTMLButtonElement = document.createElement('button');
        deleteButton.setAttribute('type', 'button');
        deleteButton.setAttribute('class', 'btn btn-sm btn-danger');
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';

        // Add event listener to the delete button
        deleteButton.addEventListener('click', () => this.deleteRoute(item));

        return deleteButton;
    }

    private async getRoutes(): Promise<Route[]> {
        try {
            const request: Response = await fetch(this.url);
            const data: RouteResponse = await request.json();
            return data.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    private async switchStatus(item: Route, isEnabled: boolean): Promise<void> {
        const status = isEnabled ? 'enabled' : 'disabled';
        console.log(`Switch status for route ${item.destination} into ${status}`);

        try {
            const request: Response = await fetch(`${this.url}?destination=${encodeURIComponent(item.destination)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ enabled: isEnabled })
            });

            if(request.status !== 204){
                throw new Error(`Failed to switch status for route ${item.destination}`);
            }

        } catch (error) {
            console.error(error);
        }

    }

    private async deleteRoute(item: Route): Promise<void> {
        console.log(`Delete route ${item.destination}`);

        try {
            const request: Response = await fetch(`${this.url}?destination=${encodeURIComponent(item.destination)}`, {
                method: 'DELETE'
            });

            if(request.status !== 204){
                throw new Error(`Failed to delete route ${item.destination}`);
            }

            // Refresh the table
            await this.loadTable();

        } catch (error) {
            console.error(error);
        }
    }

}
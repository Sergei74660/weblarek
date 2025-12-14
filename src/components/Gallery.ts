import { Component } from "./base/Component";
import { IEvents } from "./base/Events";

interface IGallery {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    protected catalogElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.catalogElement = container;
    }

    // Setter для каталога, который будет автоматически вызываться
    // из родительского метода render через Object.assign
    set catalog(items: HTMLElement[]) {
        if (items) {
            this.catalogElement.replaceChildren(...items);
        }
    }
}
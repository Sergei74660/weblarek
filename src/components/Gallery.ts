import { Component } from "./base/Component";
import { IEvents } from "./base/Events";

interface IGallery {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    protected catalogElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        
        // Инициализируем контейнер для каталога
        this.catalogElement = container;
        
        // Дополнительная логика при необходимости
    }

    set catalog(items: HTMLElement[]) {
        this.catalogElement.replaceChildren(...items);
    }

    // Метод для рендеринга галереи
    render(data?: Partial<IGallery>): HTMLElement {
        if (data && data.catalog) {
            this.catalog = data.catalog;
        }
        return this.container;
    }
}
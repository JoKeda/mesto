export class Section {
    constructor (settings, containerSelector) {
        this._items = settings.items;
        this._renderer = settings.renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderAll = () => {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    };

    renderAllFirstTime(renderer) {
        this._items.forEach((item) => {
            renderer(item);
        });
    }

    addItem = (DOMItem) => {
        if (this._container) this._container.prepend(DOMItem);
    };

    addItemFirstTime = (DOMItem) => {
        if (this._container) this._container.append(DOMItem);
    };
}
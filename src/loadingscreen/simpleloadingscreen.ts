import { ILoadingScreen } from "./iloadingscreen";

// Простой экран загрузки
export class SimpleLoadingScreen implements ILoadingScreen {
    // Корневой эдемент
    private _rootElement: HTMLElement

    // Элемент стиля
    private _styleElement: HTMLStyleElement

    // Элемент окна загрузки
    protected screenElement: HTMLElement

    // Конструктор
    constructor(rootElement: HTMLElement, template: string, style: string) {
        this._rootElement = rootElement

        var parser = new DOMParser()
        this.screenElement = parser.parseFromString(template, 'text/html').body.firstElementChild as HTMLElement

        this._styleElement = document.createElement('style')
        this._styleElement.innerHTML = style
    }
    
    // Инициализирует элемент
    init(): void {
        this._rootElement.appendChild(this.screenElement)
        document.head.appendChild(this._styleElement)

    }

    // Освобождает ресурсы
    dispose(): void {
        this.screenElement.remove()
        this._styleElement.remove()
    }

    // Отображает
    show(): void {
        this.screenElement.className = "show"
    }

    // Скрывает
    hide(): void {
        this.screenElement.className = "hide"
    }

}
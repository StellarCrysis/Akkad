import { ILoadingScreen } from "./iloadingscreen";

// Экран загрузки по умолчанию
export class DefaultLoadingScreen implements ILoadingScreen {
    // Стиль
    private _style = `
        #loading-screen {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: blue;
        }

        #loading-screen .show {
            display: block;
        }

        #loading-screen .hide {
            display: none;
        }    
    `

    // Шаблон
    private _template =
        `<div id="loading-screen">
            LOADING
        </div>`

    // Корневой эдемент
    private _rootElement: HTMLElement

    // Элемент окна загрузки
    private _screen: HTMLElement

    // Конструктор
    constructor(rootElement: HTMLElement) {
        this._rootElement = rootElement

        var parser = new DOMParser()
        this._screen = parser.parseFromString(this._template, 'text/html').body.firstElementChild as HTMLElement
        this._rootElement.appendChild(this._screen)

        var style = document.createElement('style')
        style.innerHTML = this._style
        document.head.appendChild(style)
    }

    // Отображает
    show(): void {
        this._screen.className = "show"
    }

    // Скрывает
    hide(): void {
        this._screen.className = "hide"
    }
} 
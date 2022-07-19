import { Game } from "../game";
import { SimpleLoadingScreen } from "./simpleloadingscreen";

// Настройки 
export interface IDefaultLoadingScreenSettings {
    caption?: string
}

// Экран загрузки по умолчанию
export class DefaultLoadingScreen extends SimpleLoadingScreen {
    // Стиль
    private static _style = `
        #loading-screen {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #000000;
        }

        #loading-screen.show {
            display: block;
        }

        #loading-screen.hide {
            display: none;
        }    

        #loading-screen .outer {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
          
        #loading-screen .inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 300px;
            height: 300px;  
        }
        
        #loading-screen .caption {
            padding-top: 18px;
            font-family: 'Roboto';
            color: #FFFFFF;
            font-size: 20pt;
        }
        
        #loading-screen .progress {  
            border: 16px solid #f3f3f3;
            border-radius: 50%;
            border-top: 16px solid blue;
            border-bottom: 16px solid blue;
            width: 60px;
            height: 60px;
            -webkit-animation: spin 2s linear infinite;
            animation: spin 2s linear infinite;
        }
        
        @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `

    // Шаблон
    private static _template =
        `<div id="loading-screen">
            <div class="outer">
                <div class="inner">
                <div class="progress"></div>
                    <div id="loader-caption" class="caption">Загружается</div>
                </div>
            </div>
        </div>`

    // Заголовок поумолчанию
    private static readonly DEFAULT_CAPTION = "Загрузка"

    // Конструктор
    constructor(settings?: IDefaultLoadingScreenSettings) {
        super(Game.canvasContainer, DefaultLoadingScreen._template, DefaultLoadingScreen._style)

        let loaderCaption = this.screenElement.querySelector("#loader-caption")!
        loaderCaption.innerHTML = settings?.caption ?? DefaultLoadingScreen.DEFAULT_CAPTION
    }
} 
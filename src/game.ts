import * as BABYLON from "@babylonjs/core"
import { BaseState } from "./basestate"
import { ILoadingScreen } from "./loadingscreen/iloadingscreen"

// Настройки игры
export interface IGameSettigns {
    width?: string
    height?: string
}

// Основной класс игры
export class Game {
    // Текущее состояние
    private static _state: BaseState = null!

    // Окно загрузки
    private static _loadingScreen?: ILoadingScreen

    // Функция отрисовки состояния
    private static _renderFunc = () => {
        Game._state.render()
    }

    // Элемент для элементов игры
    static canvasContainer : HTMLElement

    // HTML канвас игры
    static canvas: HTMLCanvasElement

    // Игровой движок
    static engine: BABYLON.Engine

    // Приватный конструктор
    private constructor() {}

    // Конструктор
    static init(root: HTMLElement, settings?: IGameSettigns) {
        let canvasContainer = document.createElement("div")
        canvasContainer.style.position = "relative"
        canvasContainer.style.display = "flex"
        canvasContainer.style.width = settings?.width ?? "1024px"
        canvasContainer.style.height = settings?.height ?? "576px"
        canvasContainer.style.outline = "none"

        let canvas = document.createElement("canvas")
        canvas.style.outline = "none"
        canvas.style.width = "100%"
        canvas.style.height = "100%"

        canvasContainer.appendChild(canvas)

        root.appendChild(canvasContainer)

        Game.canvasContainer = canvasContainer

        Game.canvas = canvas
        Game.engine = new BABYLON.Engine(Game.canvas, true)
    }

    // Устанавливает экран загрузки
    static setLoadingScreen(screen: ILoadingScreen) {
        Game._loadingScreen?.dispose()
        Game._loadingScreen = screen
        screen.init()
    }

    // Устанавливает состояние
    static setState(state: BaseState): Promise<void> {
        // Освобождает предыдущее состояние
        if (Game._state != null) {
            Game._state.dispose()
            Game.engine.stopRenderLoop(Game._renderFunc)
        }

        Game._state = state
        Game.engine.runRenderLoop(Game._renderFunc)
        return state.enter()
    }

    // Показывает окно загрузки
    static showLoadingScreen(): void {
        Game._loadingScreen?.show()
    }

    // Скрывает окно загрузки
    static hideLoadingScreen(): void {
        Game._loadingScreen?.hide()
    }
}
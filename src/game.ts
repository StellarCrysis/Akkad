import * as BABYLON from "@babylonjs/core"
import { BaseState } from "./basestate"
import { DefaultLoadingScreen } from "./defaultloadingscreen"
import { ILoadingScreen } from "./iloadingscreen"

// Основной класс игры
export class Game {
    // Текущее состояние
    private _state: BaseState = null!

    // Функция отрисовки состояния
    private _renderFunc = () => {
        this._state.render()
    }

    // Окно загрузки
    private _loadingScreen: ILoadingScreen

    // HTML канвас игры
    static canvas: HTMLCanvasElement

    // Игровой движок
    static engine: BABYLON.Engine

    // Конструктор
    constructor(root: HTMLElement) {
        let canvas = document.createElement("canvas")
        root.appendChild(canvas)

        Game.canvas = canvas
        Game.engine = new BABYLON.Engine(Game.canvas, true)
        this._loadingScreen = new DefaultLoadingScreen(root)
    }

    // Устанавливает состояние
    setState(state: BaseState): Promise<void> {
        // Освобождает предыдущее состояние
        if (this._state != null) {
            this._state.dispose()
            Game.engine.stopRenderLoop(this._renderFunc)
        }

        this._state = state
        Game.engine.runRenderLoop(this._renderFunc)
        return state.enter()
    }

    // Показывает окно загрузки
    showLoadingScreen(): void {
        this._loadingScreen.show()
    }

    // Скрывает окно загрузки
    hideLoadingScreen(): void {
        this._loadingScreen.hide()
    }
}
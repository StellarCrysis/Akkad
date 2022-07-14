import * as BABYLON from "@babylonjs/core"
import { BaseState } from "./basestate"

// Основной класс игры
export class Game {
    // Текущее состояние
    private _state: BaseState = null!

    // Функция отрисовки состояния
    private _renderFunc = () => {
        this._state.render()
    }

    // HTML канвас игры
    static canvas: HTMLCanvasElement

    // Игровой движок
    static engine: BABYLON.Engine

    // Конструктор
    constructor(canvasId: string) {
        let canvas = document.getElementById(canvasId) as HTMLCanvasElement
        Game.canvas = canvas
        Game.engine = new BABYLON.Engine(Game.canvas, true)
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
}
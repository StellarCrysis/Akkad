import * as BABYLON from "@babylonjs/core"
import { GameState } from "./gamestate"

// Основной класс игры
export class Game {
    // Текущее состояние
    private _state: GameState = null!

    // Функция отрисовки состояния
    private _renderFunc = () => {
        this._state.render()
    }

    // HTML канвас игры
    static canvas: HTMLCanvasElement

    // Игровой движок
    static engine: BABYLON.Engine

    // Конструктор
    constructor(elementId: string) {
        let root = document.getElementById(elementId)!
        Game.canvas = document.createElement("canvas")
        root.appendChild(Game.canvas)
        Game.engine = new BABYLON.Engine(Game.canvas, true)
    }

    // Устанавливает состояние
    setState(state: GameState): Promise<void> {
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
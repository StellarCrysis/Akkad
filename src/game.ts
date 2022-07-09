import * as BABYLON from "babylonjs"
import { GameState } from "./gamestate"

// Основной класс игры
export class Game {
    // Инстанс игры
    static instance = new Game()

    // Текущее состояние
    private _state: GameState = null!

    // Функция отрисовки состояния
    private _renderFunc = () => {
        this._state.render()
    }

    // HTML канвас игры
    canvas: HTMLCanvasElement

    // Игровой движок
    engine: BABYLON.Engine

    // Конструктор
    private constructor() {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.engine = new BABYLON.Engine(this.canvas, true)
    }

    // Устанавливает состояние
    setState(state: GameState): Promise<void> {
        // Освобождает предыдущее состояние
        if (this._state != null) {
            this._state.dispose()
            this.engine.stopRenderLoop(this._renderFunc)
        }

        this._state = state
        this.engine.runRenderLoop(this._renderFunc)
        return state.enter()
    }
}
import * as BABYLON from "babylonjs"
import { GameState } from "./gamestate"

// Основной класс игры
export class Game {
    // Инстанс игры
    static instance = new Game()

    // Текущее состояние
    private _state: GameState = null!

    // HTML канвас игры
    private canvas: HTMLCanvasElement

    // Игровой движок
    private engine: BABYLON.Engine

    // Конструктор
    private constructor() {
        this.canvas = document.createElement("canvas")
        this.engine = new BABYLON.Engine(this.canvas, true)
    }

    // Устанавливает состояние
    setState(state: GameState): Promise<void> {
        // Освобождает предыдущее состояние
        if (this._state != null) {
            this._state.dispose()
        }

        this._state = state
        return state.enter()
    }
}
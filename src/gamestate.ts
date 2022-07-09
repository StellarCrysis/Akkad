import * as BABYLON from "babylonjs"
import { Game } from "./game"

// Состояние игры
export abstract class GameState implements BABYLON.IDisposable {
    // Основная сцена
    protected scene: BABYLON.Scene = null!

    // Конструктор
    сonstructor() {
        this.scene = new BABYLON.Scene(Game.instance.engine)
    }

    // Отрисовывает сцены состояния
    render() {
        this.scene.render()
    }

    // Обрабатывает вход в состояние
    abstract enter(): Promise<void>

    // Освобождает ресурсы
    abstract dispose(): void
}
import * as BABYLON from "babylonjs"

// Состояние игры
export abstract class GameState implements BABYLON.IDisposable {
    // Основная сцена
    private _scene: BABYLON.Scene

    // Обрабатывает вход в состояние
    abstract enter(): Promise<void>

    // Освобождает ресурсы
    abstract dispose(): void
}
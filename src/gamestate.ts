import * as BABYLON from "@babylonjs/core"
import { Game } from "./game"

// Состояние игры
export abstract class GameState implements BABYLON.IDisposable 
{
  // Основная сцена
  protected mainscene: BABYLON.Scene = null!

  // Конструктор
  сonstructor() {
    this.mainscene = new BABYLON.Scene(Game.engine)
  }

  // Отрисовывает сцены состояния
  render() {
    this.mainscene.render()
  }

  // Обрабатывает вход в состояние
  abstract enter(): Promise<void>

  // Освобождает ресурсы
  abstract dispose(): void
}
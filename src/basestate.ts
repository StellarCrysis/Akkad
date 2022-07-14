import * as BABYLON from "@babylonjs/core"
import { Game } from "./game"

// Состояние игры
export abstract class BaseState implements BABYLON.IDisposable {
  // Основная сцена
  protected mainscene: BABYLON.Scene

  // Возвращает элемент canvas
  protected get canvas () {
    return Game.canvas
  }

  // Конструктор
  constructor() {    
    this.mainscene = new BABYLON.Scene(Game.engine)
  }

  // Отрисовывает сцены состояния
  render() {
    this.mainscene.render()
  }

  // Обрабатывает вход в состояние
  abstract enter(): Promise<void>

  // Освобождает ресурсы
  dispose() {
    this.dispose()
  }
}
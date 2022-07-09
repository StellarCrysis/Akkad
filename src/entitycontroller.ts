// Контроллер сущностей
export abstract class EntityController implements BABYLON.IDisposable {
    // Освобождает сущность
    abstract dispose(): void
}
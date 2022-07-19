// Интерфейс окна загрузки
export interface ILoadingScreen {
    // Отображает
    show(): void

    // Прячет
    hide(): void

    // Инициализирует элемент
    init(): void

    // Освобождает
    dispose(): void
}
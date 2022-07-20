import { BABYLON } from "."
import { Game } from "./game"

// Результат загрузки ассетов
export class AssetLoadingResult {
    // Словарь с результатом
    // Id задачи -> результат задачи
    private _resultMap: Map<string, any>

    // Конструктор
    constructor(resultMap: Map<string, any>) {
        this._resultMap = resultMap
    }

    // Возвращает результат загрузки Mesh
    getMeshTaskResult(taskId: string): BABYLON.ISceneLoaderAsyncResult {
        return this._resultMap.get(taskId) as BABYLON.ISceneLoaderAsyncResult
    }
}

// Интерфейс задания загрузки ассетов
export interface IAssetLoadingTask {
    // Результат загрузки
    load(): Promise<any>
}

// Задание загрузки Mesh
export class AssetMeshLoadingTask implements IAssetLoadingTask {
    // Путь
    private _path: string

    // Имя файла
    private _name: string

    // Конструктор
    constructor(path: string, name: string) {
        this._path = path
        this._name = name
    }

    // Загружает
    load(): Promise<any> {        
        return BABYLON.SceneLoader.ImportMeshAsync("", this._path, this._name)
    }
}

// Управляет загрузкой ресурсов
export class AssetManager {
    // Задания
    private _tasks = new Map<string, IAssetLoadingTask>()

    // Конструктор
    constructor() { }

    // Добавляет задание загрузки 
    addMeshTask(id: string, path: string, name: string) {
        this._tasks.set(id, new AssetMeshLoadingTask(path, name))
    }

    // Загружает
    async start(): Promise<AssetLoadingResult> {
        Game.showLoadingScreen()

        let resMap = new Map<string, any>()
        this._tasks.forEach(async (v, k) => {
            let loadRes = await v.load()
            resMap.set(k, loadRes)
        })

        Game.hideLoadingScreen()

        return new AssetLoadingResult(resMap)
    }
}
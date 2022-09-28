export { default as InputField } from './InputField'
export { default as SingleTodoList } from './SingleTodoList'
export { default as TodoList } from './TodoList'

export interface Todo{
    id: number
    todo: string
    isDone: boolean
}
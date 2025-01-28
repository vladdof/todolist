export async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const todos = await response.json()

  return todos
}

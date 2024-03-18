import { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (input === '') return;
    const nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    setTodos([...todos, { id: nextId, text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };
  
  const editTodo = () => {
    if (editingIndex !== null) {
      const newTodos = [...todos];
      newTodos[editingIndex].text = editingText;
      setTodos(newTodos);
      setEditingIndex(null);
    }
  };

  return (
    <>
      <div className="task-area">
        <h1>ToDoList</h1>
        <table>
          <tbody id="todo-body">
            <ul>
              {todos.map((todo, index) => (
                <li style={{ listStyleType: 'none' }}>
                  {editingIndex === index ? (
                    <input 
                      style={{  
                        fontSize: '19px', 
                        marginRight: '5px', 
                        borderRadius: '0', 
                        border: '1px solid black' 
                      }} 
                      value={editingText} 
                      onChange={e => setEditingText(e.target.value)} 
                    />
                  ) : (
                    <span onClick={() => startEditing(index)}></span>
                  )}
                  {editingIndex === index && 
                    <button 
                      style={{ 
                        fontSize: '14px', 
                        borderRadius: '0',
                        border: '1px solid black' , 
                        textDecoration: todo.isCompleted ? 'line-through' : 'none'
                      }} 
                      className="text-size text-font" 
                      onClick={editTodo}>Save
                    </button>
                  }
                  <>
                    <tr>
                      <td>
                        <input 
                          style={{ 
                            fontSize: '25px',  
                            padding: '0px',
                            textDecoration: todo.isCompleted ? 'line-through' : 'none' 
                          }} 
                          className="margin"
                          type="checkbox" 
                          checked={todo.isCompleted} 
                          onChange={() => toggleTodo(index)} 
                        />
                      </td>
                      <td>
                        <span 
                          style={{ 
                            fontSize: '25px',  
                            textDecoration: todo.isCompleted ? 'line-through' : 'none' 
                          }} 
                          key={index}
                          onClick={() => startEditing(index)}
                        >
                          <td>{todo.id}. </td>
                          <td>{todo.text}</td>
                        </span>
                      </td>
                      <span onClick={() => startEditing(index)}></span>
                      <td className="margin-right">
                        <button 
                          style={{ 
                            fontSize: '14px', 
                            borderRadius: '0', 
                            border: '1px solid black' 
                          }} 
                          className="text-size text-font"
                          onClick={() => startEditing(index)}>Edit
                        </button>
                      </td>
                      <td>
                        <button 
                          style={{ 
                            fontSize: '14px', 
                            borderRadius: '0',
                            border: '1px solid black' 
                          }}
                          className="text-size text-font"
                          onClick={() => deleteTodo(index)}>Delete
                        </button>
                      </td>
                    </tr>
                  </>
                </li>
              ))}
            </ul>
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: '23px' }} className="text-font">Title:
          <input 
            style={{ 
              fontSize: '20px', 
              // marginRight: '5px', 
              // marginLeft: '3px', 
              borderRadius: '0', 
              border: '1px solid black' 
            }} 
            value={input} 
            onChange={e => setInput(e.target.value)}
          />
      </div>
        <button 
          style={{ 
            fontSize: '14px',
            borderRadius: '0', 
            border: '1px solid black' 
          }} 
          className="text-size text-font"
          onClick={addTodo}>Add
        </button>
      
    </>
  )
}
export default TodoList


import './App.css';
import TodoList from './component/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div className="App">
      <div className='todo-wrapper'>
      <TodoList />
      </div>
    </div>
  );
}

export default App;

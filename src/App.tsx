import React, { useState, useEffect } from 'react';
import { Plus, Check, X, CheckCircle2, Circle, Filter } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // todosが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([newTodo, ...todos]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo App
          </h1>
          <p className="text-gray-600">
            シンプルで美しいタスク管理アプリ
          </p>
        </div>

        {/* メインカード */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* 入力エリア */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="新しいタスクを入力..."
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
              />
            </div>
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              追加
            </button>
          </div>

          {/* 統計情報 */}
          <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex gap-6 text-sm">
              <span className="text-gray-600">
                総タスク: <span className="font-semibold text-gray-800">{todos.length}</span>
              </span>
              <span className="text-amber-600">
                進行中: <span className="font-semibold">{activeCount}</span>
              </span>
              <span className="text-green-600">
                完了: <span className="font-semibold">{completedCount}</span>
              </span>
            </div>
          </div>

          {/* フィルター */}
          <div className="flex gap-2 mb-6">
            {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  filter === filterType
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter size={16} />
                {filterType === 'all' ? 'すべて' : 
                 filterType === 'active' ? '進行中' : '完了'}
              </button>
            ))}
          </div>

          {/* todoリスト */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Circle size={48} className="mx-auto mb-4 opacity-30" />
                {filter === 'all' ? 'タスクがありません' :
                 filter === 'active' ? '進行中のタスクがありません' : '完了したタスクがありません'}
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    todo.completed
                      ? 'bg-green-50 border-green-200 opacity-75'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full transition-all duration-200 ${
                      todo.completed
                        ? 'text-green-500 hover:text-green-600'
                        : 'text-gray-400 hover:text-blue-500'
                    }`}
                  >
                    {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-gray-800 transition-all duration-200 ${
                      todo.completed ? 'line-through opacity-60' : ''
                    }`}>
                      {todo.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {todo.createdAt.toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>データはブラウザに自動保存されます</p>
        </div>
      </div>
    </div>
  );
}

export default App;
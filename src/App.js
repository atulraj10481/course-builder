import React, { useState } from 'react';
import Module from './components/Module';
import ModuleForm from './components/ModuleForm';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  const [modules, setModules] = useState([]);

  const addModule = (title) => {
    setModules([...modules, { id: Date.now(), title, resources: [] }]);
  };

  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Course Builder</h1>
        <ModuleForm addModule={addModule} />
        <div className="modules">
          {modules.map(module => (
            <Module 
              key={module.id} 
              module={module} 
              deleteModule={deleteModule} 
              modules={modules} 
              setModules={setModules} 
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;

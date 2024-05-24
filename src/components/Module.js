import React, { useState } from 'react';
import Resource from './Resource';
import ResourceForm from './ResourceForm';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';

const Module = ({ module, deleteModule, modules, setModules }) => {
  const [resources, setResources] = useState(module.resources);

  const addResource = (resource) => {
    setResources([...resources, resource]);
  };

  const deleteResource = (resourceId) => {
    setResources(resources.filter(resource => resource.id !== resourceId));
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'MODULE',
    item: { id: module.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'MODULE',
    hover: (draggedModule) => {
      if (draggedModule.id !== module.id) {
        const newModules = [...modules];
        const draggedIndex = newModules.findIndex(m => m.id === draggedModule.id);
        const targetIndex = newModules.findIndex(m => m.id === module.id);
        newModules.splice(draggedIndex, 1);
        newModules.splice(targetIndex, 0, draggedModule);
        setModules(newModules);
      }
    }
  });

  return (
    <div ref={(node) => drag(drop(node))} className="module" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="module-header">
        <h2>{module.title}</h2>
        <FaTrash onClick={() => deleteModule(module.id)} />
      </div>
      <ResourceForm addResource={addResource} />
      <div className="resources">
        {resources.map(resource => (
          <Resource 
            key={resource.id} 
            resource={resource} 
            deleteResource={deleteResource} 
            module={module} 
            modules={modules} 
            setModules={setModules} 
          />
        ))}
      </div>
    </div>
  );
};

export default Module;

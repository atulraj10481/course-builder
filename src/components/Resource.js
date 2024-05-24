import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';
import LinkResource from './LinkResource';
import FileResource from './FileResource';
import ImageResource from './ImageResource';

const Resource = ({ resource, deleteResource, module, modules, setModules }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'RESOURCE',
    item: { id: resource.id, moduleId: module.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'RESOURCE',
    hover: (draggedResource) => {
      if (draggedResource.id !== resource.id) {
        const newModules = [...modules];
        const currentModule = newModules.find(m => m.id === module.id);
        const draggedModule = newModules.find(m => m.id === draggedResource.moduleId);
        const draggedResourceIndex = draggedModule.resources.findIndex(r => r.id === draggedResource.id);
        const targetResourceIndex = currentModule.resources.findIndex(r => r.id === resource.id);
        
        const [draggedRes] = draggedModule.resources.splice(draggedResourceIndex, 1);
        currentModule.resources.splice(targetResourceIndex, 0, draggedRes);

        setModules(newModules);
      }
    }
  });

  let ResourceComponent;

  switch(resource.type) {
    case 'link':
      ResourceComponent = LinkResource;
      break;
    case 'file':
      ResourceComponent = FileResource;
      break;
    case 'image':
      ResourceComponent = ImageResource;
      break;
    default:
      return null;
  }

  return (
    <div ref={(node) => drag(drop(node))} className="resource" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <ResourceComponent resource={resource} />
      <FaTrash onClick={() => deleteResource(resource.id)} />
    </div>
  );
};

export default Resource;

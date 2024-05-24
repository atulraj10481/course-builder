import React, { useState } from 'react';

const ModuleForm = ({ addModule }) => {
  const [moduleName, setModuleName] = useState('');

  const handleAddModule = () => {
    if (moduleName.trim()) {
      addModule(moduleName);
      setModuleName('');
    }
  };

  return (
    <div className="module-form">
      <input
        type="text"
        placeholder="Module Name"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
      />
      <button onClick={handleAddModule}>Add Module</button>
    </div>
  );
};

export default ModuleForm;

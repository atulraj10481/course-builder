import React, { useState } from 'react';

const ResourceForm = ({ addResource }) => {
  const [resourceType, setResourceType] = useState('link');
  const [resourceName, setResourceName] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceFile, setResourceFile] = useState(null);

  const handleAddResource = () => {
    const newResource = {
      id: Date.now(),
      type: resourceType,
      name: resourceName,
      url: resourceUrl,
      file: resourceFile
    };
    addResource(newResource);
    setResourceName('');
    setResourceUrl('');
    setResourceFile(null);
  };

  return (
    <div className="resource-form">
      <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
        <option value="link">Link</option>
        <option value="file">File</option>
        <option value="image">Image</option>
      </select>
      <input
        type="text"
        placeholder="Resource Name"
        value={resourceName}
        onChange={(e) => setResourceName(e.target.value)}
      />
      {resourceType === 'link' && (
        <input
          type="url"
          placeholder="Resource URL"
          value={resourceUrl}
          onChange={(e) => setResourceUrl(e.target.value)}
        />
      )}
      {(resourceType === 'file' || resourceType === 'image') && (
        <input
          type="file"
          onChange={(e) => setResourceFile(e.target.files[0])}
        />
      )}
      <button onClick={handleAddResource}>Add Resource</button>
    </div>
  );
};

export default ResourceForm;

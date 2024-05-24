import React from 'react';

const FileResource = ({ resource }) => {
  return (
    <div className="file-resource">
      <p>{resource.name}</p>
    </div>
  );
};

export default FileResource;

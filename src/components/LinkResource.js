import React from 'react';

const LinkResource = ({ resource }) => {
  return (
    <div className="link-resource">
      <a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name}</a>
    </div>
  );
};

export default LinkResource;

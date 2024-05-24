import React from 'react';

const ImageResource = ({ resource }) => {
  return (
    <div className="image-resource">
      <img src={URL.createObjectURL(resource.file)} alt={resource.name} />
    </div>
  );
};

export default ImageResource;

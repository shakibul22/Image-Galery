import { useState, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Home = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);
  const [draggedImage, setDraggedImage] = useState(null);
  const selectFiles = () => {
    fileInputRef.current.click();
  };

  const onFileSelect = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] === 'image' &&
          !images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const toggleImageSelection = (imageName) => {
    if (selectedImages.includes(imageName)) {
      setSelectedImages(selectedImages.filter((name) => name !== imageName));
    } else {
      setSelectedImages([...selectedImages, imageName]);
    }
  };

  const deleteSelectedImages = () => {
    setImages(images.filter((image) => !selectedImages.includes(image.name)));
    setSelectedImages([]);
  };
  
  const handleDragStart = (image) => {
    setDraggedImage(image);
  };

  const handleDragEnd = (targetImage) => {
    if (draggedImage === targetImage) {
      return; // No change needed, same image
    }

    const updatedImages = images.slice();
    const draggedIndex = updatedImages.findIndex((image) => image === draggedImage);
    const targetIndex = updatedImages.findIndex((image) => image === targetImage);

    updatedImages.splice(draggedIndex, 1); // Remove the dragged image
    updatedImages.splice(targetIndex, 0, draggedImage); // Insert the dragged image at the target position

    setImages(updatedImages);
  };



  return (
    <div>
      <div className="px-2 lg:px-5 my-3">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="p-12 border-dashed border-2 border-neutral-300 text-center flex flex-col items-center space-y-3 text-sm lg:text-lg"
        >
          <FaCloudUploadAlt className="text-6xl text-cyan-600" />
          {isDragging ? (
            <span>Drop images here</span>
          ) : (
            <>
              <h2 >
                Drag and drop or paste images here to upload
                <span className='text-cyan-600' role="button" onClick={selectFiles}> or Browse</span>
              </h2>
            </>
          )}
          <input
            style={{ display: 'none' }}
            type="file"
            name="file"
            multiple
            ref={fileInputRef}
            onChange={onFileSelect}
          />
     
        </div>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-4">
        {images.map((image, index) => (
          <div key={image.name} className="image-container" style={{ position: 'relative' }}>
            <input
              type="checkbox"
              checked={selectedImages.includes(image.name)}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              onChange={() => toggleImageSelection(image.name)}
              style={{ position: 'absolute' }}
            />
            <img
              className="h-[450px] max-w-full rounded-lg"
              src={image.url}
              alt={`Image ${index}`}
              draggable="true"
              onDragStart={() => handleDragStart(image)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDragEnd(image)}
            />
          </div>
        ))}
      </div>
      <div className='flex flex-col my-5  items-center'>
        
      <button className='btn btn-sm w-[250px]' onClick={deleteSelectedImages}>Delete </button>
      </div>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const FishDetectionApp = () => {
  const [imageFile, setImageFile] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File uploaded:", file.name);  // Debug log for file upload
      setImageFile(file);
    } else {
      console.log("No file selected.");  // Debug log if no file is selected
    }
  };

  const handleDetection = async () => {
    if (!imageFile) {
      setError('Please upload an image first');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', imageFile);
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('http://172.28.0.12:5000/process', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      console.log('Response OK:', response.status);  // Debug log for response
  
      const data = await response.json();
      console.log('Detection results:', data.results);  // Debug log for detection results
      if (data.error) {
        setError(data.error);
      } else {
        setDetectionResults(data.results);
        setProcessedImage(data.processed_image);
      }
    } catch (err) {
      // Handle CORS errors and other errors
      if (err.message.includes('Failed to fetch')) {
        setError('CORS error: The server must allow cross-origin requests from your frontend.');
      } else {
        setError(`Failed to process image: ${err.message}`);
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Fish Species Detection</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
            Upload Image
          </label>
          <div className="flex items-center space-x-4">
            <input 
              id="file-upload"
              type="file" 
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              <Upload className="mr-2" size={20} />
              Select Image
            </label>

            {imageFile && (
              <span className="text-gray-600 truncate max-w-xs">
                {imageFile.name}
              </span>
            )}
          </div>
        </div>

        <button 
          onClick={handleDetection}
          disabled={!imageFile || loading}
          className={`px-4 py-2 rounded ${
            imageFile && !loading 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition duration-300 flex items-center`}
        >
          {loading ? 'Processing...' : 'Detect Fish Species'}
        </button>

        {processedImage && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Processed Image</h3>
            <img 
              src={processedImage} 
              alt="Processed Detection" 
              className="max-w-full rounded-lg shadow-md"
            />
          </div>
        )}

        {detectionResults && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Detection Results</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              {detectionResults.map((result, index) => (
                <div 
                  key={index} 
                  className="mb-3 pb-3 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {result.class_name}
                    </span>
                    <span className="text-gray-600">
                      Confidence: {(result.confidence * 100).toFixed(2)}%
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2">
                    {result.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FishDetectionApp;

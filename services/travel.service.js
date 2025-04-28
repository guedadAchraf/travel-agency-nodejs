const db = require('../models');
const Travel = db.travel;

// Create a new travel
exports.createTravel = async (travelData) => {
  return await Travel.create(travelData);
};

// Get all travels without image data
exports.getAllTravels = async () => {
  return await Travel.findAll({
    attributes: { 
      exclude: ['imageData'] 
    }
  });
};

// Get travel image by id
exports.getTravelImageById = async (id) => {
  return await Travel.findByPk(id, {
    attributes: ['imageData', 'imageContentType', 'imageFilename']
  });
};

// Get travel with details by id
exports.getTravelWithDetailsById = async (id) => {
  const travel = await Travel.findByPk(id, {
    attributes: { 
      exclude: ['imageData'] 
    }
  });
  
  if (!travel) {
    return null;
  }
  
  // Add additional details or related data here if needed
  // This could include related tables if you have associations set up
  
  // For this example, we're just adding a hasImage flag
  const result = travel.toJSON();
  result.hasImage = !!travel.imageFilename;
  
  return result;
};
const travelService = require('../services/travel.service');

// Add a new travel
exports.addTravel = async (req, res, next) => {
  try {
    // Parse travel data from JSON
    const travelData = JSON.parse(req.body.travel);
    
    // Process the image if it exists
    let imageData = null;
    let imageContentType = null;
    let imageFilename = null;
    
    if (req.file) {
      imageData = req.file.buffer;
      imageContentType = req.file.mimetype;
      imageFilename = req.file.originalname;
    }
    
    // Create the travel with image data if provided
    const travel = await travelService.createTravel({
      ...travelData,
      imageData,
      imageContentType,
      imageFilename
    });
    
    res.status(201).json({
      message: 'Travel created successfully',
      travel: {
        id: travel.id,
        title: travel.title,
        description: travel.description,
        price: travel.price,
        destination: travel.destination,
        departureDate: travel.departureDate,
        returnDate: travel.returnDate,
        duration: travel.duration,
        hasImage: !!travel.imageData
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all travels
exports.getAllTravels = async (req, res, next) => {
  try {
    const travels = await travelService.getAllTravels();
    res.status(200).json(travels);
  } catch (error) {
    next(error);
  }
};

// Get travel image
exports.getTravelImage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const travel = await travelService.getTravelImageById(id);
    
    if (!travel || !travel.imageData) {
      return res.status(404).json({
        message: 'Travel image not found'
      });
    }
    
    // Set headers
    res.set('Content-Type', travel.imageContentType || 'image/jpeg');
    res.set('Content-Disposition', `attachment; filename="${travel.imageFilename || 'image.jpg'}"`);
    
    // Send the image
    res.send(travel.imageData);
  } catch (error) {
    next(error);
  }
};

// Get travel with details
exports.getTravelWithDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const travel = await travelService.getTravelWithDetailsById(id);
    
    if (!travel) {
      return res.status(404).json({
        message: 'Travel not found'
      });
    }
    
    res.status(200).json(travel);
  } catch (error) {
    next(error);
  }
};
-- Insert a sample travel
INSERT INTO travels (
    title, 
    description, 
    price, 
    destination, 
    departure_date, 
    return_date, 
    duration
) VALUES (
    'Paris Adventure',
    'Explore the beautiful city of lights',
    999.99,
    'Paris, France',
    '2024-06-01 10:00:00',
    '2024-06-07 18:00:00',
    7
);

-- Insert a sample travel pack
INSERT INTO travel_packs (
    name,
    description,
    price,
    travel_id
) VALUES (
    'Premium Paris Package',
    'Includes luxury hotel and guided tours',
    1499.99,
    1
);
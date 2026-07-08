-- Use the database
USE BusBookingDB;

--Insert users (1 admin, 2 customers)
INSERT INTO Users (name, email, password_hash, role) VALUES
('System Admin', 'admin@busbooking.com', '$2b$12$mockhashadmin1234567890', 'admin'),
('John Doe', 'john.doe@example.com', '$2b$12$mockhashuser1234567890', 'customer'),
('Jane Smith', 'jane.smith@example.com', '$2b$12$mockhashuser0987654321', 'customer');

-- Insert buses
INSERT INTO Buses (registration_number, total_seats) VALUES
('KCA 123A', 45),
('KCB 456B', 50),
('KCC 789C', 40);

-- Insert routes
INSERT INTO Routes (origin, destination) VALUES
('Nairobi', 'Mombasa'),
('Nairobi', 'Kisumu'),
('Nakuru', 'Eldoret');

--Insert trips (Linking routes and buses with future dates)
INSERT INTO Trips (route_id, bus_id, departure_time, price) VALUES
(1, 1, '2026-06-01 08:00:00', 1500.00), -- Nairobi to Mombasa on Bus 1
(2, 2, '2026-06-02 21:00:00', 1200.00), -- Nairobi to Kisumu on Bus 2
(1, 3, '2026-06-03 08:00:00', 1500.00); -- Nairobi to Mombasa on Bus 3

--Insert bookings
-- User 2 (John) books seat 12 on Trip 1
-- User 3 (Jane) books seat 13 on Trip 1
-- User 2 (John) books and cancels seat 5 on Trip 2
INSERT INTO bookings (user_id, trip_id, seat_number, booking_status) VALUES
(2, 1, 12, 'confirmed'),
(3, 1, 13, 'confirmed'),
(2, 2, 5, 'cancelled');

--Insert Feedback
INSERT INTO Feedback (user_id, message) VALUES
(2, 'The booking process was very smooth, but the UI could use some color.'),
(3, 'Looking forward to my trip to Mombasa! Can I change my seat later?');

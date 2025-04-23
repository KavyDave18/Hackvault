-- HackVault Database Setup

-- Create Database
CREATE DATABASE IF NOT EXISTS hackvault;
USE hackvault;

-- Create Ideas Table
CREATE TABLE IF NOT EXISTS ideas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    domain VARCHAR(50) NOT NULL
);

-- Create Domain Tech Stack Table
CREATE TABLE IF NOT EXISTS domain_tech (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain VARCHAR(50) NOT NULL,
    tech_stack TEXT NOT NULL
);

-- Populate Ideas Table
INSERT INTO ideas (title, description, domain) VALUES 
-- Health Domain
('Health Monitoring System', 'A wearable device and app that tracks vital signs and alerts emergency contacts during health emergencies.', 'Health'),
('MedReminder', 'An app that reminds users to take medications and tracks adherence to medication schedules.', 'Health'),
('Virtual Health Assistant', 'An AI-powered chatbot that provides preliminary health assessments and directs users to appropriate care.', 'Health'),
('Medical Records Blockchain', 'A secure system for storing and sharing medical records using blockchain technology.', 'Health'),
('Telehealth Platform', 'A comprehensive platform for remote doctor consultations with integrated prescription services.', 'Health'),

-- Education Domain
('Interactive Learning Platform', 'A platform using AR/VR to create immersive educational experiences for various subjects.', 'Education'),
('Study Group Matcher', 'An app that connects students studying similar subjects to form effective study groups.', 'Education'),
('Personalized Learning Path', 'An AI system that creates customized learning paths based on student strengths and weaknesses.', 'Education'),
('Classroom Engagement Tool', 'A platform for teachers to create interactive quizzes and activities to boost student engagement.', 'Education'),
('Educational Resource Aggregator', 'A search engine specifically for educational resources sorted by quality and relevance.', 'Education'),

-- Fintech Domain
('Budget Optimizer', 'An app that analyzes spending habits and suggests personalized budget plans.', 'Fintech'),
('Peer-to-Peer Lending Platform', 'A secure platform connecting individual lenders with borrowers, bypassing traditional banking.', 'Fintech'),
('Investment Portfolio Simulator', 'A risk-free environment for learning investment strategies with virtual money.', 'Fintech'),
('Expense Splitting App', 'An app for groups to track shared expenses and settle debts easily.', 'Fintech'),
('Cryptocurrency Exchange Monitor', 'A tool for tracking multiple cryptocurrency exchanges and analyzing market trends.', 'Fintech'),

-- Environment Domain
('Carbon Footprint Tracker', 'An app that calculates and tracks personal or organizational carbon footprints.', 'Environment'),
('Waste Management Optimizer', 'A system for optimizing waste collection routes and improving recycling rates.', 'Environment'),
('Sustainable Shopping Guide', 'An app that rates products based on environmental impact and suggests eco-friendly alternatives.', 'Environment'),
('Community Garden Manager', 'A platform for coordinating community garden activities and sharing resources.', 'Environment'),
('Renewable Energy Calculator', 'A tool for calculating the potential and ROI of renewable energy installations for homes and businesses.', 'Environment'),

-- Social Domain
('Volunteer Match', 'A platform connecting volunteers with organizations based on skills and interests.', 'Social'),
('Community Resource Finder', 'An app locating and providing information about community resources like food banks and shelters.', 'Social'),
('Crisis Response Coordinator', 'A system for coordinating response efforts during natural disasters or other crises.', 'Social'),
('Accessibility Mapper', 'A crowdsourced platform mapping accessibility features of public spaces for people with disabilities.', 'Social'),
('Cultural Exchange Network', 'A platform facilitating cultural exchanges, language practice, and international friendships.', 'Social');

-- Populate Domain Tech Stack Table
INSERT INTO domain_tech (domain, tech_stack) VALUES 
('Health', 'Frontend: React, Flutter\nBackend: Node.js, Python (Django)\nDatabase: MongoDB\nCloud: AWS\nAdditional: FHIR API, HealthKit integration'),
('Education', 'Frontend: React, Vue.js\nBackend: Node.js, Ruby on Rails\nDatabase: PostgreSQL\nCloud: Google Cloud\nAdditional: WebRTC, Canvas API'),
('Fintech', 'Frontend: React, Angular\nBackend: Node.js, Java Spring\nDatabase: MySQL, Redis\nCloud: AWS\nAdditional: Stripe API, Plaid integration'),
('Environment', 'Frontend: React, Svelte\nBackend: Python (Flask), Node.js\nDatabase: PostgreSQL, TimescaleDB\nCloud: Google Cloud\nAdditional: Google Maps API, IoT integration'),
('Social', 'Frontend: React, Vue.js\nBackend: Node.js, PHP Laravel\nDatabase: MongoDB, Neo4j\nCloud: AWS\nAdditional: OAuth, WebSockets'); 
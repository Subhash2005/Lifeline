const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Campaign = require('./models/Campaign');
const Hospital = require('./models/Hospital');
const Volunteer = require('./models/Volunteer');
const User = require('./models/User');

const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Seed: Connected to DB');

        // Clear existing
        await Campaign.deleteMany();
        await Hospital.deleteMany();
        await Volunteer.deleteMany();
        await User.deleteMany();

        // Create a default admin user
        const admin = await User.create({
            name: 'LifeLink Admin',
            email: 'admin@lifelink.com',
            password: 'password123', // Will be hashed by model middleware
            role: 'admin'
        });

        // Create a corporate user
        const corporate = await User.create({
            name: 'Global Relief Corp',
            email: 'csr@globalrelief.com',
            password: 'password123',
            role: 'corporate'
        });

        // Seed Hospitals
        const hospitalData = [
            {
                name: 'City Care General Hospital',
                location: 'New York, NY',
                availableBeds: 42,
                rating: 4.8,
                treatmentCost: { 'Chemotherapy': 12000, 'Heart Surgery': 45000, 'Dialysis': 5000 },
                discountPercentage: 15,
                imageUrl: 'https://images.unsplash.com/photo-1586773860418-d3b978501217?auto=format&fit=crop&q=80&w=800'
            },
            {
                name: 'Unity Medical Center',
                location: 'Chicago, IL',
                availableBeds: 18,
                rating: 4.5,
                treatmentCost: { 'Organ Transplant': 85000, 'ICU Daily': 2000, 'Vaccination': 100 },
                discountPercentage: 10,
                imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
            }
        ];
        const hospitals = await Hospital.insertMany(hospitalData);

        // Seed Campaigns
        const campaignData = [
            {
                title: 'Emergency: Heart Surgery for Sarah',
                description: 'Sarah is a 5-year old girl who needs urgent corrective heart surgery. Her family is struggling to meet the high costs at Unity Medical Center.',
                patientName: 'Sarah Jennings',
                disease: 'Congenital Heart Defect',
                requiredAmount: 25000,
                raisedAmount: 12450,
                timeLeft: 12,
                isEmergency: true,
                isVerified: true,
                hospital: hospitals[1]._id,
                createdBy: admin._id,
                imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
                survivalProbability: 'High',
                urgencyLevel: 'Critical'
            },
            {
                title: 'Support John\'s Cancer Recovery',
                description: 'John is battling Stage 3 Colon Cancer. He needs funds for a 6-month chemotherapy course at City Care.',
                patientName: 'John Doe',
                disease: 'Colon Cancer',
                requiredAmount: 40000,
                raisedAmount: 5200,
                timeLeft: 45,
                isVerified: true,
                hospital: hospitals[0]._id,
                createdBy: admin._id,
                imageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
                survivalProbability: 'Medium',
                urgencyLevel: 'High'
            }
        ];
        await Campaign.insertMany(campaignData);

        // Seed Volunteers
        const volunteerData = [
            {
                user: admin._id,
                type: 'blood donor',
                location: 'New York, NY',
                phone: '+1 (555) 000-1111',
                skills: ['A+ Blood Group']
            }
        ];
        await Volunteer.insertMany(volunteerData);

        console.log('Seed: Successful');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
};

seedData();

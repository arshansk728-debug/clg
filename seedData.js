// Sample Data for College Query Chatbot
const mongoose = require('mongoose');
const FAQ = require('./models/FAQ');
const Admin = require('./models/Admin');
require('dotenv').config();

// Sample FAQ data
const sampleFAQs = [
    // Admissions
    {
        question: "What are the admission requirements for undergraduate programs?",
        answer: "For undergraduate programs, you need: 1) High school diploma or equivalent, 2) Minimum 75% in 12th grade, 3) Valid entrance exam scores (SAT/ACT), 4) English proficiency test (TOEFL/IELTS for international students), 5) Letters of recommendation, 6) Personal statement/essay.",
        keywords: ["admission", "undergraduate", "requirements", "eligibility", "apply"],
        category: "admissions",
        priority: 10
    },
    {
        question: "When is the application deadline for the next academic year?",
        answer: "Application deadlines vary by program: Early Decision - November 15th, Regular Decision - January 15th, Spring Admission - October 1st. International students should apply at least 3 months earlier to allow for visa processing.",
        keywords: ["deadline", "application", "dates", "when to apply"],
        category: "admissions",
        priority: 9
    },
    {
        question: "How do I apply for admission to the college?",
        answer: "You can apply online through our college portal: 1) Create an account on our admission portal, 2) Fill out the application form, 3) Upload required documents (transcripts, certificates, ID proof), 4) Pay the application fee, 5) Submit before the deadline. You'll receive a confirmation email once submitted.",
        keywords: ["how to apply", "application process", "online application"],
        category: "admissions",
        priority: 10
    },
    {
        question: "Is there an application fee?",
        answer: "Yes, there is a non-refundable application fee of $50 for domestic students and $75 for international students. Fee waivers are available for students with financial need. Payment can be made online via credit card or bank transfer.",
        keywords: ["application fee", "cost", "payment", "fee waiver"],
        category: "admissions",
        priority: 7
    },

    // Courses
    {
        question: "What undergraduate programs are offered?",
        answer: "We offer a wide range of undergraduate programs including: Engineering (Computer Science, Mechanical, Electrical, Civil), Business Administration, Arts & Sciences (English, History, Psychology, Biology, Chemistry, Physics), Fine Arts, and Pre-professional tracks (Pre-med, Pre-law).",
        keywords: ["programs", "courses", "undergraduate", "majors", "degrees"],
        category: "courses",
        priority: 10
    },
    {
        question: "Are there any online courses available?",
        answer: "Yes, we offer hybrid and fully online options for several programs including Business Administration, Computer Science, and Liberal Arts. Online courses maintain the same academic rigor as on-campus classes and are taught by the same faculty.",
        keywords: ["online courses", "distance learning", "virtual classes", "remote"],
        category: "courses",
        priority: 8
    },
    {
        question: "What is the duration of undergraduate programs?",
        answer: "Most undergraduate programs are 4 years (8 semesters) for full-time students. Some accelerated programs can be completed in 3 years, while part-time options may take 5-6 years. Professional programs like Engineering may require additional co-op terms.",
        keywords: ["duration", "length", "how long", "years", "time"],
        category: "courses",
        priority: 6
    },
    {
        question: "Can I change my major after enrollment?",
        answer: "Yes, you can change your major. Most students can change within the first two years without significant delay. To change your major: 1) Meet with your academic advisor, 2) Submit a change of major form, 3) Meet with the new department advisor, 4) Ensure you meet the new major's requirements.",
        keywords: ["change major", "switch program", "transfer", "different course"],
        category: "courses",
        priority: 7
    },

    // Fees
    {
        question: "What is the tuition fee for undergraduate programs?",
        answer: "Annual tuition fees: In-state students - $12,000, Out-of-state students - $28,000, International students - $35,000. Additional costs include housing ($8,000-12,000), meal plans ($4,000), books & supplies ($1,500), and personal expenses ($2,000).",
        keywords: ["tuition", "fees", "cost", "price", "how much", "expensive"],
        category: "fees",
        priority: 10
    },
    {
        question: "Are there payment plan options available?",
        answer: "Yes, we offer flexible payment plans: 1) Semester payment plan (2 installments), 2) Monthly payment plan (10 monthly payments), 3) Annual payment (5% discount). All plans require a small enrollment fee. Contact the bursar's office to set up a payment plan.",
        keywords: ["payment plan", "installments", "monthly payments", "pay"],
        category: "fees",
        priority: 8
    },
    {
        question: "What scholarships and financial aid are available?",
        answer: "We offer merit-based scholarships (up to $15,000), need-based grants, work-study programs, and federal student loans. To apply: Submit FAFSA, complete our scholarship application, maintain minimum 3.0 GPA for renewals. Priority deadline for aid is February 15th.",
        keywords: ["scholarships", "financial aid", "grants", "funding", "money help"],
        category: "scholarships",
        priority: 9
    },
    {
        question: "When are tuition fees due?",
        answer: "Tuition fees are due before the start of each semester: Fall semester - August 15th, Spring semester - January 10th, Summer session - May 15th. Late payment incurs a $100 fee. You can view your bill and make payments through the student portal.",
        keywords: ["fee due date", "when to pay", "payment deadline", "billing"],
        category: "fees",
        priority: 7
    },

    // Exams
    {
        question: "When are the final exams scheduled?",
        answer: "Final exam schedules are published 4 weeks before the exam period. Fall semester finals: December 12-19, Spring semester finals: May 8-15, Summer session finals: Last week of July. Exam schedules are available on the academic calendar and student portal.",
        keywords: ["final exams", "exam schedule", "when", "dates", "finals week"],
        category: "exams",
        priority: 9
    },
    {
        question: "What is the exam policy for makeup exams?",
        answer: "Makeup exams are allowed for documented emergencies, illness (with medical certificate), or religious observances. You must notify your professor within 48 hours of the missed exam and provide appropriate documentation. Makeup exams are typically scheduled within one week.",
        keywords: ["makeup exam", "missed exam", "exam policy", "retake"],
        category: "exams",
        priority: 6
    },
    {
        question: "How can I check my exam results?",
        answer: "Exam results are available through the student portal 48-72 hours after the exam. Login with your student ID and password, go to 'Academic Records' → 'Grades'. You'll also receive an email notification when grades are posted. Final transcripts are available after degree verification.",
        keywords: ["results", "grades", "scores", "check results", "marks"],
        category: "exams",
        priority: 8
    },

    // Events
    {
        question: "What events are organized by the college?",
        answer: "We organize various events throughout the year: Academic conferences, cultural festivals (Spring Fest, International Day), career fairs, sports tournaments, guest lectures, workshops, orientation programs for new students, and graduation ceremonies. Check the events calendar on our website.",
        keywords: ["events", "activities", "festivals", "programs", "what's happening"],
        category: "events",
        priority: 7
    },
    {
        question: "How can I participate in college events?",
        answer: "To participate in events: 1) Check the events calendar on the college website, 2) Register through the student portal or event-specific links, 3) Join student organizations related to your interests, 4) Follow college social media for announcements, 5) Contact the student activities office for volunteer opportunities.",
        keywords: ["participate", "join events", "how to participate", "get involved"],
        category: "events",
        priority: 6
    },
    {
        question: "Are there any upcoming cultural events?",
        answer: "Upcoming cultural events include: International Food Festival (March 15), Spring Music Concert (April 10), Art Exhibition (April 20-30), Cultural Diversity Week (May 1-7), and Theater Performance (May 15). Check the events page for updates and registration details.",
        keywords: ["cultural events", "upcoming events", "festivals", "cultural programs"],
        category: "events",
        priority: 8
    },

    // Facilities
    {
        question: "What facilities are available on campus?",
        answer: "Our campus facilities include: Modern library with 24/7 access, state-of-the-art laboratories, computer labs, gymnasium and sports complex, student recreation center, cafeteria and dining halls, medical center, dormitories, parking facilities, and free Wi-Fi throughout campus.",
        keywords: ["facilities", "campus", "infrastructure", "amenities", "available"],
        category: "facilities",
        priority: 8
    },
    {
        question: "Are there hostel accommodations available?",
        answer: "Yes, we have on-campus housing for 2,500 students. Options include: Single and double occupancy rooms, suite-style apartments for upper-class students, special housing for international students. All rooms have Wi-Fi, study areas, and laundry facilities. Housing application opens in February.",
        keywords: ["hostel", "accommodation", "housing", "dormitory", "stay", "residence"],
        category: "facilities",
        priority: 9
    },
    {
        question: "What sports facilities are available?",
        answer: "Sports facilities include: Olympic-size swimming pool, basketball courts, tennis courts, soccer field, track and field stadium, fitness center with modern equipment, yoga studio, and indoor climbing wall. All students get free access with a valid student ID.",
        keywords: ["sports", "gym", "fitness", "swimming", "basketball", "recreation"],
        category: "facilities",
        priority: 7
    },
    {
        question: "Is there a library on campus?",
        answer: "Yes, our main library is a 4-story facility with over 500,000 books, digital resources, study spaces, group discussion rooms, computer lab, printing services, and 24/7 access during exam periods. We also have departmental libraries for specialized resources.",
        keywords: ["library", "books", "study", "resources", "research"],
        category: "facilities",
        priority: 8
    },

    // General
    {
        question: "What are the college contact details?",
        answer: "Main Office: (555) 123-4567, Admissions: (555) 123-4568, Email: info@college.edu, Address: 123 College Avenue, University City, State 12345. Office hours: Monday-Friday 8:00 AM - 5:00 PM. Emergency contact: (555) 123-9999 (24/7).",
        keywords: ["contact", "phone", "email", "address", "office", "reach"],
        category: "general",
        priority: 10
    },
    {
        question: "What are the college office hours?",
        answer: "Administrative offices are open Monday-Friday 8:00 AM - 5:00 PM. Student services are available until 7:00 PM on weekdays. The library operates 6:00 AM - 11:00 PM (extended hours during exams). Campus security is available 24/7.",
        keywords: ["office hours", "timings", "when open", "schedule"],
        category: "general",
        priority: 6
    },
    {
        question: "How can I contact the admissions office?",
        answer: "Admissions Office Contact: Phone: (555) 123-4568, Email: admissions@college.edu, Office: Main Building, Room 101. Walk-in hours: Monday-Friday 9:00 AM - 4:00 PM. For urgent matters, you can also use our live chat on the website during business hours.",
        keywords: ["admissions contact", "admissions office", "how to contact"],
        category: "general",
        priority: 9
    },
    {
        question: "Is the college accredited?",
        answer: "Yes, our college is fully accredited by the Higher Learning Commission (HLC) and holds specialized accreditations for various programs including ABET for engineering, AACSB for business, and NCATE for education programs. These accreditations ensure our degrees are recognized nationwide.",
        keywords: ["accredited", "accreditation", "recognition", "valid degree"],
        category: "general",
        priority: 7
    }
];

// Sample admin user
const sampleAdmin = {
    username: 'admin',
    password: 'admin123', // Will be hashed automatically
    email: 'admin@college.edu',
    role: 'admin'
};

// Database connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/college_chatbot';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// Seed FAQ data
const seedFAQs = async () => {
    try {
        // Clear existing FAQs
        await FAQ.deleteMany({});
        console.log('🗑️  Cleared existing FAQs');

        // Insert sample FAQs
        await FAQ.insertMany(sampleFAQs);
        console.log(`✅ Inserted ${sampleFAQs.length} sample FAQs`);
    } catch (error) {
        console.error('❌ Error seeding FAQs:', error.message);
    }
};

// Seed admin data
const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: sampleAdmin.username });
        if (existingAdmin) {
            console.log('ℹ️  Admin user already exists, skipping...');
            return;
        }

        // Create admin user
        const admin = new Admin(sampleAdmin);
        await admin.save();
        console.log('✅ Created admin user');
        console.log(`   Username: ${sampleAdmin.username}`);
        console.log(`   Password: ${sampleAdmin.password}`);
        console.log(`   Email: ${sampleAdmin.email}`);
    } catch (error) {
        console.error('❌ Error seeding admin:', error.message);
    }
};

// Main seeding function
const seedDatabase = async () => {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    await seedAdmin();
    await seedFAQs();
    
    console.log('✅ Database seeding completed!');
    console.log('\n📝 Summary:');
    console.log(`   - ${sampleFAQs.length} FAQs added`);
    console.log('   - 1 Admin user created');
    console.log('\n🚀 You can now start the server with: npm start');
    
    process.exit(0);
};

// Run if called directly
if (require.main === module) {
    seedDatabase().catch(error => {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    });
}

module.exports = { seedDatabase, sampleFAQs, sampleAdmin };
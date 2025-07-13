const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allow CORS for specific frontend domain
const allowedOrigins = [
  'http://localhost:3000',
  'https://college-booking-frontend-inky.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://collegeBooking:m8VnOaZljRTUu68I@cluster0.fkw47.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const All_College_Date = client.db('College_Booking').collection('All_College');
    const Admission_Date = client.db('College_Booking').collection('Admission_Data');
    const all_user = client.db('College_Booking').collection('All_Users');
    const user_colleges = client.db('College_Booking').collection('User_Colleges');

    // All Users
    app.get('/all_users', async (req, res) => {
      try {
        const result = await all_user.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data', message: error.message });
      }
    });

    app.post('/all_users', async (req, res) => {
      const userData = req.body;
      try {
        const result = await all_user.insertOne(userData);
        res.status(201).send(result);
      } catch (err) {
        res.status(500).send({ error: 'Failed to insert data', message: err.message });
      }
    });

    // All Colleges
    app.get('/all_college', async (req, res) => {
      try {
        const result = await All_College_Date.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data', message: error.message });
      }
    });

    app.post('/all_college', async (req, res) => {
      const data = req.body;
      try {
        const result = await All_College_Date.insertOne(data);
        res.status(201).send(result);
      } catch (err) {
        res.status(500).send({ error: 'Failed to insert data', message: err.message });
      }
    });

    // Admission Data
    app.get('/admision_Data', async (req, res) => {
      try {
        const result = await Admission_Date.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data', message: error.message });
      }
    });

    app.post('/admision_Data', async (req, res) => {
      const data = req.body;
      try {
        const result = await Admission_Date.insertOne(data);
        res.status(201).send(result);
      } catch (err) {
        res.status(500).send({ error: 'Failed to insert data', message: err.message });
      }
    });

    // User Colleges
    app.get('/user_colleges', async (req, res) => {
      try {
        const result = await user_colleges.find().toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch data', message: error.message });
      }
    });

    app.post('/user_colleges', async (req, res) => {
      const data = req.body;
      try {
        const result = await user_colleges.insertOne(data);
        res.status(201).send(result);
      } catch (err) {
        res.status(500).send({ error: 'Failed to save college info', message: err.message });
      }
    });

    // Filter user colleges by email
    app.get('/user_colleges/:email', async (req, res) => {
      const email = req.params.email;
      try {
        const colleges = await user_colleges.find({ studentEmail: email }).toArray();
        res.send(colleges);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch user colleges', message: error.message });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB");
  } finally {
    // await client.close(); // leave open for server to keep handling requests
  }
}
run().catch(console.dir);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

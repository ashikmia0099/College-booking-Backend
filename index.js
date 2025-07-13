const express = require('express')
const cors = require('cors'); // ✅ Add this line

const app = express()
const port = process.env.PORT || 5000


// Middleware
app.use(cors());
app.use(express.json()); // ✅ This is required to parse JSON from POST requests


// username = collegeBooking
// Databasepassword = m8VnOaZljRTUu68I

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://collegeBooking:m8VnOaZljRTUu68I@cluster0.fkw47.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {



        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const All_College_Date = client.db('College_Booking').collection('All_College');
        const Admission_Date = client.db('College_Booking').collection('Admission_Data');
        const all_user = client.db('College_Booking').collection('All_Users');
        const user_colleges = client.db('College_Booking').collection('User_Colleges');
        // const all_ = client.db('College_Booking').collection('All_Users');
        // const selectedTutorCollection = client.db('Learn_Langauge').collection('selected_Tutor');

        // get learn langauge data


        // app.get('/book_post_Form', async (req, res) => {
        //     // const email = req.query.email;
        //     // let query = {};
        //     // if (email) {
        //     //     query = { email: email };
        //     // }
        //     const books_data = Books_Data.find(books_data);
        //     const result = await allLanguages.toArray();
        //     res.send(result);
        // });


        // all user api

        app.get('/all_users', async (req, res) => {
            try {
                const result = await all_user.find().toArray(); // ✅ Correct usage
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: 'Failed to fetch data', message: error.message });
            }
        });




        app.post('/all_users', async (req, res) => {
            const userData = req.body; // expects JSON
            try {
                const result = await all_user.insertOne(userData);
                res.status(201).send(result); // 201 = Created
            } catch (err) {
                res.status(500).send({ error: 'Failed to insert data', message: err.message });
            }
        });

        // all college api
        app.get('/all_college', async (req, res) => {
            try {
                const result = await All_College_Date.find().toArray(); // ✅ Correct usage
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: 'Failed to fetch data', message: error.message });
            }
        });




        app.post('/all_college', async (req, res) => {
            const booksData = req.body; // expects JSON
            try {
                const result = await All_College_Date.insertOne(booksData);
                res.status(201).send(result); // 201 = Created
            } catch (err) {
                res.status(500).send({ error: 'Failed to insert data', message: err.message });
            }
        });

        // student admission data

        app.get('/admision_Data', async (req, res) => {
            try {
                const result = await Admission_Date.find().toArray(); // ✅ Correct usage
                res.send(result);
            } catch (error) {
                res.status(500).send({ error: 'Failed to fetch data', message: error.message });
            }
        });




        app.post('/admision_Data', async (req, res) => {
            const booksData = req.body; // expects JSON
            try {
                const result = await Admission_Date.insertOne(booksData);
                res.status(201).send(result); // 201 = Created
            } catch (err) {
                res.status(500).send({ error: 'Failed to insert data', message: err.message });
            }
        });



        // Save admitted college for user
        app.get('/user_colleges', async (req, res) => {
            try {
                const result = await user_colleges.find().toArray(); // ✅ Correct usage
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


        // user admission data filter by email

        // Update this route to return an array of colleges for the user
app.get('/user_colleges/:email', async (req, res) => {
    const email = req.params.email;
    const colleges = await user_colleges.find({ studentEmail: email }).toArray(); // <- returns array
    res.send(colleges);
});





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



import express from 'express';

import mongoose from 'mongoose';
import uploadRoute from './routes/upload.js';
import dotenv from 'dotenv';
import salesRoutes from './routes/sales.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
));

// Connect MongoDB
// mongoose.connect('mongodb://localhost:27017/sales_dashboard', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use("/api", salesRoutes);

// app.use('/api', uploadRoute);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

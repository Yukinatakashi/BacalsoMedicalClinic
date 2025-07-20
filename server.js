import express from 'express';
import cors from 'cors';

// ✅ Adjust paths based on your folder structure
import studentRoutes from './src/config/page/students.js';
import courseRoutes from './src/config/page/course.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// Default route
app.get('/', (_, res) => {
  res.send('Modular Supabase CRUD API running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API is live at http://localhost:${PORT}`);
});

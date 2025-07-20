import express from 'express';
import { supabase } from '../../../supabase.js'; // Adjust if needed

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) return res.status(400).json({ error });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const { data, error } = await supabase.from('courses').insert({ name }).select();
  if (error) return res.status(400).json({ error });
  res.json(data[0]);
});

export default router;

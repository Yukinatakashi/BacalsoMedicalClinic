import express from 'express';
import { supabase } from '../../../supabase.js'; // Adjust if needed

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('students')
    .select('id, name, course_id, courses(name)');
  if (error) return res.status(400).json({ error });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { name, course_id } = req.body;
  const { data, error } = await supabase.from('students').insert({ name, course_id }).select();
  if (error) return res.status(400).json({ error });
  res.json(data[0]);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, course_id } = req.body;
  const { data, error } = await supabase
    .from('students')
    .update({ name, course_id })
    .eq('id', id)
    .select();
  if (error) return res.status(400).json({ error });
  res.json(data[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('students').delete().eq('id', id);
  if (error) return res.status(400).json({ error });
  res.json({ message: 'Student deleted' });
});

export default router;

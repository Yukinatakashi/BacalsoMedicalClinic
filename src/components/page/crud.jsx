import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://bacalsomedicalclinic.onrender.com'; // ⚠️ Replace with Render API URL on deploy

export default function Crud() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API}/students`);
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const addStudent = async () => {
    if (!name || !courseId) return alert("Please fill in both name and course.");
    setLoading(true);
    try {
      await axios.post(`${API}/students`, { name, course_id: courseId });
      setName('');
      setCourseId('');
      fetchStudents();
    } catch (err) {
      console.error("Failed to add student", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API}/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Failed to delete student", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Student Manager</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)} style={{ marginRight: 10 }}>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <button onClick={addStudent} disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </div>

      <h2>📋 Students List</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} — {s.courses?.name || 'No Course'}
            <button
              onClick={() => deleteStudent(s.id)}
              style={{ marginLeft: 10 }}
              disabled={loading}
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useEffect, useState } from "react";

import axios from "axios";
import { hashData } from "../utils/crypto";


interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Student>>({});

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:4000/students");
    setStudents(res.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:4000/students/${id}`);
    fetchStudents();
  };

  const handleEdit = (student: Student) => {
    setEditingId(student.id as any);
    setEditData(student);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Hash email, phone, password
    const updated = {
      ...editData,
      email: editData.email ? hashData(editData.email.trim().toLowerCase()) : '',
      phone: editData.phone ? hashData(editData.phone.trim()) : '',
      password: editData.password ? hashData(editData.password.trim()) : '',
    };
    await axios.put(`http://localhost:4000/students/${editingId}`, updated);
    setEditingId(null);
    setEditData({});
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              {editingId === String(s.id) ? (
                <td colSpan={6}>
                  <form onSubmit={handleEditSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input name="fullName" value={editData.fullName || ''} onChange={handleEditChange} />
                    <input name="dob" value={editData.dob || ''} onChange={handleEditChange} />
                    <input name="gender" value={editData.gender || ''} onChange={handleEditChange} />
                    <input name="address" value={editData.address || ''} onChange={handleEditChange} />
                    <input name="course" value={editData.course || ''} onChange={handleEditChange} />
                    {/* <input name="password" value={editData.password || ''} onChange={handleEditChange} /> */}
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                  </form>
                </td>
              ) : (
                <>
                  <td>{s.fullName}</td>
                  <td>{s.dob}</td>
                  <td>{s.gender}</td>
                  <td>{s.address}</td>
                  <td>{s.course}</td>
                  <td>
                    <button onClick={() => handleEdit(s)} style={{margin: '10px' }}> Edit</button>
                    <button onClick={() => handleDelete(s.id)}> Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

import pg from 'pg';
const { Pool } = pg;

// Official Supabase Database Connection for LearnLens AI
// Project: learnlen ai (Ref: znalxodrqrmxxwocmnhj) | Org: sonicflow
export const pool = new Pool({
  host: 'db.znalxodrqrmxxwocmnhj.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'Ayush@27142',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export async function checkDatabaseHealth() {
  try {
    const res = await pool.query('SELECT current_database(), version(), count(*) FROM students;');
    return {
      connected: true,
      project: 'learnlen ai',
      projectRef: 'znalxodrqrmxxwocmnhj',
      org: 'sonicflow',
      host: 'db.znalxodrqrmxxwocmnhj.supabase.co',
      database: res.rows[0].current_database,
      studentCount: parseInt(res.rows[0].count, 10),
      version: 'PostgreSQL 17.6'
    };
  } catch (err) {
    return {
      connected: false,
      error: err.message,
      project: 'learnlen ai',
      projectRef: 'znalxodrqrmxxwocmnhj'
    };
  }
}

export async function getAllStudents() {
  const res = await pool.query('SELECT * FROM students ORDER BY roll_no ASC;');
  return res.rows.map(r => ({
    id: r.id,
    rollNo: r.roll_no,
    name: r.name,
    nameHi: r.name_hi,
    age: r.age,
    gender: r.gender,
    status: r.status,
    currentLevel: r.current_level,
    currentLevelHi: r.current_level_hi,
    tarlGroup: r.tarl_group,
    tarlGroupHi: r.tarl_group_hi,
    attendance: r.attendance,
    primaryGap: r.primary_gap,
    primaryGapHi: r.primary_gap_hi,
    secondaryGap: r.secondary_gap,
    secondaryGapHi: r.secondary_gap_hi,
    skills: r.skills || {}
  }));
}

export async function upsertStudent(s) {
  const query = `
    INSERT INTO students (
      id, class_id, roll_no, name, name_hi, age, gender, status,
      current_level, current_level_hi, tarl_group, tarl_group_hi,
      attendance, primary_gap, primary_gap_hi, secondary_gap, secondary_gap_hi, skills
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    ON CONFLICT (id) DO UPDATE SET
      roll_no = EXCLUDED.roll_no,
      name = EXCLUDED.name,
      name_hi = EXCLUDED.name_hi,
      status = EXCLUDED.status,
      current_level = EXCLUDED.current_level,
      current_level_hi = EXCLUDED.current_level_hi,
      tarl_group = EXCLUDED.tarl_group,
      tarl_group_hi = EXCLUDED.tarl_group_hi,
      attendance = EXCLUDED.attendance,
      primary_gap = EXCLUDED.primary_gap,
      primary_gap_hi = EXCLUDED.primary_gap_hi,
      skills = EXCLUDED.skills
    RETURNING *;
  `;
  const values = [
    s.id,
    s.classId || 'class-3a',
    s.rollNo,
    s.name,
    s.nameHi || s.name,
    s.age || 8,
    s.gender || 'other',
    s.status || 'unassessed',
    s.currentLevel || 'Grade 1.0',
    s.currentLevelHi || 'कक्षा 1.0',
    s.tarlGroup || 'Group A — Beginner',
    s.tarlGroupHi || 'समूह क — शुरुआती',
    s.attendance || '90%',
    s.primaryGap || '',
    s.primaryGapHi || '',
    s.secondaryGap || '',
    s.secondaryGapHi || '',
    JSON.stringify(s.skills || {})
  ];
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function insertAssessment(a) {
  const query = `
    INSERT INTO assessments (
      id, student_id, test_date, literacy_score, numeracy_score, 
      wcpm, accuracy, math_problem, math_student_ans, math_correct, 
      detected_misconception, tarl_recommendation
    )
    VALUES ($1, $2, NOW(), $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;
  const values = [
    a.id || `ass-${Date.now()}`,
    a.studentId,
    a.literacyScore || 0,
    a.numeracyScore || 0,
    a.wcpm || 0,
    a.accuracy || 0,
    a.mathProblem || '52 - 27',
    a.mathStudentAns || '',
    a.mathCorrect ?? false,
    JSON.stringify(a.detectedMisconception || {}),
    a.tarlRecommendation || ''
  ];
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function upsertTeacher(t) {
  const query = `
    INSERT INTO teachers (id, name, email, phone, school_name, district, state)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      school_name = EXCLUDED.school_name,
      district = EXCLUDED.district,
      state = EXCLUDED.state,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone
    RETURNING *;
  `;
  const values = [
    t.id || 'tch-1',
    t.name,
    t.email || null,
    t.phone || null,
    t.school || t.school_name || 'Rajkiya Vidyalaya',
    t.district || 'Bilaspur',
    t.state || 'Chhattisgarh'
  ];
  const res = await pool.query(query, values);
  return res.rows[0];
}

export async function upsertClass(c) {
  const query = `
    INSERT INTO classes (id, teacher_id, name, grade, section, academic_year)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      grade = EXCLUDED.grade,
      section = EXCLUDED.section,
      academic_year = EXCLUDED.academic_year
    RETURNING *;
  `;
  const values = [
    c.id || `class-${Date.now()}`,
    c.teacherId || 'tch-1',
    c.name,
    c.grade,
    c.section,
    c.academicYear || '2025-2026'
  ];
  const res = await pool.query(query, values);
  return res.rows[0];
}

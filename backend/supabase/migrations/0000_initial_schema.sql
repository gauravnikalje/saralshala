-- Create the schema for the School Administration Software

-- Teachers Table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(50) DEFAULT 'teacher'
);

-- Classes Table
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- e.g., 'Class 10 A'
    class_teacher_id UUID REFERENCES teachers(id)
);

-- Students Table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    roll_number VARCHAR(20) NOT NULL,
    class_id INTEGER REFERENCES classes(id),
    parent_phone_number VARCHAR(20)
);

-- Timetable Table
CREATE TABLE timetable (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id),
    teacher_id UUID REFERENCES teachers(id),
    subject VARCHAR(255) NOT NULL,
    day_of_week INTEGER NOT NULL, -- 1 for Monday, 7 for Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

-- Attendance Records Table
CREATE TABLE attendance_records (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    class_id INTEGER REFERENCES classes(id),
    teacher_id UUID REFERENCES teachers(id),
    date DATE NOT NULL,
    is_present BOOLEAN NOT NULL DEFAULT true,
    timetable_id INTEGER REFERENCES timetable(id)
);

-- Notices Table
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    posted_by_id UUID REFERENCES teachers(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Seen Notices Table (to track which teacher has seen which notice)
CREATE TABLE seen_notices (
    id SERIAL PRIMARY KEY,
    notice_id INTEGER REFERENCES notices(id),
    teacher_id UUID REFERENCES teachers(id),
    seen_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(notice_id, teacher_id)
);

-- Grades Table
CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    class_id INTEGER REFERENCES classes(id),
    subject VARCHAR(255) NOT NULL,
    exam_name VARCHAR(255) NOT NULL,
    marks INTEGER NOT NULL
);


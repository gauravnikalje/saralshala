-- Authentication enhancements for role-based access control

-- Enable Row Level Security on all tables
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE seen_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Create policies for teachers table
-- Teachers can view their own profile
CREATE POLICY "Teachers can view own profile" ON teachers
    FOR SELECT
    USING (auth.uid() = id);

-- Principals (identified by role = 'principal') can view all teachers
CREATE POLICY "Principals can view all teachers" ON teachers
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE id = auth.uid() 
            AND role = 'principal'
        )
    );

-- Principals can update teacher information
CREATE POLICY "Principals can update teachers" ON teachers
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE id = auth.uid() 
            AND role = 'principal'
        )
    );

-- Create policies for classes table
-- All authenticated users can view classes
CREATE POLICY "Authenticated users can view classes" ON classes
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Only principals can manage classes
CREATE POLICY "Principals can manage classes" ON classes
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE id = auth.uid() 
            AND role = 'principal'
        )
    );

-- Create policies for students table
-- Teachers can view students in their classes
CREATE POLICY "Teachers can view their class students" ON students
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM classes 
            WHERE classes.id = students.class_id 
            AND classes.class_teacher_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE id = auth.uid() 
            AND role = 'principal'
        )
    );

-- Create policies for attendance_records table
-- Teachers can create and view attendance for their classes
CREATE POLICY "Teachers can manage their class attendance" ON attendance_records
    FOR ALL
    USING (
        teacher_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE id = auth.uid() 
            AND role = 'principal'
        )
    );

-- Create policies for notices table
-- All authenticated users can view notices
CREATE POLICY "All users can view notices" ON notices
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Only principals can create notices
CREATE POLICY "Principals can create notices" ON notices
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE id = auth.uid() 
            AND role = 'principal'
        )
    );

-- Create policies for seen_notices table
-- Users can mark notices as seen
CREATE POLICY "Users can mark notices as seen" ON seen_notices
    FOR ALL
    USING (teacher_id = auth.uid());

-- Create policies for grades table
-- Teachers can manage grades for their subjects
CREATE POLICY "Teachers can manage grades" ON grades
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM timetable 
            WHERE timetable.class_id = grades.class_id 
            AND timetable.subject = grades.subject
            AND timetable.teacher_id = auth.uid()
        )
        OR
        EXISTS (
            SELECT 1 FROM teachers 
            WHERE id = auth.uid() 
            AND role = 'principal'
        )
    );

-- Create a function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
BEGIN
    RETURN (
        SELECT role FROM teachers WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

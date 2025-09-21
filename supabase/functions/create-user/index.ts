import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // Verify that the request is from an authenticated principal
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const supabaseAdmin = createClient(
      Deno.env.get('NEXT_PUBLIC_SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify the requesting user is a principal
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if the user is a principal
    const { data: teacherData } = await supabaseAdmin
      .from('teachers')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!teacherData || teacherData.role !== 'principal') {
      throw new Error('Only principals can create users')
    }

    const { email, password, name, phone_number, role } = await req.json()

    // Validate required fields
    if (!email || !password || !name || !role) {
      throw new Error('Missing required fields: email, password, name, role')
    }

    // Validate role
    if (role !== 'teacher' && role !== 'principal') {
      throw new Error('Invalid role. Must be "teacher" or "principal"')
    }

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      throw authError
    }

    // Create teacher record
    const { data: newTeacher, error: teacherError } = await supabaseAdmin
      .from('teachers')
      .insert([{ 
        id: authData.user.id, 
        name, 
        email, 
        phone_number: phone_number || null, 
        role: role || 'teacher' 
      }])
      .select()
      .single()

    if (teacherError) {
      // If teacher creation fails, delete the auth user to maintain consistency
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      throw teacherError
    }

    return new Response(JSON.stringify({ 
      success: true, 
      user: newTeacher 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: error.message === 'Unauthorized' || error.message === 'Only principals can create users' ? 403 : 400,
    })
  }
})


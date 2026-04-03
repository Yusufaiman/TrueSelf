import { createClient as createServerClient } from '@/utils/supabase/server'
import { createClient as createBrowserClient } from '@/utils/supabase/client'
import { cookies } from 'next/headers'

export interface TestResult {
  id: string
  user_id: string
  test_type: 'test_1' | 'test_2' | 'test_3' | 'test_4'
  scores: Record<string, number>
  result: {
    title: string
    description?: string
    pattern?: string
    strengths?: string[] | Record<string, number>
    weaknesses?: string[] | Record<string, number>
    insights?: string[]
    identityResonance?: string[]
    relatedPersonalities?: string[]
    scores?: Record<string, number>
    [key: string]: any
  }
  created_at: string
  updated_at?: string
}

/**
 * Save test result to database (browser client)
 * Used in test result pages
 */
export async function saveTestResult(
  testType: 'test_1' | 'test_2' | 'test_3' | 'test_4',
  scores: Record<string, number>,
  result: any
) {
  try {
    const supabase = createBrowserClient()
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('No user authenticated')
      return null
    }

    // Insert result
    const { data, error } = await supabase.from('test_results').insert([
      {
        user_id: user.id,
        test_type: testType,
        scores,
        result,
        created_at: new Date().toISOString(),
      },
    ]).select()

    if (error) {
      console.error('Error saving test result:', error)
      return null
    }

    return data?.[0] || null
  } catch (err) {
    console.error('Exception saving test result:', err)
    return null
  }
}

/**
 * Fetch all test results for current user (server)
 * Used in dashboard
 */
export async function getUserResults() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return []
    }

    // Fetch results
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching results:', error)
      return []
    }

    return (data as TestResult[]) || []
  } catch (err) {
    console.error('Exception fetching results:', err)
    return []
  }
}

/**
 * Get latest result for each test type
 */
export async function getLatestResults() {
  try {
    const results = await getUserResults()
    const latestByType: Record<string, TestResult> = {}

    results.forEach((result) => {
      if (!latestByType[result.test_type]) {
        latestByType[result.test_type] = result
      }
    })

    return latestByType
  } catch (err) {
    console.error('Exception getting latest results:', err)
    return {}
  }
}

/**
 * Get current user (server)
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(cookieStore)
    
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (err) {
    console.error('Exception getting current user:', err)
    return null
  }
}

/**
 * Sign out user (browser)
 */
export async function signOut() {
  try {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    return true
  } catch (err) {
    console.error('Exception signing out:', err)
    return false
  }
}

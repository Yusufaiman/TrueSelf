/**
 * Client-side auth utilities
 * Safe to use in Client Components
 */
import { createClient } from "@/utils/supabase/client";

/**
 * Get current user session (client)
 */
export async function getClientAuth() {
  try {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (err) {
    console.error("Exception getting session:", err);
    return null;
  }
}

/**
 * Get current user (client)
 */
export async function getClientUser() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    console.error("Exception getting user:", err);
    return null;
  }
}

/**
 * Sign out user (client)
 */
export async function clientSignOut() {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
    return true;
  } catch (err) {
    console.error("Exception signing out:", err);
    return false;
  }
}

/**
 * Update user profile (name, email)
 */
export async function updateProfile(data: {
  displayName?: string;
  email?: string;
}) {
  try {
    const supabase = createClient();
    const updateData: Record<string, any> = {};

    if (data.displayName) {
      updateData.data = { display_name: data.displayName };
    }
    if (data.email) {
      updateData.email = data.email;
    }

    const { data: result, error } = await supabase.auth.updateUser(updateData);

    if (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: error.message };
    }

    return { success: true, user: result.user };
  } catch (err) {
    console.error("Exception updating profile:", err);
    return { success: false, error: "Failed to update profile" };
  }
}

/**
 * Change password
 */
export async function changePassword(newPassword: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      console.error("Error changing password:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Exception changing password:", err);
    return { success: false, error: "Failed to change password" };
  }
}

// services/authService.js
import { useState } from 'react';

/**
 * Authentication service for handling user login, session management and role-based access
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Sign in with email and password
   * @param {string} email User's email
   * @param {string} password User's password
   * @param {string} role User's role (admin, doctor, staff)
   * @returns {Promise} Promise resolving to the initial authentication step
   */
  const signIn = async (email, password, role) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real application, this would be an API call to your backend
      // This is just a simulated delay with mock response
      return new Promise((resolve) => {
        setTimeout(() => {
          // Validate the credentials and generate a session token
          // This is just a mock implementation
          const mockSessionToken = btoa(`${email}:${Date.now()}`);
          
          resolve({
            success: true,
            message: 'First authentication step successful',
            sessionToken: mockSessionToken,
            requireMFA: true
          });
          
          setLoading(false);
        }, 1000);
      });
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  /**
   * Verify MFA code and complete authentication
   * @param {string} code Verification code
   * @param {string} sessionToken Session token from first auth step
   * @param {string} role User's role
   * @returns {Promise} Promise resolving to the complete authentication
   */
  const verifyMFA = async (code, sessionToken, role) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real application, this would verify the MFA code with your backend
      return new Promise((resolve) => {
        setTimeout(() => {
          // This is just a mock implementation
          // In a real app, we'd validate the code and get user details from backend
          
          // User permissions based on role
          const permissions = {
            admin: ['manage_users', 'view_all_records', 'system_config', 'audit_logs', 'analytics'],
            doctor: ['view_medical_records', 'manage_prescriptions', 'view_test_results', 'basic_reporting'],
            staff: ['view_demographics', 'manage_appointments', 'view_insurance', 'patient_intake']
          };
          
          const userData = {
            id: `user-${Date.now()}`,
            email: sessionToken.split(':')[0], // Extract email from mock token
            role,
            name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            permissions: permissions[role] || [],
            sessionToken: `${sessionToken}-verified`
          };
          
          // Store user in state and sessionStorage
          setUser(userData);
          sessionStorage.setItem('user', JSON.stringify(userData));
          
          resolve({
            success: true,
            message: 'Authentication successful',
            user: userData
          });
          
          setLoading(false);
        }, 1000);
      });
    } catch (err) {
      setError('MFA verification failed. Please try again.');
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  /**
   * Check if user has specific permission
   * @param {string} permission Permission to check
   * @returns {boolean} Whether user has permission
   */
  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  /**
   * Sign out the current user
   */
  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  /**
   * Initialize auth from stored session
   */
  const initAuth = () => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        sessionStorage.removeItem('user');
      }
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    verifyMFA,
    signOut,
    hasPermission,
    initAuth
  };
};
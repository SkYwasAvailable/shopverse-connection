
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth?redirect=admin" />;
  }

  // If authenticated but not admin, show unauthorized message
  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                You don't have admin privileges to access this page.
              </AlertDescription>
            </Alert>
            
            <h2 className="text-2xl font-bold mb-4">How to become an admin?</h2>
            <p className="mb-4">
              To become an admin, you need to update your profile in the Supabase database directly.
              Update the <code>is_admin</code> field in your profile to <code>true</code>.
            </p>
            
            <p className="mb-6">
              You can do this by running the following SQL in your Supabase dashboard:
            </p>
            
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
              <code>
                UPDATE profiles SET is_admin = true WHERE id = '{user.id}';
              </code>
            </pre>
            
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If admin, show the admin dashboard
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - TechStore</title>
        <meta name="description" content="Admin dashboard for TechStore" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <AdminHeader 
              title="Admin Dashboard" 
              description="Manage your store's products and categories" 
            />
            <AdminTabs />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Admin;

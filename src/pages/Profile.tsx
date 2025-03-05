
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  
  const [name, setName] = useState(profile?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // If not logged in, redirect to login page
  if (!loading && !user) {
    return <Navigate to="/auth" />;
  }
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      await updateProfile({
        name,
        avatar_url: avatarUrl
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Your Profile - TechStore</title>
        <meta name="description" content="Manage your TechStore profile" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <Tabs defaultValue="profile">
                <TabsList className="mb-8">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="md:col-span-1">
                      <CardHeader>
                        <CardTitle>Your Info</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={profile?.avatar_url || ''} alt={profile?.name || ''} />
                          <AvatarFallback>
                            {profile?.name?.substring(0, 2).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-medium">{profile?.name || 'User'}</h3>
                        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
                        {profile?.is_admin && (
                          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded mt-2">
                            Admin
                          </span>
                        )}
                        <Button 
                          variant="outline" 
                          className="mt-6 w-full" 
                          onClick={signOut}
                        >
                          Sign Out
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>
                          Update your personal information
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                              id="name" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="avatar">Avatar URL</Label>
                            <Input 
                              id="avatar" 
                              value={avatarUrl} 
                              onChange={(e) => setAvatarUrl(e.target.value)}
                              placeholder="https://example.com/avatar.jpg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              value={user?.email || ''}
                              disabled
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="mt-4" 
                            disabled={isUpdating}
                          >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Orders</CardTitle>
                      <CardDescription>
                        View and track your orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center py-8 text-gray-500">
                        Order history will be implemented soon.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Profile;

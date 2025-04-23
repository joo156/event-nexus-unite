
import { useState, ChangeEvent } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Key, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    avatar: user?.avatar || ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!profileData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (profileData.password && profileData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }
    
    if (profileData.password !== profileData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Only update fields that have been changed
      const updateData: any = {};
      
      if (profileData.name !== user?.name) {
        updateData.name = profileData.name;
      }
      
      if (profileData.email !== user?.email) {
        updateData.email = profileData.email;
      }
      
      if (profileData.avatar !== user?.avatar) {
        updateData.avatar = profileData.avatar;
      }
      
      // Don't send empty password
      if (profileData.password) {
        // In a real app, you'd send this to the backend for secure handling
        updateData.password = profileData.password;
      }
      
      if (Object.keys(updateData).length > 0) {
        await updateUser(updateData);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2 text-white">Admin Profile</h1>
        <p className="text-gray-400 mb-8">Manage your account settings and preferences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="bg-secondary/50 text-white border-white/10 p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  {profileData.avatar ? (
                    <img 
                      src={profileData.avatar} 
                      alt={profileData.name} 
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-eventPrimary/20 flex items-center justify-center">
                      <User className="h-16 w-16 text-eventPrimary" />
                    </div>
                  )}
                  <Button 
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-eventPrimary hover:bg-eventSecondary"
                    size="icon"
                    type="button"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold text-white">{user?.name || "Admin User"}</h2>
                <p className="text-gray-400">{user?.email || "admin@eventnexus.com"}</p>
                <p className="mt-2 inline-block px-2 py-1 text-xs rounded-full bg-eventPrimary/20 text-eventPrimary">
                  Administrator
                </p>
              </div>
              
              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="text-sm uppercase text-gray-400 mb-4">Account Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-300">Admin Account</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-300">Email Verified</span>
                  </div>
                  <div className="flex items-center">
                    <Key className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-300">Full Access</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card className="bg-secondary/50 text-white border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-6 text-white">Edit Profile</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <div className="relative mt-1">
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="dark-input pl-10"
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="dark-input pl-10"
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="avatar" className="text-gray-300">Avatar URL</Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      value={profileData.avatar}
                      onChange={handleInputChange}
                      placeholder="https://example.com/avatar.jpg"
                      className="dark-input mt-1"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-lg font-medium mb-4 text-white">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="password" className="text-gray-300">New Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={profileData.password}
                            onChange={handleInputChange}
                            className="dark-input pl-10"
                            placeholder="Leave blank to keep current password"
                          />
                          <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                      </div>
                      
                      <div>
                        <Label htmlFor="confirmPassword" className="text-gray-300">Confirm New Password</Label>
                        <div className="relative mt-1">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={profileData.confirmPassword}
                            onChange={handleInputChange}
                            className="dark-input pl-10"
                          />
                          <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-eventPrimary hover:bg-eventSecondary btn-animated"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;

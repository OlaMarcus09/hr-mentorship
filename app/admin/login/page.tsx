"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: CONNECT TO BACKEND
    // const res = await fetch('BASE_URL/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // });
    
    // SIMULATION FOR NOW:
    setTimeout(() => {
      // Pretend we got a token
      localStorage.setItem("adminToken", "mock-jwt-token");
      setIsLoading(false);
      router.push("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
             <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Lock className="h-6 w-6" />
             </div>
          </div>
          <CardTitle className="text-2xl font-bold font-heading">Admin Access</CardTitle>
          <CardDescription>Enter your credentials to manage the platform</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@hrmentorship.com" 
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

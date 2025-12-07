import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MOCK_JOBS } from "@/data/mock";
import { Search, MapPin, Briefcase, Clock, DollarSign, Building } from "lucide-react";

export default function RemoteHRPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Hero Section (Two-Sided Marketplace) */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold font-heading">
            The <span className="text-cyan-400 italic">Marketplace</span> for HR Talent
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light font-body">
            Whether you need an Interim HR Manager for 3 months or a full-time Head of People, find them here.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 rounded-full h-12 text-lg">
              I want to Hire Talent
            </Button>
            <Button size="lg" variant="outline" className="text-cyan-400 border-cyan-500 hover:bg-cyan-950 px-8 rounded-full h-12 text-lg">
              I want to Find Work
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Job Board Section */}
      <section className="py-12 container mx-auto px-4">
        
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by role (e.g. Recruiter, Manager)" className="pl-10 border-none bg-slate-50 dark:bg-slate-800 h-11" />
          </div>
          <div className="relative w-full md:w-64">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Location" className="pl-10 border-none bg-slate-50 dark:bg-slate-800 h-11" />
          </div>
          <Button className="h-11 px-8 bg-primary">Find Jobs</Button>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold font-heading">Latest Opportunities</h2>
              <span className="text-sm text-muted-foreground">{MOCK_JOBS.length} jobs found</span>
            </div>

            {MOCK_JOBS.map((job) => (
              <Card key={job.id} className="hover:border-cyan-400 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary group-hover:text-cyan-600 transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-100">
                      {job.type}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {job.postedAt}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 dark:bg-slate-900/50 p-4 flex justify-between items-center border-t">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">Save Job</Button>
                  <Button size="sm" className="bg-primary">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Sidebar (Upsell) */}
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-bold font-heading mb-2 text-primary">Need a Contract Template?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Don't start a gig without protection. Download our standard HR Consultant Agreement.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                Go to Resources
              </Button>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 rounded-xl p-6">
              <h3 className="text-lg font-bold font-heading mb-2 text-cyan-800 dark:text-cyan-200">Verify a Company</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check our "Greylist" before you accept an offer to ensure the employer is verified.
              </p>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white">
                Check Greylist
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

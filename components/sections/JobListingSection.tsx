import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Building, Clock, DollarSign } from "lucide-react";
import { Job } from "@/types";

interface JobListingSectionProps {
  jobs: Job[];
  sidebar?: React.ReactNode;
}

export function JobListingSection({ jobs, sidebar }: JobListingSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold font-heading">Latest Opportunities</h2>
          <span className="text-sm text-muted-foreground">{jobs.length} jobs found</span>
        </div>

        {jobs.map((job) => (
          <Card key={job.id} className="hover:border-cyan-400 transition-colors cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-primary group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{job.title}</h3>
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

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
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
            <CardFooter className="bg-muted p-4 flex justify-between items-center border-t">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">Save Job</Button>
              <Button size="sm" className="bg-primary">Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {sidebar && (
        <div className="space-y-6">
          {sidebar}
        </div>
      )}
    </div>
  );
}

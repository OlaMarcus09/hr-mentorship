import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* Hero Banner */}
      <section className="relative py-20 text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
             backgroundImage: 'url("https://images.unsplash.com/photo-1423666639041-f142fcb93370?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-4">Contact Us</h1>
          <p className="text-base md:text-xl text-white/90 max-w-xl mx-auto font-light">
            Have questions about membership, events, or partnerships? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Info Cards */}
          <div className="space-y-4 lg:col-span-1">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-full text-cyan-600 dark:text-cyan-400">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold font-heading mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground">hello@hrmentorship.com</p>
                  <p className="text-sm text-muted-foreground">support@hrmentorship.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full text-purple-600 dark:text-purple-400">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold font-heading mb-1">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+234 800 123 4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9am - 5pm</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full text-orange-600 dark:text-orange-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold font-heading mb-1">Visit Us</h3>
                  <p className="text-sm text-muted-foreground">
                    123 Innovation Drive,<br />
                    Ikeja, Lagos, Nigeria.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold font-heading mb-6">Send a Message</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
                </div>
                <Button className="w-full md:w-auto h-12 px-8">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

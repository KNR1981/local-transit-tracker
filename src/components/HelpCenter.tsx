
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Phone, Mail, MessageSquare, Send } from "lucide-react";

interface HelpCenterProps {
  onBack: () => void;
}

const HelpCenter = ({ onBack }: HelpCenterProps) => {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    message: "",
    email: "",
    phone: ""
  });

  const handleSubmitTicket = () => {
    if (!ticketForm.subject || !ticketForm.message || !ticketForm.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Here you would typically submit to backend
    console.log("Submitting ticket:", ticketForm);
    alert("Support ticket submitted successfully! We'll get back to you soon.");
    setTicketForm({ subject: "", message: "", email: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Customer Support</div>
                  <div className="text-sm text-gray-600">+91 80 4040 4040</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Toll-Free Number</div>
                  <div className="text-sm text-gray-600">1800 425 4425</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium">Email Support</div>
                  <div className="text-sm text-gray-600">support@gamyam.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Phone className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium">Emergency Helpline</div>
                  <div className="text-sm text-gray-600">+91 90 0000 1234</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">Office Hours</h3>
                <p className="text-sm text-yellow-700">
                  Monday - Friday: 9:00 AM - 7:00 PM<br />
                  Saturday: 10:00 AM - 5:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Support Ticket */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Raise a Support Ticket
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={ticketForm.email}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={ticketForm.phone}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Please describe your issue in detail..."
                  rows={4}
                  required
                />
              </div>

              <Button onClick={handleSubmitTicket} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>

              <div className="text-sm text-gray-600 text-center">
                * Required fields
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium">How do I track my bus?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Select your route and bus, then use the "Track This Bus" feature to see real-time location.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-medium">Can I cancel my booking?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Yes, you can cancel your booking up to 30 minutes before departure time.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-medium">How do I get a refund?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Refunds are processed within 5-7 business days to your original payment method.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpCenter;

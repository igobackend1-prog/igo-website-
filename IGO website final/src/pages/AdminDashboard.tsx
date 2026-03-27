import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { LogOut, Users, MessageSquare, BookOpen, Phone, ChevronRight } from "lucide-react";

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [authTimeout, setAuthTimeout] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  // Failsafe: redirect to login if auth hangs for more than 8s
  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) {
        setAuthTimeout(true);
        navigate("/admin/login");
      }
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    const [enqRes, conRes] = await Promise.all([
      supabase.from("course_enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
    ]);
    if (enqRes.error) console.error("Failed to load course enquiries:", enqRes.error.message);
    if (conRes.error) console.error("Failed to load contacts:", conRes.error.message);
    setEnquiries(enqRes.data || []);
    setContacts(conRes.data || []);
    setLoadingData(false);
  };

  if (loading || !isAdmin) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );

  const stats = [
    { label: "Course Enquiries", value: enquiries.length, icon: BookOpen, color: "bg-primary/10 text-primary" },
    { label: "Contact Messages", value: contacts.length, icon: Phone, color: "bg-accent/20 text-accent-foreground" },
    { label: "Pending Enquiries", value: enquiries.filter(e => e.status === "pending").length, icon: MessageSquare, color: "bg-gold/20 text-foreground" },
  ];

  return (
    <div className="min-h-screen bg-muted pt-24 pb-12">
      <SEO title="Admin Dashboard" description="IGO Agritech Farms admin dashboard." noIndex />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome, {user?.email}</p>
          </div>
          <button onClick={() => { signOut(); navigate("/"); }} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-card transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-display font-bold">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Course Enquiries Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm mb-8">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Course Enquiries</h2>
            <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">{enquiries.length} total</span>
          </div>
          <div className="overflow-x-auto">
            {loadingData ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : enquiries.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No enquiries yet</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Course</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={e.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{e.name}</td>
                      <td className="px-6 py-4">{e.email}</td>
                      <td className="px-6 py-4">{e.phone}</td>
                      <td className="px-6 py-4">{e.course}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${e.status === "pending" ? "bg-gold/20 text-foreground" : "bg-primary/10 text-primary"}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Contact Messages Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Contact Messages</h2>
            <span className="text-xs px-3 py-1 bg-accent/20 text-accent-foreground rounded-full font-medium">{contacts.length} total</span>
          </div>
          <div className="overflow-x-auto">
            {loadingData ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : contacts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No messages yet</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Subject</th>
                    <th className="px-6 py-3">Message</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{c.name}</td>
                      <td className="px-6 py-4">{c.email}</td>
                      <td className="px-6 py-4">{c.subject || "—"}</td>
                      <td className="px-6 py-4 max-w-[300px] truncate">{c.message}</td>
                      <td className="px-6 py-4 text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

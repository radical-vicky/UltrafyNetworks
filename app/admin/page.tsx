"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Star,
  Briefcase,
  Wifi,
  Settings,
  Shield,
  Lock,
  Loader2,
  MessageCircle,
  TrendingUp,
  Camera,
  Sun,
  Zap,
  Truck,
  ArrowUpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  LogOut,
  Menu,
  X
} from 'lucide-react';

// ============ Types ============
interface Review {
  id: number;
  name: string;
  area: string;
  quote: string;
  rating: number;
  status: string;
  created_at: string;
}

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  icon: string;
  desc: string;
  status: string;
  posted_date: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  status: string;
}

interface Package {
  id: number;
  speed: string;
  price: string;
  originalPrice: string;
  accent: string;
  tag: string;
  popular: boolean;
}

// ============ Main Component ============
export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Data states
  const [reviews, setReviews] = useState<Review[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthorized(true);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch reviews
      const reviewsRes = await fetch('/api/admin/reviews');
      const reviewsData = await reviewsRes.json();
      if (reviewsData.success) setReviews(reviewsData.data);

      // Fetch jobs
      const jobsRes = await fetch('/api/careers/backup');
      const jobsData = await jobsRes.json();
      if (jobsData.success) setJobs(jobsData.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = 'admin123';
    if (password === adminPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('adminAuth', 'true');
      fetchAllData();
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthorized(false);
    setPassword('');
  };

  // ============ Login Screen ============
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950">Admin Dashboard</h2>
            <p className="text-slate-500 text-sm mt-1">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300"
            >
              Access Dashboard
            </button>

            <p className="text-xs text-slate-400 text-center mt-4">
              Protected area. Authorized personnel only.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ============ Stats ============
  const stats = {
    totalReviews: reviews.length,
    pendingReviews: reviews.filter(r => r.status === 'pending').length,
    approvedReviews: reviews.filter(r => r.status === 'approved').length,
    totalJobs: jobs.length,
    openJobs: jobs.filter(j => j.status === 'open').length,
  };

  // ============ Dashboard Content ============
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white rounded-xl shadow-lg border border-slate-100"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* ============ SIDEBAR ============ */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                UFN
              </div>
              <div>
                <h1 className="font-bold text-blue-950">UltrafyFiberNet</h1>
                <p className="text-xs text-slate-500">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <button
              onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'overview' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </button>

            <button
              onClick={() => { setActiveTab('reviews'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'reviews' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Star className="w-5 h-5" />
              <span className="font-medium">Reviews</span>
              {stats.pendingReviews > 0 && (
                <span className="ml-auto bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                  {stats.pendingReviews}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'jobs' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">Job Openings</span>
              <span className="ml-auto bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                {stats.openJobs}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('packages'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'packages' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Wifi className="w-5 h-5" />
              <span className="font-medium">Packages</span>
            </button>

            <button
              onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === 'services' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Services</span>
            </button>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* ============ MAIN CONTENT ============ */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'reviews' && 'Review Management'}
                {activeTab === 'jobs' && 'Job Openings'}
                {activeTab === 'packages' && 'Internet Packages'}
                {activeTab === 'services' && 'Services Management'}
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                {activeTab === 'overview' && 'Manage all aspects of your business'}
                {activeTab === 'reviews' && 'Approve and manage customer reviews'}
                {activeTab === 'jobs' && 'Create and manage job openings'}
                {activeTab === 'packages' && 'Manage internet packages and pricing'}
                {activeTab === 'services' && 'Manage service offerings'}
              </p>
            </div>
            <button
              onClick={fetchAllData}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === 'overview' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Reviews', value: stats.totalReviews, icon: Star, color: 'text-blue-950' },
                  { label: 'Pending Reviews', value: stats.pendingReviews, icon: Clock, color: 'text-amber-600' },
                  { label: 'Approved Reviews', value: stats.approvedReviews, icon: CheckCircle2, color: 'text-emerald-600' },
                  { label: 'Open Jobs', value: stats.openJobs, icon: Briefcase, color: 'text-blue-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                    </div>
                    <p className={`text-2xl sm:text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Review Pending Reviews', desc: `${stats.pendingReviews} reviews awaiting approval`, icon: Star, color: 'bg-amber-500', action: () => setActiveTab('reviews') },
                  { title: 'Add New Job Opening', desc: 'Create a new job listing', icon: Plus, color: 'bg-blue-500', action: () => setActiveTab('jobs') },
                  { title: 'Manage Packages', desc: 'Update pricing and plans', icon: Wifi, color: 'bg-emerald-500', action: () => setActiveTab('packages') },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-all duration-300 text-left group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-950">{item.title}</h3>
                    <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== REVIEWS TAB ===== */}
          {activeTab === 'reviews' && (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search reviews..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    />
                  </div>
                  <select className="px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm bg-white">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No reviews found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs">Name</th>
                        <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs hidden sm:table-cell">Review</th>
                        <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs">Rating</th>
                        <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs hidden xs:table-cell">Status</th>
                        <th className="text-right px-4 py-3 text-slate-600 font-semibold text-xs">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review) => (
                        <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-slate-800 text-sm">{review.name}</p>
                            <p className="text-xs text-slate-400">{review.area}</p>
                          </td>
                          <td className="px-4 py-3 text-slate-600 text-sm hidden sm:table-cell max-w-xs truncate">
                            {review.quote}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex text-yellow-400">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400" />
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden xs:table-cell">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              review.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                              review.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {review.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              {review.status === 'pending' && (
                                <>
                                  <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ===== JOBS TAB ===== */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-blue-950">Current Job Openings</h2>
                <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                  <Plus className="w-4 h-4" />
                  Add Job
                </button>
              </div>

              {jobs.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                  <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No job openings</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs">Title</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs hidden sm:table-cell">Department</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs hidden md:table-cell">Location</th>
                          <th className="text-left px-4 py-3 text-slate-600 font-semibold text-xs">Status</th>
                          <th className="text-right px-4 py-3 text-slate-600 font-semibold text-xs">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.map((job) => (
                          <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-800 text-sm">{job.title}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden sm:table-cell">{job.department}</td>
                            <td className="px-4 py-3 text-slate-600 text-sm hidden md:table-cell">{job.location}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'open' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {job.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== PACKAGES TAB ===== */}
          {activeTab === 'packages' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-blue-950">Internet Packages</h2>
                <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                  <Plus className="w-4 h-4" />
                  Add Package
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { speed: '5', price: '1,000', originalPrice: '1,500', tag: 'Starter', popular: false },
                  { speed: '8', price: '1,500', originalPrice: '2,000', tag: 'Most Popular', popular: true },
                  { speed: '15', price: '2,000', originalPrice: '2,500', tag: 'Standard', popular: false },
                  { speed: '30', price: '3,000', originalPrice: '4,000', tag: 'Premium', popular: false },
                ].map((pkg, i) => (
                  <div key={i} className={`bg-white rounded-xl sm:rounded-2xl shadow-lg border p-6 text-center ${pkg.popular ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-100'}`}>
                    {pkg.popular && (
                      <span className="text-xs bg-emerald-500 text-white px-3 py-1 rounded-full">Popular</span>
                    )}
                    <div className="text-3xl font-extrabold text-blue-950 mt-2">{pkg.speed}</div>
                    <div className="text-xs text-slate-500">Mbps</div>
                    <div className="text-xl font-bold text-blue-600 mt-2">KSh {pkg.price}</div>
                    <div className="text-xs text-slate-400 line-through">KSh {pkg.originalPrice}</div>
                    <div className="text-xs text-slate-500 mt-1">{pkg.tag}</div>
                    <div className="flex items-center justify-center gap-1 mt-4">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== SERVICES TAB ===== */}
          {activeTab === 'services' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-blue-950">Services</h2>
                <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Wifi, title: 'Internet Installation', category: 'Connectivity' },
                  { icon: Camera, title: 'CCTV Installation', category: 'Security' },
                  { icon: Shield, title: 'Electric Fence', category: 'Security' },
                  { icon: Sun, title: 'Solar Panels', category: 'Energy' },
                  { icon: Zap, title: 'Electrical Work', category: 'Electrical' },
                  { icon: Truck, title: 'Relocation', category: 'Support' },
                ].map((service, i) => (
                  <div key={i} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 p-5 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                          <service.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-950">{service.title}</h3>
                          <p className="text-xs text-slate-500">{service.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

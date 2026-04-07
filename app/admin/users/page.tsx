'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Search, 
  UserPlus, 
  Mail, 
  Shield, 
  Loader2, 
  X,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ShieldCheck,
  GraduationCap
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { inviteUser } from '@/app/actions/user-management'
import { cn } from '@/lib/utils'

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviting, setInviting] = useState(false)
  const [inviteError, setInviteError] = useState<string | null>(null)
  const [inviteSuccess, setInviteSuccess] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setUsers(data)
    setLoading(false)
  }

  const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInviting(true)
    setInviteError(null)
    setInviteSuccess(false)
    
    const formData = new FormData(e.currentTarget)
    const result = await inviteUser(formData)
    
    if (result.error) {
      setInviteError(result.error)
    } else {
      setInviteSuccess(true)
      setTimeout(() => {
        setIsInviteModalOpen(false)
        setInviteSuccess(false)
        fetchUsers()
      }, 2000)
    }
    setInviting(false)
  }

  const filtered = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">User Management</h1>
          <p className="text-primary-700/60 dark:text-primary-300/60 font-medium italic">Control administrative access and institutional roles across the platform.</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-800 text-white rounded-xl font-bold shadow-lg shadow-primary-900/10 hover:bg-primary-900 transition-all border border-primary-700"
        >
          <UserPlus size={18} />
          Invite User
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
        />
      </div>

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 size={40} className="text-primary-500 animate-spin" />
            <p className="text-sm font-bold text-primary-700/40 uppercase tracking-widest">Accessing User Command Center...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <Users size={48} className="text-primary-100 mb-4" />
            <p className="text-primary-900 dark:text-white font-bold text-lg mb-1">No users found</p>
            <p className="text-primary-700/60 dark:text-primary-300/60 text-sm italic font-medium underline underline-offset-4 decoration-primary-200">Start by inviting your first team member or scholar.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary-50 dark:border-primary-800/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-primary-700/50 tracking-[0.2em]">Member</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-primary-700/50 tracking-[0.2em]">Platform Role</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-primary-700/50 tracking-[0.2em]">Status</th>
                  <th className="px-8 py-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50/50 dark:divide-primary-800/20">
                {filtered.map((user) => (
                  <tr key={user.id} className="group hover:bg-primary-50/30 dark:hover:bg-primary-800/10 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 dark:text-primary-200 font-bold group-hover:scale-110 transition-transform">
                          {user.full_name?.substring(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary-900 dark:text-white">{user.full_name}</p>
                          <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium italic">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        user.role === 'admin' ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30" : "bg-primary-50 text-primary-600 border-primary-100 dark:bg-primary-950/30"
                      )}>
                        {user.role === 'admin' ? <ShieldCheck size={12} /> : <GraduationCap size={12} />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs text-primary-700/50 dark:text-primary-300/50 font-bold uppercase tracking-widest italic">
                       Active
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-primary-300 hover:text-primary-800 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !inviting && setIsInviteModalOpen(false)}
              className="absolute inset-0 bg-primary-950/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-primary-900 rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-8 md:p-10 text-center">
                <div className="inline-flex p-4 bg-primary-50 dark:bg-primary-950 rounded-2xl mb-6 text-primary-800 dark:text-primary-400">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-2xl font-black text-primary-900 dark:text-white uppercase tracking-tighter mb-2">Secure Invitation</h3>
                <p className="text-sm text-primary-700/60 dark:text-primary-300/60 mb-8 font-medium">Provision a new account with specific access rights.</p>

                <form onSubmit={handleInvite} className="space-y-6 text-left">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 px-2">Member Name</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                      <input
                        name="full_name"
                        type="text"
                        required
                        placeholder="e.g., Jane Smith"
                        className="w-full pl-12 pr-4 py-4 bg-primary-50 dark:bg-primary-950 border border-primary-100 dark:border-primary-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-800 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 px-2">Email Identity</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="email@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-primary-50 dark:bg-primary-950 border border-primary-100 dark:border-primary-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-800 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 px-2">Access Role</label>
                    <div className="relative">
                      <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                      <select
                        name="role"
                        className="w-full pl-12 pr-4 py-4 bg-primary-50 dark:bg-primary-950 border border-primary-100 dark:border-primary-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-800 transition-all text-sm font-bold appearance-none text-primary-900 dark:text-primary-100"
                        defaultValue="student"
                      >
                        <option value="student">Student / Scholar</option>
                        <option value="admin">Master Administrator</option>
                        <option value="staff">Foundation Staff</option>
                      </select>
                    </div>
                  </div>

                  {inviteError && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                      <AlertCircle size={16} />
                      {inviteError}
                    </div>
                  )}

                  {inviteSuccess && (
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                      <CheckCircle2 size={16} />
                      Invitation dispatched successfully!
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsInviteModalOpen(false)}
                      disabled={inviting}
                      className="flex-1 py-4 bg-gray-50 text-gray-400 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={inviting || inviteSuccess}
                      className="flex-2 py-4 bg-primary-800 text-white rounded-2xl font-bold text-sm hover:bg-primary-900 transition-all shadow-xl shadow-primary-900/20 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {inviting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Dispatch Invitation'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

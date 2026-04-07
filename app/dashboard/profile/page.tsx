
'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, GraduationCap, MapPin, Camera, Save, FileUp, CheckCircle2, Loader2, FileText, ShieldCheck, XCircle, Clock, AlertCircle } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const supabase = createClient()

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    const formData = new FormData(e.currentTarget)
    const updates = {
      full_name: formData.get('full_name'),
      admission_year: parseInt(formData.get('admission_year') as string),
    }

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id)

    if (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } else {
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setProfile({ ...profile, ...updates })
    }
    setSaving(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage({ type: '', text: '' })

    const fileExt = file.name.split('.').pop()
    const fileName = `${profile.id}/admission_letter.${fileExt}`
    const filePath = `${fileName}`

    // Upload to 'student-documents' bucket
    const { error: uploadError } = await supabase.storage
      .from('student-documents')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      setMessage({ type: 'error', text: 'Upload failed: ' + uploadError.message })
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('student-documents')
        .getPublicUrl(filePath)

      await supabase
        .from('profiles')
        .update({ 
          admission_letter_url: publicUrl,
          verification_status: 'submitted'
        })
        .eq('id', profile.id)

      setProfile({ ...profile, admission_letter_url: publicUrl, verification_status: 'submitted' })
      setMessage({ type: 'success', text: 'Admission letter uploaded! Verification pending.' })
    }
    setUploading(false)
  }

  if (loading) return <div className="p-20 text-center text-primary-700/50 uppercase tracking-widest font-bold text-xs">Loading Profile...</div>

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">My Profile</h1>
        <p className="text-primary-700/60 dark:text-primary-300/60">Manage your personal information and academic records.</p>
      </div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <Loader2 size={18} className="animate-spin" />}
          {message.text}
        </motion.div>
      )}

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm">
        <div className="h-32 bg-primary-800" />

        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-8 flex items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] bg-white dark:bg-primary-900 p-1 shadow-xl">
                <div className="w-full h-full rounded-[1.8rem] bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 dark:text-primary-300 text-4xl font-black">
                  {profile?.full_name?.substring(0, 2).toUpperCase() || 'ST'}
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-primary-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                <Camera size={18} />
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary-900 dark:text-white uppercase tracking-tight">{profile?.full_name}</h2>
              <p className="text-primary-700/60 dark:text-primary-300/60 font-medium capitalize">Student • Class of {profile?.admission_year}</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                <input
                  name="full_name"
                  type="text"
                  defaultValue={profile?.full_name}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1 text-primary-700/50">Email Address (Locked)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                <input
                  type="email"
                  defaultValue={profile?.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl text-sm transition-all opacity-60 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Admission Year</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                <input
                  name="admission_year"
                  type="number"
                  defaultValue={profile?.admission_year}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Verification Status Banner */}
            <div className="md:col-span-2">
              <div className={cn(
                "p-6 rounded-[2rem] border flex flex-col md:flex-row items-center justify-between gap-6 transition-all",
                profile?.verification_status === 'verified' ? "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-800" :
                profile?.verification_status === 'submitted' ? "bg-primary-50/50 border-primary-100 dark:bg-primary-950/10 dark:border-primary-800" :
                profile?.verification_status === 'rejected' ? "bg-red-50/50 border-red-100 dark:bg-red-950/10 dark:border-red-800" :
                "bg-gray-50 border-gray-100 dark:bg-gray-800/20 dark:border-gray-800 text-gray-400"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
                    profile?.verification_status === 'verified' ? "bg-emerald-100 text-emerald-600" :
                    profile?.verification_status === 'submitted' ? "bg-primary-100 text-primary-800" :
                    profile?.verification_status === 'rejected' ? "bg-red-100 text-red-600" :
                    "bg-gray-100 text-gray-400"
                  )}>
                    {profile?.verification_status === 'verified' ? <ShieldCheck size={24} /> :
                     profile?.verification_status === 'submitted' ? <Clock size={24} className="animate-pulse" /> :
                     profile?.verification_status === 'rejected' ? <AlertCircle size={24} /> :
                     <FileText size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-primary-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                      Verification Status: 
                      <span className={cn(
                        "text-[10px] font-black tracking-widest",
                        profile?.verification_status === 'verified' ? "text-emerald-600" :
                        profile?.verification_status === 'submitted' ? "text-primary-800 dark:text-primary-400" :
                        profile?.verification_status === 'rejected' ? "text-red-600" :
                        "text-gray-400"
                      )}>
                        {profile?.verification_status?.toUpperCase() || 'NOT STARTED'}
                      </span>
                    </p>
                    <p className="text-xs text-primary-700/60 dark:text-primary-300/60 font-medium">
                      {profile?.verification_status === 'verified' ? "Your account is officially verified for scholarship access." :
                       profile?.verification_status === 'submitted' ? "Admin is currently reviewing your admission documentation." :
                       profile?.verification_status === 'rejected' ? (profile?.verification_feedback || "Action required: Please re-upload your document.") :
                       "Please upload your admission letter to begin verification."}
                    </p>
                  </div>
                </div>
                {profile?.verification_status === 'verified' && (
                  <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20">
                    Trusted Scholar
                  </div>
                )}
              </div>
            </div>

            {/* Admission Letter Section */}
            <div className="md:col-span-2 p-6 rounded-3xl bg-primary-50 dark:bg-primary-900/10 border-2 border-dashed border-primary-200 dark:border-primary-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-primary-800 rounded-2xl flex items-center justify-center text-primary-800 dark:text-primary-300">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-primary-900 dark:text-white">Admission Letter</p>
                    <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium uppercase tracking-widest">PDF or Image Required</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {profile?.admission_letter_url && (
                    <a
                      href={profile.admission_letter_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-primary-800 hover:underline"
                    >
                      View Current
                    </a>
                  )}
                  <label className="cursor-pointer px-6 py-2.5 bg-white dark:bg-primary-800 text-primary-900 dark:text-white rounded-xl font-bold text-xs shadow-sm border border-primary-100 dark:border-primary-700 flex items-center gap-2 hover:bg-primary-50 transition-all">
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <FileUp size={16} />}
                    {profile?.admission_letter_url ? 'Replace Letter' : 'Upload Letter'}
                    <input type="file" className="hidden" accept="application/pdf,image/*" onChange={handleFileUpload} disabled={uploading} />
                  </label>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-primary-800 hover:bg-primary-900 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-900/10"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

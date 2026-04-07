'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Loader2, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  ChevronDown
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

interface Course {
  code: string
  title: string
  grade: string
  units: number
}

interface PerformanceRecord {
  id?: string
  student_id: string
  level: string
  semester: number
  courses: Course[]
  cgpa: number
  scale: number
}

export default function PerformancePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [records, setRecords] = useState<PerformanceRecord[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  // New Record State
  const [isAdding, setIsAdding] = useState(false)
  const [newRecord, setNewRecord] = useState<PerformanceRecord>({
    student_id: '',
    level: '100L',
    semester: 1,
    courses: [{ code: '', title: '', grade: 'A', units: 3 }],
    cgpa: 0,
    scale: 5.0
  })

  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      setProfile(profileData)
      setNewRecord(prev => ({ ...prev, student_id: user.id }))

      const { data: recordData } = await supabase
        .from('performance_records')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false })

      if (recordData) setRecords(recordData)
      setLoading(false)
    }
    fetchData()
  }, [])

  const addCourseLine = () => {
    setNewRecord({
      ...newRecord,
      courses: [...newRecord.courses, { code: '', title: '', grade: 'A', units: 3 }]
    })
  }

  const removeCourseLine = (index: number) => {
    setNewRecord({
      ...newRecord,
      courses: newRecord.courses.filter((_, i) => i !== index)
    })
  }

  const updateCourse = (index: number, field: keyof Course, value: any) => {
    const updatedCourses = [...newRecord.courses]
    updatedCourses[index] = { ...updatedCourses[index], [field]: value }
    setNewRecord({ ...newRecord, courses: updatedCourses })
  }

  const handleSaveRecord = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    const { data, error } = await supabase
      .from('performance_records')
      .upsert({
        ...newRecord,
        updated_at: new Date().toISOString()
      })
      .select()

    if (error) {
      if (error.code === '23505') {
        setMessage({ type: 'error', text: 'Record for this Level/Semester already exists.' })
      } else {
        setMessage({ type: 'error', text: 'Error saving record: ' + error.message })
      }
    } else {
      setMessage({ type: 'success', text: 'Performance record saved!' })
      setRecords([data[0], ...records.filter(r => r.level !== data[0].level || r.semester !== data[0].semester)])
      setIsAdding(false)
      
      // Update local profile status
      if (profile.is_performance_requested) {
        setProfile({ ...profile, is_performance_requested: false, performance_status: 'submitted' })
      }
    }
    setSaving(false)
  }

  if (loading) return <div className="p-20 text-center text-primary-700/50 uppercase tracking-widest font-bold text-xs">Loading records...</div>

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Academic Performance</h1>
          <p className="text-primary-700/60 dark:text-primary-300/60">Manage your course results and monitor your CGPA progress.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-800 hover:bg-primary-900 text-white rounded-xl font-bold transition-all shadow-lg"
        >
          {isAdding ? 'Cancel' : (
            <>
              <Plus size={18} />
              Add New Record
            </>
          )}
        </button>
      </div>

      {/* Admin Request Banner */}
      {profile?.is_performance_requested && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-amber-800">
            <Zap size={24} className="animate-pulse" />
            <p className="text-sm font-bold uppercase tracking-tight">An Admin has requested your updated performance records. Please submit them below.</p>
          </div>
        </motion.div>
      )}

      {message.text && (
        <motion.div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        }`}>
          <CheckCircle2 size={18} />
          {message.text}
        </motion.div>
      )}

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border-2 border-primary-100 dark:border-primary-800 p-8 shadow-xl space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary-900 dark:text-primary-100 uppercase tracking-widest">Level</label>
                  <select 
                    value={newRecord.level}
                    onChange={(e) => setNewRecord({...newRecord, level: e.target.value})}
                    className="w-full px-4 py-3 bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-xl outline-none font-bold text-sm"
                  >
                    {['100L', '200L', '300L', '400L', '500L', '600L', 'Graduated'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary-900 dark:text-primary-100 uppercase tracking-widest">Semester</label>
                  <select 
                    value={newRecord.semester}
                    onChange={(e) => setNewRecord({...newRecord, semester: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-xl outline-none font-bold text-sm"
                  >
                    <option value={1}>1st Semester</option>
                    <option value={2}>2nd Semester</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary-900 dark:text-primary-100 uppercase tracking-widest">Actual CGPA</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={newRecord.cgpa}
                    onChange={(e) => setNewRecord({...newRecord, cgpa: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-xl outline-none font-bold text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary-900 dark:text-primary-100 uppercase tracking-widest">CGPA Scale</label>
                  <select 
                    value={newRecord.scale}
                    onChange={(e) => setNewRecord({...newRecord, scale: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-xl outline-none font-bold text-sm"
                  >
                    <option value={4.0}>4.0 Scale</option>
                    <option value={5.0}>5.0 Scale</option>
                    <option value={7.0}>7.0 Scale</option>
                    <option value={100}>100% Scale</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-primary-100 dark:border-primary-800 pb-2">
                  <h4 className="text-sm font-black text-primary-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <BookOpen size={18} className="text-primary-500" />
                    Semester Courses
                  </h4>
                  <button 
                    onClick={addCourseLine}
                    className="text-xs font-bold text-primary-800 hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Course
                  </button>
                </div>

                <div className="space-y-3">
                  {newRecord.courses.map((course, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                      <div className="md:col-span-2">
                        <input 
                          placeholder="Code" 
                          value={course.code}
                          onChange={(e) => updateCourse(idx, 'code', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-primary-900/50 border border-primary-100 dark:border-primary-800 rounded-xl text-xs font-bold uppercase tracking-tight" 
                        />
                      </div>
                      <div className="md:col-span-6">
                        <input 
                          placeholder="Course Title" 
                          value={course.title}
                          onChange={(e) => updateCourse(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-primary-900/50 border border-primary-100 dark:border-primary-800 rounded-xl text-xs font-bold" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <select 
                          value={course.grade}
                          onChange={(e) => updateCourse(idx, 'grade', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-primary-900/50 border border-primary-100 dark:border-primary-800 rounded-xl text-xs font-bold"
                        >
                          {['A', 'B', 'C', 'D', 'E', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-1">
                        <input 
                          type="number" 
                          placeholder="Units" 
                          value={course.units}
                          onChange={(e) => updateCourse(idx, 'units', parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-primary-900/50 border border-primary-100 dark:border-primary-800 rounded-xl text-xs font-bold" 
                        />
                      </div>
                      <div className="md:col-span-1 text-right">
                        <button 
                          onClick={() => removeCourseLine(idx)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleSaveRecord}
                  disabled={saving}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Submit Performance Record
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary-900 dark:text-white flex items-center gap-2">
          <GraduationCap size={24} className="text-primary-800" />
          Previous Records
        </h3>
        
        {records.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800">
            <TrendingUp size={48} className="mx-auto text-primary-100 mb-4" />
            <p className="font-bold text-primary-700/50 uppercase tracking-widest text-sm">No academic records submitted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {records.map((record) => (
              <div key={record.id} className="bg-white dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800 p-6 flex items-center justify-between group hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 dark:text-primary-300 font-black text-lg">
                    {record.level}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary-900 dark:text-white uppercase tracking-tight">Semester {record.semester}</h4>
                    <p className="text-sm font-bold text-primary-700/50 dark:text-primary-300/50">{record.courses.length} Courses Logged</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-xs font-black text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest mb-1">Current CGPA</p>
                    <p className="text-2xl font-black text-primary-900 dark:text-white">
                      {record.cgpa} <span className="text-xs opacity-40">/ {record.scale}</span>
                    </p>
                  </div>
                  <button className="p-3 bg-primary-50 dark:bg-primary-800 rounded-xl text-primary-800 dark:text-primary-300 opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

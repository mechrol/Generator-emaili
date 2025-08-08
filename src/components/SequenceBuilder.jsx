import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Mail, Clock, ArrowRight, Trash2, Edit3, Play, Pause } from 'lucide-react'

const SequenceBuilder = ({ sequences, onAddSequence, generatedEmails }) => {
  const [showNewSequence, setShowNewSequence] = useState(false)
  const [newSequence, setNewSequence] = useState({
    name: '',
    description: '',
    emails: []
  })
  const [selectedEmails, setSelectedEmails] = useState([])

  const handleCreateSequence = () => {
    if (newSequence.name && selectedEmails.length > 0) {
      const sequenceData = {
        ...newSequence,
        emails: selectedEmails.map((emailId, index) => {
          const email = generatedEmails.find(e => e.id === emailId)
          return {
            ...email,
            sequencePosition: index + 1,
            delayDays: index === 0 ? 0 : (index * 3) // Default 3-day intervals
          }
        }),
        status: 'draft',
        totalEmails: selectedEmails.length
      }
      
      onAddSequence(sequenceData)
      setNewSequence({ name: '', description: '', emails: [] })
      setSelectedEmails([])
      setShowNewSequence(false)
    }
  }

  const toggleEmailSelection = (emailId) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    )
  }

  const SequenceCard = ({ sequence }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    
    return (
      <motion.div
        layout
        className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{sequence.name}</h3>
            <p className="text-gray-600 mb-3">{sequence.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>{sequence.totalEmails} emails</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{sequence.emails[sequence.emails.length - 1]?.delayDays || 0} days total</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                sequence.status === 'active' 
                  ? 'bg-green-100 text-green-700'
                  : sequence.status === 'paused'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {sequence.status}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn-secondary text-sm"
            >
              {isExpanded ? 'Collapse' : 'View Details'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 pt-4 mt-4"
            >
              <h4 className="font-semibold text-gray-800 mb-3">Email Sequence</h4>
              <div className="space-y-3">
                {sequence.emails.map((email, index) => (
                  <div key={email.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-white/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-800">{email.subject}</h5>
                        <span className="text-xs text-gray-500">
                          {email.delayDays === 0 ? 'Immediate' : `Day ${email.delayDays}`}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{email.body}</p>
                    </div>
                    {index < sequence.emails.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400 mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Email Sequences</h2>
          <p className="text-gray-600 mt-1">Create automated email sequences for your campaigns</p>
        </div>
        <button
          onClick={() => setShowNewSequence(true)}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Sequence
        </button>
      </div>

      {/* New Sequence Modal */}
      <AnimatePresence>
        {showNewSequence && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewSequence(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Sequence</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sequence Name
                  </label>
                  <input
                    type="text"
                    value={newSequence.name}
                    onChange={(e) => setNewSequence(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., SaaS Outreach Sequence"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newSequence.description}
                    onChange={(e) => setNewSequence(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of this sequence..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Emails ({selectedEmails.length} selected)
                  </label>
                  
                  {generatedEmails.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl">
                      <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No emails available</p>
                      <p className="text-sm text-gray-400">Generate some emails first</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {generatedEmails.map((email) => (
                        <div
                          key={email.id}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedEmails.includes(email.id)
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleEmailSelection(email.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 mb-1">{email.subject}</h4>
                              <p className="text-sm text-gray-600 line-clamp-1">{email.body}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  {email.tone}
                                </span>
                                <span className="text-xs text-gray-500">
                                  To: {email.recipientInfo.name}
                                </span>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedEmails.includes(email.id)
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedEmails.includes(email.id) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setShowNewSequence(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateSequence}
                    disabled={!newSequence.name || selectedEmails.length === 0}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Sequence
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sequences List */}
      {sequences.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No sequences yet</h3>
          <p className="text-gray-600 mb-6">Create your first email sequence to get started</p>
          <button
            onClick={() => setShowNewSequence(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create First Sequence
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {sequences.map((sequence) => (
            <SequenceCard key={sequence.id} sequence={sequence} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SequenceBuilder

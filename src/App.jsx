import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import EmailGenerator from './components/EmailGenerator'
import SequenceBuilder from './components/SequenceBuilder'
import EmailPreview from './components/EmailPreview'
import { Sparkles, Mail, Zap } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('generator')
  const [generatedEmails, setGeneratedEmails] = useState([])
  const [sequences, setSequences] = useState([])
  const [selectedEmail, setSelectedEmail] = useState(null)

  const addGeneratedEmail = (email) => {
    const newEmail = {
      id: Date.now(),
      ...email,
      createdAt: new Date().toISOString()
    }
    setGeneratedEmails(prev => [newEmail, ...prev])
  }

  const addSequence = (sequence) => {
    const newSequence = {
      id: Date.now(),
      ...sequence,
      createdAt: new Date().toISOString()
    }
    setSequences(prev => [newSequence, ...prev])
  }

  const tabs = [
    { id: 'generator', label: 'Email Generator', icon: Sparkles },
    { id: 'sequences', label: 'Sequences', icon: Mail },
    { id: 'preview', label: 'Preview', icon: Zap }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="glass-card rounded-2xl p-2 mb-8">
          <nav className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'generator' && (
              <EmailGenerator 
                onEmailGenerated={addGeneratedEmail}
                generatedEmails={generatedEmails}
                onSelectEmail={setSelectedEmail}
              />
            )}
            {activeTab === 'sequences' && (
              <SequenceBuilder 
                sequences={sequences}
                onAddSequence={addSequence}
                generatedEmails={generatedEmails}
              />
            )}
            {activeTab === 'preview' && (
              <EmailPreview 
                selectedEmail={selectedEmail}
                generatedEmails={generatedEmails}
                onSelectEmail={setSelectedEmail}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App

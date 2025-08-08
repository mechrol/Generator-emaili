import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Copy, Download, Plus, User, Building, Target, MessageSquare } from 'lucide-react'

const EmailGenerator = ({ onEmailGenerated, generatedEmails, onSelectEmail }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientCompany: '',
    recipientRole: '',
    senderName: '',
    senderCompany: '',
    purpose: '',
    tone: 'professional',
    industry: '',
    painPoint: '',
    valueProposition: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const tones = [
    { value: 'professional', label: 'Professional', desc: 'Formal and business-focused' },
    { value: 'friendly', label: 'Friendly', desc: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', desc: 'Relaxed and conversational' },
    { value: 'urgent', label: 'Urgent', desc: 'Time-sensitive and direct' }
  ]

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const generateEmail = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const templates = [
      {
        subject: `Quick question about ${formData.recipientCompany}'s ${formData.painPoint || 'growth strategy'}`,
        body: `Hi ${formData.recipientName},

I noticed ${formData.recipientCompany} has been expanding rapidly in the ${formData.industry || 'tech'} space. Impressive work on your recent initiatives!

I'm ${formData.senderName} from ${formData.senderCompany}. We've helped similar companies like yours ${formData.valueProposition || 'streamline their operations and increase efficiency by 40%'}.

${formData.painPoint ? `I imagine dealing with ${formData.painPoint} might be challenging at your scale.` : 'I imagine scaling operations while maintaining quality might be challenging at your current growth rate.'}

Would you be open to a brief 15-minute call this week to discuss how we've helped companies like ${formData.recipientCompany} overcome similar challenges?

Best regards,
${formData.senderName}
${formData.senderCompany}`
      },
      {
        subject: `${formData.recipientName}, loved your recent work at ${formData.recipientCompany}`,
        body: `Hi ${formData.recipientName},

I came across ${formData.recipientCompany}'s recent ${formData.industry || 'product launch'} and was genuinely impressed by the innovation you're bringing to the market.

I'm ${formData.senderName}, and I work with ${formData.recipientRole || 'executives'} at companies like yours to ${formData.valueProposition || 'optimize their growth strategies'}.

${formData.painPoint ? `Many leaders I speak with mention ${formData.painPoint} as a key challenge.` : 'Many leaders I speak with are looking for ways to scale more efficiently.'} We've developed a unique approach that's helped companies achieve remarkable results.

Would you be interested in a quick conversation about how this might apply to ${formData.recipientCompany}?

Looking forward to connecting,
${formData.senderName}`
      }
    ]

    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    
    const generatedEmail = {
      ...randomTemplate,
      tone: formData.tone,
      recipientInfo: {
        name: formData.recipientName,
        company: formData.recipientCompany,
        role: formData.recipientRole
      },
      senderInfo: {
        name: formData.senderName,
        company: formData.senderCompany
      },
      metadata: {
        industry: formData.industry,
        purpose: formData.purpose,
        painPoint: formData.painPoint,
        valueProposition: formData.valueProposition
      }
    }

    onEmailGenerated(generatedEmail)
    setIsGenerating(false)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Generator Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-2xl p-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Generate Email</h2>
        </div>

        <div className="space-y-6">
          {/* Recipient Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <User className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-800">Recipient Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="recipientName"
                placeholder="Recipient Name"
                value={formData.recipientName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <input
                type="text"
                name="recipientRole"
                placeholder="Their Role/Title"
                value={formData.recipientRole}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            
            <input
              type="text"
              name="recipientCompany"
              placeholder="Their Company"
              value={formData.recipientCompany}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Sender Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Building className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-800">Your Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="senderName"
                placeholder="Your Name"
                value={formData.senderName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <input
                type="text"
                name="senderCompany"
                placeholder="Your Company"
                value={formData.senderCompany}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Campaign Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-800">Campaign Details</h3>
            </div>
            
            <input
              type="text"
              name="industry"
              placeholder="Industry/Niche"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            
            <textarea
              name="painPoint"
              placeholder="What pain point are you addressing?"
              value={formData.painPoint}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            />
            
            <textarea
              name="valueProposition"
              placeholder="Your value proposition"
              value={formData.valueProposition}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Tone Selection */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-800">Email Tone</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {tones.map((tone) => (
                <label
                  key={tone.value}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.tone === tone.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={tone.value}
                    checked={formData.tone === tone.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="font-medium text-gray-800">{tone.label}</div>
                  <div className="text-sm text-gray-600">{tone.desc}</div>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={generateEmail}
            disabled={isGenerating || !formData.recipientName || !formData.senderName}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Generate Email</span>
              </div>
            )}
          </button>
        </div>
      </motion.div>

      {/* Generated Emails List */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Generated Emails</h2>
        
        {generatedEmails.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No emails generated yet</p>
            <p className="text-sm text-gray-400 mt-1">Fill out the form and generate your first email</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {generatedEmails.map((email) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/50 rounded-xl p-4 border border-gray-200/50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => onSelectEmail(email)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-800 line-clamp-1">{email.subject}</h3>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`)
                      }}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{email.body}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">
                    To: {email.recipientInfo.name} at {email.recipientInfo.company}
                  </span>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {email.tone}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default EmailGenerator

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download, Send, Eye, Code, Smartphone } from 'lucide-react'

const EmailPreview = ({ selectedEmail, generatedEmails, onSelectEmail }) => {
  const [viewMode, setViewMode] = useState('preview') // preview, html, mobile
  const [selectedEmailFromList, setSelectedEmailFromList] = useState(selectedEmail)

  const currentEmail = selectedEmailFromList || selectedEmail || (generatedEmails && generatedEmails[0])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const downloadAsText = (email) => {
    const content = `Subject: ${email.subject}\n\n${email.body}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-${email.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatEmailAddress = (name, company) => {
    if (!name || !company) return ''
    const emailName = name.toLowerCase().replace(/ /g, '.')
    const emailDomain = company.toLowerCase().replace(/ /g, '')
    return `${emailName}@${emailDomain}.com`
  }

  const generateHTMLVersion = (email) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${email.subject}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .email-header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 20px; }
        .email-body { white-space: pre-line; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
    </style>
</head>
<body>
    <div class="email-header">
        <h1 style="margin: 0; font-size: 24px; color: #1f2937;">${email.subject}</h1>
        <p style="margin: 10px 0 0 0; color: #6b7280;">From: ${email.senderInfo.name} <${formatEmailAddress(email.senderInfo.name, email.senderInfo.company)}></p>
        <p style="margin: 5px 0 0 0; color: #6b7280;">To: ${email.recipientInfo.name} <${formatEmailAddress(email.recipientInfo.name, email.recipientInfo.company)}></p>
    </div>
    <div class="email-body">${email.body}</div>
</body>
</html>`
  }

  if (!currentEmail) {
    return (
      <div className="glass-card rounded-2xl p-8">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Eye className="w-10 h-10 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No email selected</h3>
          <p className="text-gray-600">Generate an email or select one from your list to preview it here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Email List Sidebar */}
      <div className="lg:col-span-1">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Your Emails</h3>
          
          {generatedEmails.length === 0 ? (
            <p className="text-sm text-gray-500">No emails generated yet</p>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {generatedEmails.map((email) => (
                <motion.div
                  key={email.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    currentEmail.id === email.id
                      ? 'bg-primary-50 border-2 border-primary-200'
                      : 'bg-white/50 border border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedEmailFromList(email)
                    if (onSelectEmail) onSelectEmail(email)
                  }}
                >
                  <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                    {email.subject}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-1">
                    To: {email.recipientInfo.name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {email.tone}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(email.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="lg:col-span-3">
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Preview Header */}
          <div className="bg-white/80 border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Email Preview</h2>
              
              <div className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === 'preview' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('html')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === 'html' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      viewMode === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(`Subject: ${currentEmail.subject}\n\n${currentEmail.body}`)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => downloadAsText(currentEmail)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                    title="Download as text"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="btn-primary">
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </button>
                </div>
              </div>
            </div>

            {/* Email Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">From:</span>
                <p className="font-medium text-gray-800">
                  {currentEmail.senderInfo.name} ({currentEmail.senderInfo.company})
                </p>
              </div>
              <div>
                <span className="text-gray-500">To:</span>
                <p className="font-medium text-gray-800">
                  {currentEmail.recipientInfo.name} ({currentEmail.recipientInfo.company})
                </p>
              </div>
              <div>
                <span className="text-gray-500">Tone:</span>
                <p className="font-medium text-gray-800 capitalize">{currentEmail.tone}</p>
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            {viewMode === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div className="p-6">
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentEmail.subject}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>From:</strong> {`${currentEmail.senderInfo.name} <${formatEmailAddress(currentEmail.senderInfo.name, currentEmail.senderInfo.company)}>`}
                      </p>
                      <p>
                        <strong>To:</strong> {`${currentEmail.recipientInfo.name} <${formatEmailAddress(currentEmail.recipientInfo.name, currentEmail.recipientInfo.company)}>`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                      {currentEmail.body}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {viewMode === 'html' && (
              <motion.div
                key="html"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900 rounded-xl p-6 overflow-x-auto"
              >
                <pre className="text-green-400 text-sm font-mono">
                  <code>{generateHTMLVersion(currentEmail)}</code>
                </pre>
              </motion.div>
            )}

            {viewMode === 'mobile' && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <div className="w-80 bg-gray-900 rounded-3xl p-2">
                  <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {currentEmail.senderInfo.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {currentEmail.senderInfo.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {currentEmail.subject}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                        {currentEmail.body}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailPreview

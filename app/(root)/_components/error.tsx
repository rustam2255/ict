import { Code } from 'lucide-react'
import React from 'react'

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
              <Code className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 text-lg font-medium">Failed to load projects</p>
            <p className="text-slate-400 text-sm mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
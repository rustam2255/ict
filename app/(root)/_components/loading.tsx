import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="animate-spin w-12 h-12 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-12 h-12 border border-emerald-400/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
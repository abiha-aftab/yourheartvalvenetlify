import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

import Dropdown from './Dropdown'
import List from './List'

const SidebarDefault = ({ sidebarLinks = null }) => {
  const [isOpen, setIsOpen] = useState(true)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', null)
    }
  })
  if (!sidebarLinks) return
  return (
    <aside className="sidebarDefault">
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} />
      <AnimatePresence>
        {isOpen && <List sidebarLinks={sidebarLinks} />}
      </AnimatePresence>
    </aside>
  )
}

export default SidebarDefault

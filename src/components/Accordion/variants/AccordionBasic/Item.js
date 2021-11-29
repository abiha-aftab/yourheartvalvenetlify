import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const AccordionItem = ({ item, index, isActive, setIsActive }) => {
  const {
    title: {value: title},
    description: {value: body}
  } = item.elements

  const toggleActiveTab = (index) => {
    if (isActive === index) {
      setIsActive(null);
    } else {
      setIsActive(index)
    }
  }

  const accordionVariant = {
    collapsed: {
      height: 0,
      opacity: 0,
    },
    open: {
      height: "auto",
      opacity: 1,
    },

  }

  return (
    <div className={isActive === index ? "accordionBasic__item accordionBasic__item--active" : "accordionBasic__item"} >
      <button className="accordionBasic__button" onClick={() => toggleActiveTab(index)} aria-expanded={isActive === index ? "true" : "false"}>{title}</button>
      <AnimatePresence initial={false}>{isActive === index && <motion.div key={index} variants={accordionVariant} initial="collapsed" animate="open" exit="collapsed" transition={{ duration: .5 }} className="accordionBasic__body">
        <div className="accordionBasic__content">
          <RichTextElement value={body} />
        </div>
      </motion.div>}</AnimatePresence>

    </div>
  )
}

export default AccordionItem

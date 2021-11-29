import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { modalVariants } from '../../assets/animations/animations'
import { backdropVariants } from '../../assets/animations/animations'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

const useDisableBodyScroll = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}

let useClickOutside = (handler) => {
  let domNode = useRef()
  useEffect(() => {
    let mouseDownHandler = (event) => {
      if (!domNode?.current?.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', mouseDownHandler)
    return () => {
      document.removeEventListener('mousedown', mouseDownHandler)
    }
  })
  return domNode
}

const Modal = ({ modalData, trigger }) => {
  const { elements } = modalData[0]
  const { body } = elements
  const [showModal, setShowModal] = useState(false);
  //disable the scroll when modal is open
  useDisableBodyScroll(showModal)

  //modal should close when clicked outside
  let domNode = useClickOutside(() => {
    setShowModal(false)
  })

  //modal should close when escape is pressed
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  })
  return (
    <>
      <button
        className="btn btn-blue"
        onClick={() => setShowModal(true)}
        tabIndex={0}
      >
        {trigger}
      </button>
      <AnimatePresence exitBeforeEnter>
        {showModal && (
          <motion.div
            className="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div className="modal" variants={modalVariants} aria-modal="true" role="dialog">
              <div className="modal__content" ref={domNode}>
                <div className="modal__header">
                  <h3 className="modal__title">{elements.title.value}</h3>
                  <button
                    className="modal__close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="modal__body">
                  <RichTextElement value={body.value} />
                </div>
                <div className="modal__footer">
                  <button
                    type="button"
                    className="btn btn-crimson"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Modal

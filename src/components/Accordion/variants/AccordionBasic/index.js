import React, {useState} from 'react'
import AccordionItem from './Item'

const AccordionBasic = ({ data = null }) => {
  const [isActive, setIsActive] = useState(null)
  if (!data) return
  const { accordion_items: { value: accordion_items } } = data[0].elements
  return (
    <div className="accordionBasic">
      {accordion_items.map((item, index) => {
        return <AccordionItem item={item} key={index} index={index} isActive={isActive} setIsActive={setIsActive}/>
      })}
    </div>
  )
}

export default AccordionBasic

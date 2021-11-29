import React from 'react'
import AccordionBasic from '../../../../components/Accordion/variants/AccordionBasic'
import Modal from '../../../../components/Modal'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import FormBasic from '../../../../components/Form/variants/FormBasic'

const ContentsPageTemplate = ({
  path,
  body,
  accordions,
  modal,
  marketo_form,
  itemId,
  itemCodename,
}) => {
  return (
    <div data-kontent-item-id={id}>
      <div className="contentPage" data-kontent-element-codename={codename}>
        <RichTextElement value={body.value} />
      </div>
      {accordions.length > 0 && <AccordionBasic data={accordions} />}
      {modal.length > 0 &&
        (path.indexOf('heart-basics/') !== -1 ||
          path.indexOf('treatment-options/') !== -1) && (
          <Modal
            modalData={modal}
            trigger={
              modal[0].elements.toggle_text.value ||
              'This information is not a substitute for talking with your doctor.'
            }
          />
        )}
      {marketo_form.length > 0 && <FormBasic id="1277" />}
    </div>
  )
}

export default ContentsPageTemplate

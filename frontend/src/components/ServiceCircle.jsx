import React from 'react'

export default function ServiceCircle ({ imageSrc, altText, style }) {
  return (
    <div className='service-cirlce'>
      <img src={imageSrc} alt={altText} style={style}/>
    </div>
  )
}

import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'A MERN AI chatbot',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Built with OpenAI',
        1000,
        'Securely coded chatbot',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block', textShadow: "1px 1px 20px #000" }}
      repeat={Infinity}
    />
  )
}

export default TypingAnimation
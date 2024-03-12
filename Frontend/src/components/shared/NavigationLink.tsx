import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
  to: string;
  bg: string;
  text: string;
  textcolor: string;
  onClick?: () => Promise<void>
}

const NavigationLink = ({to, bg, text, textcolor, onClick}: Props) => {
  return (
    <Link className='nav-link' to={to} style={{background: bg, color: textcolor}} onClick={onClick}>{text}</Link>
  )
}

export default NavigationLink
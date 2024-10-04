import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'
import Menu from '../components/Menu'

function Home() {
  return (<>
    <div><Navbar/></div>
    <div className='bg-slate-900'><Carousal/></div>
    <div><Menu/></div>
    <div><Footer/></div>
    </>
  )
}

export default Home
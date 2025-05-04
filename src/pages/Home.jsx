import {React} from 'react'
import NavBar from '../components/navBar'
import Footer from '../components/footer'

export default function Home(){
    return (
        <>
        <NavBar/>
        <div style={{textAlign:'center','minHeight':'100vh'}}></div>
        <Footer/>
        </>
    )
}
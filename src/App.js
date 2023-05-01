import './App.css'
import { HomePage } from './Pages/HomePage'
import { AboutMePage } from './Pages/AboutMePage'
import { ContactPage } from './Pages/ContactPage'
import { ImageGalleryPage } from './Pages/ImageGalleryPage'
import { LinksPage } from './Pages/Linkspage'
import { MusicPage } from './Pages/Musicpage'
import NotFoundPage from './Pages/NotFoundPage'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import AudioPlayer from './components/Audio'
import { useState } from 'react'

function App() {
   const [isMuted, setIsMuted] = useState(true)

   const toggleMute = () => {
      setIsMuted(!isMuted)
   }

   return (
      <div className="App">
         <AudioPlayer isMuted={isMuted} toggleMute={toggleMute} />
         <BrowserRouter>
            <Routes>
               <Route exact path="/" element={<HomePage />} />
               <Route exact path="/about" element={<AboutMePage />} />
               <Route exact path="/contact" element={<ContactPage />} />
               <Route exact path="/gallery" element={<ImageGalleryPage />} />
               <Route exact path="/links" element={<LinksPage />} />
               <Route exact path="/music" element={<MusicPage />} />
               <Route exact path="*" element={<NotFoundPage />} />
            </Routes>
         </BrowserRouter>
      </div>
   )
}

export default App

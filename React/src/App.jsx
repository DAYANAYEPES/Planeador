import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { TaskPage } from './pages/TaskPage';
import { TaskFromPage } from './pages/TaskFromPage';
import { Navigation } from './components/Navigation';
import {Toaster} from  'react-hot-toast'

function App() {
  return (
   <BrowserRouter>
 <div className='container mx-auto'>
  <Navigation/>
    <Routes>
      <Route path="/" element={<Navigate to="/tasks"/>} />
      <Route path='/tasks' element={<TaskPage/>} />
      <Route path='/tasks-create' element={<TaskFromPage/>} />
      <Route path="/tasks/:id" element={<TaskFromPage/>} />

    </Routes>
    <Toaster/>  
 </div>
   </BrowserRouter>
  )
}

export default App;
import Weather from './component/Weather';
import img from './bridge.jpg';
import img1 from './house.jpg';
import img2 from './mount.jpg';
import img3 from './wave.jpg';

function App() {
  return (
   <div className=' py-8 px-6 bg-cover bg-center min-h-screen ' style={{backgroundImage: `url(${img2})`}}>
    <Weather/>
   </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';


function App() {
  return (
  // <ThemeProvider theme={theme}>
  //   <Navbar/>
  //   <CssBaseline/>
  // </ThemeProvider>
  <>
    <Navbar/>
    <Home/>
  </>
  );
}

export default App;

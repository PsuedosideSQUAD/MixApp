import React from 'react'
import Header from './Header.jsx'
import Main from './Main.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <div>
        <Header />  
        <Main />
    </div>
  </MuiThemeProvider>
)

export default App
import React from 'react'
import Header from './header/index.jsx'
import Body from './Body'
import Footer from './Footer'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appWrap : {
      }
    }
  }
  render() {
    return (
      <div >
        <Header></Header>
        <Body></Body>
        <Footer></Footer>       
      </div>
    )
  }
}

export default Layout

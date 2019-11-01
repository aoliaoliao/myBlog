import React from 'react'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </div>
    )
  }
}

export default Layout

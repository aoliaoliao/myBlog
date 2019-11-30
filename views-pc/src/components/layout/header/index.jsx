import React from 'react'
import { Grid, Dropdown , Divider, Image, Menu, Input } from 'semantic-ui-react'
import styles  from './index.module.scss'

class Header extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {
      activeMenu: 'article',
      menuList: [
        { id: 'article', name: '文章' },
        { id: 'moment', name: '动态' }
      ]
    }
  }
  render() {
    return (
      <div className={`${styles.headerWrap}`}> 
        <Grid centered >
          <Grid.Row stretched columns={3} textAlign="justified" className={styles.headerLimit}>
            <Grid.Column width={2}>
              <p className={styles.headerLogo}>BLOG</p>
            </Grid.Column>
            <Grid.Column width={12} className={styles.headerContainer} >
              <Menu secondary color='red'  >
                {
                  this.state.menuList.map( item => {
                    return <Menu.Item 
                    key={ item.id } 
                    id={ item.id  } 
                    name={ item.name } 
                    active={ item.id === this.state.activeMenu } 
                    onClick={ () => this.handleItemClick(item) } />
                  })
                }
                {/* <Menu.Item name='article' active/>
                <Menu.Item name='moment'/> */}
                <Menu.Item>
                  <Input icon='search' placeholder='Search...' />
                </Menu.Item>
              </Menu>
            </Grid.Column> 
            <Grid.Column width={2}>
              <div className={styles.headerUser} >
                <Image src={ require('@/assets/images/user_avatar.jpg') } avatar />
                <Dropdown inline text='UserName'>
                  <Dropdown.Menu>                    
                    <Dropdown.Item text='Download As...' />
                    <Dropdown.Item text='Publish To Web' />
                    <Dropdown.Item text='E-mail Collaborators' />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Grid.Column>
          </Grid.Row>
          
        </Grid>
        <Divider />
      </div>      
    )
  }

  handleItemClick( item ) {
    this.setState({
      activeMenu: item.id
    })
  }
}

export default Header

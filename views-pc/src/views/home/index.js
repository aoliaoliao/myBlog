import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

const Layout = () => (
  
  <div fluid={true} style={{border: '1px solid #333', width: 1000 + 'px' }}>
    <Grid style={{ }}>
      <Grid.Row>
        <Segment>Header</Segment>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}  >
          <Segment>left</Segment>
        </Grid.Column>
        <Grid.Column width={8} style={{minWidth: '400px'}}>
          <Segment >middle</Segment>
        </Grid.Column>
        <Grid.Column width={4} >
        <Segment>right</Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default Layout

import * as React from 'react'
import { hot } from 'react-hot-loader/root'

//import data from '@data/service-list.json'
import {
  Container,
  Header,
  Grid,
  Image,
  Divider,
  Segment,
  Responsive,
} from 'semantic-ui-react'

const paragraphImage = require('@assets/images/wireframe/media-paragraph.png')

const App = () => {
  return (
    <Responsive>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 500, padding: '1em 0em' }}
        vertical
      >
        <Header as="h1">Oursweb 我們的網站</Header>
      </Segment>
      <Divider hidden />
      <Container fluid>
        <Segment basic padded="very">
          <Grid stackable columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Image src={paragraphImage} />
                <Divider />
              </Grid.Column>
              <Grid.Column>
                <Image src={paragraphImage} />
                <Divider />
              </Grid.Column>
              <Grid.Column>
                <Image src={paragraphImage} />
                <Divider />
              </Grid.Column>
              <Grid.Column>
                <Image src={paragraphImage} />
                <Divider />
              </Grid.Column>
              <Grid.Column>
                <Image src={paragraphImage} />
                <Divider />
              </Grid.Column>
              <Grid.Column>
                <Image src={paragraphImage} />
                <Divider />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </Responsive>
  )
}

export default hot(App)

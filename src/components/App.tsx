import * as React from 'react'

import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Item,
  List,
  Responsive,
  Segment,
} from 'semantic-ui-react'

import { hot } from 'react-hot-loader/root'
import { services } from '@data/service-list.json'

const paragraphImage = require('@assets/images/wireframe/media-paragraph.png')

const listItems = () =>
  services.map((data, index) => (
    <Grid.Column key={index}>
      <Item.Group>
        <Item
          as="a"
          style={{ minHeight: 100, padding: '1rem 0' }}
          href={`https://${data.url}` as string}
          target="_blank"
        >
          <Item.Image
            alt={data.name}
            src={require('@assets/images/wireframe/square-image.png')}
            size="tiny"
          />
          <Item.Content>
            <Item.Header as="h2">{data.name}</Item.Header>
            <Item.Description>{data.description}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Grid.Column>
  ))

const App = () => {
  return (
    <div>
      <Responsive as={Segment}>
        <Segment
          textAlign="center"
          style={{ minHeight: 100, padding: '2rem 0' }}
          vertical
        >
          <Header as="h1">Oursweb 我們的網站</Header>
        </Segment>
        <Segment basic>
          <Grid container doubling stackable columns={3} divided>
            <Grid.Row>{listItems()}</Grid.Row>
          </Grid>
        </Segment>
      </Responsive>

      <Segment vertical style={{ margin: '1em 0' }}>
        <Container textAlign="center">
          <List horizontal divided link size="small">
            <List.Item
              as="a"
              href="https://www.ccnda.org/rules"
              target="_blank"
            >
              服務條款
            </List.Item>
            <List.Item as="a" href="mailto:service@oursweb.net">
              服務信箱
            </List.Item>
          </List>
          <Grid divided inverted stackable>
            <Grid.Column>
              <Header as="h6">
                網站服務由 <a href="https://www.ccnda.org">中華基督教網路發展協會</a> 提供
                <br /> Serve by Chinese Christian Network Development
                Association
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
    </div>
  )
}

export default hot(App)

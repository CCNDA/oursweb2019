import {
  Avatar,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Separator,
  Text,
} from '@radix-ui/themes'
import './App.css'

import { services } from '@/data/service-list.json'
const Items = () =>
  services.map((data, index) => (
    <Link href={data.url} target="_blank">
      <Box p="5" key={index}>
        <Flex gap="5" align="start" key={index}>
          <Avatar
            size="6"
            src={
              new URL(`./assets/icons/${data.icon.default}`, import.meta.url)
                .href
            }
            alt={data.name}
            fallback={data.name.at(0) ?? '?'}
          />
          <Box>
            <Heading as="h2" mb="2" size="4">
              {data.name}
            </Heading>
            <Text size="2">{data.description}</Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  ))

function App() {
  return (
    <>
      <Box>
        <Box p="5">
          <Flex align="center" gap="3" direction="column">
            <img
              src={new URL('./assets/logo/logo.gif', import.meta.url).href}
              alt="logo"
            />
            <Heading as="h1" size="7" align="center">
              Oursweb 我們的網站
            </Heading>
          </Flex>
        </Box>
        <Separator size="4" />
        <Container size="4" mb="7">
          <Grid columns={{ initial: '1', md: '3', xs: '2' }} width="auto">
            <Items />
          </Grid>
        </Container>
        <Separator size="4" />
        <Box m="2">
          <Flex align="center" justify="center" direction="row" gap="3">
            <Text size="1">
              <Link href="https://www.ccnda.org/rules" target="_blank">
                服務條款
              </Link>
            </Text>
            <Text size="1">
              <Link href="mailto:service@oursweb.net">服務信箱</Link>
            </Text>
            <Text size="1">
              <Link href="https://www.ccnda.org" target="_blank">
                關於我們
              </Link>
            </Text>
            <Text size="1">
              <Link href="https://www.ccnda.org/devote/online" target="_blank">
                奉獻支持
              </Link>
            </Text>
          </Flex>
        </Box>
        <Box p="2">
          <Flex align="center" justify="center" direction="column" gap="3">
            <Text size="1" align="center">
              網站服務由{' '}
              <a
                className="text-sm text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                href="https://www.ccnda.org"
              >
                中華基督教網路發展協會
              </a>{' '}
              提供
            </Text>
            <Text size="1" align="center">
              Serve by Chinese Christian Network Development Association
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import AuthButtons from '@/components/AuthButtons'
import { auth } from '@/firebase/app'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import JitsiMeet from '@/components/JitsiMeet'
import Link from 'next/link'

const Home = () => {
  const [user, loading] = useAuthState(auth)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const formatTime = (date: Date) => {
      const formatter = new Intl.DateTimeFormat([], {
        hour: '2-digit',
        hour12: false,
      })
      return parseInt(formatter.format(date))
    }

    const getGreeting = () => {
      const currentTime = formatTime(new Date())
      if (currentTime >= 0 && currentTime < 12) {
        return 'Good Morning'
      } else if (currentTime >= 12 && currentTime < 18) {
        return 'Good Afternoon'
      } else {
        return 'Good Evening'
      }
    }

    setGreeting(getGreeting())
  }, [])

  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      top={200}
      text-align="center"
      width={{ base: '80%', md: '60%', lg: '600px' }}
      height="100vh"
      mx="auto"
    >
      <Flex w="full" direction="column" align="stretch" textAlign="center">
        <Heading fontSize="20pt" fontWeight={700} mt={-40}>
          Welcome Back
        </Heading>
        <Text fontSize="14pt" mt={16}>
          {loading && '🕒 Checking authentication...'}
          {!loading &&
            user &&
            `${greeting} ${user?.displayName}, Glad to have you again!`}
          {!user && 'Kindly Sign In'}
        </Text>

        {!loading && user && (
          <>
            <Text fontSize={20} fontWeight={600} marginBottom={5}>
              Using Whereby Video Meet
            </Text>
            <iframe
              src="https://castynettest.whereby.com/demo-9c2d5aab-e4ab-46b6-9a96-cd7375efdeeb"
              allow="camera; microphone; fullscreen; speaker; display-capture"
              style={{
                height: '500px',
                width: '1000px',
                marginBottom: '40px',
              }}
            ></iframe>

            <Text fontSize={20} fontWeight={600} marginBottom={5}>
              Using Jitsi Meet API
            </Text>
            <iframe
              allow="camera; microphone; display-capture; autoplay; clipboard-write; hid; screen-wake-lock"
              name="jitsiConferenceFrame0"
              id="jitsiConferenceFrame0"
              src="https://8x8.vc/vpaas-magic-cookie-98fdea46be62454b9dcfbe8b7ded2847/Code Meet#jitsi_meet_external_api_id=0&amp;appData.localStorageContent=null"
              style={{ height: '500px', width: '1000px', marginBottom: '40px' }}
            ></iframe>

            <Text fontSize={20} fontWeight={600} marginBottom={5}>
              Using Daily.co video chat API
            </Text>
            <iframe
              src="https://testaq.daily.co/test-code"
              allow="camera; microphone; fullscreen; speaker; display-capture"
              style={{
                height: '500px',
                width: '1000px',
                marginBottom: '40px',
              }}
            ></iframe>

            <Text fontSize={20} fontWeight={600} marginBottom={5}>
              Using Topia virtual meet
            </Text>
            <Link
              href="https://topia.io/codetest-demo-kxgejioh1"
              target="_blank"
            >
              {'>>>'}Preview the virtual world here{'<<<'}
            </Link>
          </>
        )}

        <Flex mt={10}>
          <AuthButtons />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue, Text, Image,
} from '@chakra-ui/react';
import {AUTH_URL_ONLINE} from '../../constants';

const Login = () => {
  const openUrl = () => {
    window.open(AUTH_URL_ONLINE, '_self');
  }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{base: 'column', sm: 'row'}}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Text color={'gray'}>
                Or
              </Text>
              <Button
                bg={'white'}
                border={'1px'}
                color={'blue.400'}
                onClick={openUrl}
                >
                <Image src={'https://seeklogo.com/images/A/atlassian-logo-DF2FCF6E4D-seeklogo.com.png'} alt={'jira-logo'} width={'20px'} height={'20px'}/>
                <Text marginX={2}>Sign in with Atlassian</Text>
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
export default Login;

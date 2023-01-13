import React, {ReactNode, useEffect, useState} from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList, Spinner, Skeleton, Stack, SkeletonCircle, SkeletonText, FormControl, FormLabel, Input, Heading, Select,
} from '@chakra-ui/react';
import SVG from "react-inlinesvg";
import {
  FiHome,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import {IconType} from 'react-icons';
import {ReactText} from 'react';
import {ColorModeSwitcher} from "../../ColorModeSwitcher";
import {createAvatar} from "@dicebear/avatars";
import * as style from '@dicebear/croodles';
import {useSearchParams} from "react-router-dom";
import axios from "axios";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface Project {
  code: string;
  name: string;
  imageUrl: string;
}

const LinkItems: Array<LinkItemProps> = [
  {name: 'Home', icon: FiHome},
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const [cloudId, setCloudId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const grant_type = 'authorization_code';
  const client_id = 'EDxy4ZFOZibJEkaiw28mF13NnrXcx6AZ';
  const client_secret = 'ATOAplzrZfJXO27PU2ppvrD4BRiibV_IkouoVQJbP_p25baUZuXYL09AgxnbgMrCdE_i6C507245';
  const redirect_uri = 'http://localhost:3000/authorization';
  const baseJiraUrl = 'https://api.atlassian.com/ex/jira/';
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = () => {
    setLoading(true);
    const code = searchParams.get("code");
    const data = {grant_type, client_id, client_secret, code, redirect_uri};
    axios.post('https://auth.atlassian.com/oauth/token', data).then((response) => {
      const token = response.data.access_token;
      setAccessToken(token);
      const url = 'https://api.atlassian.com/oauth/token/accessible-resources';
      const config = {
        headers: {Authorization: `Bearer ${token}`}
      };
      axios.get(url, config).then((response) => {
        setCloudId(response.data[0].id);
      });
    })
  }
  const getUser = () => {
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/myself';
    axios.get(currentUrl, config).then((res) => {
      setAccountId(res.data.accountId);
      setDisplayName(res.data.displayName);
      setEmailAddress(res.data.emailAddress);
      setLoading(false);


      axios.get('http://localhost:5000/spApi/project/get-all',).then((res) => {
        const projects: Project[] = [];
        for (const value of res.data.projects) {
          projects.push({
            code: value.code,
            name: value.name,
            imageUrl: value.imageUrl,
          });
        }
        console.log(projects);
        setProjects(projects);
      });

      console.log(loading);
      const accountId = res.data.accountId;
      const displayName = res.data.displayName;
      const email = res.data.emailAddress;
      axios.post('http://localhost:5000/spApi/user', {accountId, displayName, email}).then((res) => {
        console.log(res);
      });
    })
  }

  const getProfile = (name: string) => {
    const getAvatar = () => {
      const svg = createAvatar(style, {
        seed: name
      });
      const parser = new DOMParser();
      return svg;
    }

    return (
      <Flex
        minH={'20vh'}
        align={'center'}
        background={'white'}
        justify={'center'}>
        <Box padding={10}>
          <Heading marginY={15} lineHeight={1.1} fontSize={{base: '2xl', sm: '3xl'}}>
            User Profile
          </Heading>
          <SVG src={getAvatar()} className={'mr-2 rounded-md'} width={150} height="auto" title={name}/>
        </Box>
        <Box padding={10}>
          <FormControl width={500} id="displayName">
            <FormLabel>Display Name</FormLabel>
            <Input
              placeholder="UserName"
              defaultValue={displayName}
              _placeholder={{color: 'gray.500'}}
              type="text"
            />
          </FormControl>
          <FormControl width={500} id="emailAddress">
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder="Email Address"
              defaultValue={emailAddress}
              _placeholder={{color: 'gray.500'}}
              type="text"
            />
          </FormControl>
          <FormControl width={500} id="Project">
            <FormLabel>Project</FormLabel>
            <Select variant='outline' placeholder='Select current project'>
              {
                projects.map((project) => (
                <option value={project.code}>
                <Image src={project.imageUrl} alt='Dan Abramov' />
              {project.name}</option>
                ))

              }
            </Select>
          </FormControl>
        </Box>
      </Flex>
    )
  }

  useEffect(() => {
    if (cloudId === "") {
      fetchData();
    }
  }, [cloudId, fetchData])

  useEffect(() => {
    if (cloudId !== "" && displayName === "") {
      getUser();
    }
  }, [cloudId, getUser]);
  const getProjects = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/project';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);
      for (const project of res.data) {
        const name = project.name;
        const key = project.key;
        const code = project.id;
        const imageUrl = project.avatarUrls['24x24'];
        axios.post('http://localhost:5000/spApi/project', {code, name, key, imageUrl}).then((res) => {
          console.log(res);
        });
      }
    })
  }
  const getIssues = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/api/3/search?jql=project%20%3D%20EEA%20AND%20component%20%3D%20Development%20ORDER%20BY%20created%20DESC';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
      params: {maxResults: 1000, startAt: 5}
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);
    })
  }
  const getSprints = () => {
    const boardId = 75;
    const currentUrl = baseJiraUrl + cloudId + '/rest/agile/1.0/board/' + boardId + '/sprint';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
      params: {maxResults: 1000, startAt: 5}
    };
    axios.get(currentUrl, config).then((res) => {
      console.log(res.data);

    })
  }

  const getAllBoards = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/agile/1.0/board/';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
      params: {maxResults: 1000, startAt: 5}
    };
    axios.get(currentUrl, config).then((res) => {
      for (const value of res.data.values) {
        const projectCode = value.location.projectId;
        const boardId = value.id;
        axios.put('http://localhost:5000/spApi/project/update', {projectCode, boardId}).then((res) => {
          console.log(res);
        });
      }
    })
  }

  const getAllSprints = () => {
    const currentUrl = baseJiraUrl + cloudId + '/rest/agile/1.0/board/';
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
      params: {maxResults: 1000, startAt: 5}
    };
    axios.get(currentUrl, config).then((res) => {
      for (const value of res.data.values) {
        const boardId = value.id;
        const sprintUrl = baseJiraUrl + cloudId + '/rest/agile/1.0/board/' + boardId + '/sprint';
        const sprintConfig = {
          headers: {Authorization: `Bearer ${accessToken}`},
          params: {maxResults: 1000, startAt: 1}
        };
        axios.get(sprintUrl, sprintConfig).then((res) => {
          console.log(res);
          for (const sprint of res.data.values) {
            const code = sprint.id;
            const name = sprint.name;
            const startDate = sprint.startDate;
            const endDate = sprint.endDate;
            const description = sprint.goal;
            axios.post('http://localhost:5000/spApi/sprint', {code, name, startDate, endDate, description, boardId}).then((res) => {
              console.log(res);
            });
          }
        })
      }
    })
  }
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{base: 'none', md: 'block'}}
      />
      {/*<div><Button onClick={getAllSprints}>Issues</Button></div>*/}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose}/>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav accessToken={accessToken} cloudId={cloudId} displayName={displayName} onOpen={onOpen}/>
      <Box ml={{base: 0, md: 60}} p="4">
        {loading ? <Stack>
          <SkeletonCircle isLoaded={!loading} size='10'/>
          <SkeletonText isLoaded={!loading} mt='4' noOfLines={4} spacing='4' skeletonHeight='2'/>
        </Stack> : getProfile(displayName)}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{base: 'full', md: 60}}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

const NavItem = ({icon, children, ...rest}: NavItemProps) => {
  return (
    <Link href="#" style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  displayName: string;
  accessToken: string;
  cloudId: string;
  onOpen: () => void;
}

const MobileNav = ({onOpen, displayName, accessToken, cloudId, ...rest}: MobileProps) => {
  const svg = createAvatar(style, {seed: 'custom-seed'});
  const baseJiraUrl = 'https://api.atlassian.com/ex/jira/';
  const getAvatar = (name: string) => {
    const svg = createAvatar(style, {
      seed: name
    });
    const parser = new DOMParser();
    const element = parser.parseFromString(svg, 'image/svg+xml');
    return svg;
  }

  return (
    <Flex
      ml={{base: 0, md: 60}}
      px={{base: 4, md: 4}}
      height="20"
      width={{base: 'full', md: 'auto'}}
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{base: 'space-between', md: 'flex-end'}}
      {...rest}>
      <IconButton
        display={{base: 'flex', md: 'none'}}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu/>}
      />

      <Text
        display={{base: 'flex', md: 'none'}}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{base: '0', md: '6'}}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell/>}
        />
        <ColorModeSwitcher justifySelf="flex-end"/>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{boxShadow: 'none'}}>
              <HStack>
                <SVG src={getAvatar(displayName)} className={'mr-2 rounded-md'} width={50} height="auto" title={displayName}/>
                <VStack
                  display={{base: 'none', md: 'flex'}}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{displayName}</Text>
                </VStack>
                <Box display={{base: 'none', md: 'flex'}}>
                  <FiChevronDown/>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Settings</MenuItem>
              <MenuDivider/>
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};


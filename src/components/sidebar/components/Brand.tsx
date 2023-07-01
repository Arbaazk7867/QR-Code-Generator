// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Box, Icon, Progress, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';

// Custom components
// import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');
	const textColor = useColorModeValue('secondaryGray.900', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Text color={textColor} fontSize='30px' fontWeight='700' lineHeight='100%' marginBottom="50px" marginTop="50px" marginRight="50px">
					Admin Panel
				</Text>
			{/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
			<HSeparator mb='2px' />
		</Flex>
	);
}

export default SidebarBrand;

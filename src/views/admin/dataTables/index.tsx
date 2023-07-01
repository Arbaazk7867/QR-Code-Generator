

// Chakra imports
import { Box, Button, Flex, Grid, Link, Text, useColorModeValue, SimpleGrid } from '@chakra-ui/react';
import Card from 'components/card/Card';
// import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable';
// import CheckTable from 'views/admin/dataTables/components/CheckTable';
// import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
// import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment';
// import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck';
// import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import { useHistory } from 'react-router-dom';
import HistoryItem from 'views/admin/dataTables/components/ComplexTable';
export default function Settings() {
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const history = useHistory()
	const handleAddUser = () => {
		history.push('/admin/allusers')
	}
	// Chakra Color Mode
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<SimpleGrid display='flex' mb='20px' columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
				{/* <DevelopmentTable   tableData={tableDataDevelopment} /> */}
				{/* <CheckTable tableData={tableDataCheck} /> */}
				{/* <ColumnsTable  tableData={tableDataColumns} /> */}
				<Card p='0px'>
						<Flex
							align={{ sm: 'flex-start', lg: 'center' }}
							justify='space-between'
							w='100%'
							px='22px'
							py='18px'>
							<Text color={textColor} fontSize='xl' fontWeight='600'>
								History
							</Text>
							<Button variant='action' onClick={handleAddUser}>See all</Button>
						</Flex>
					<HistoryItem
						name='Colorful Heaven'
						author='By Mark Benjamin'
						date='30s ago'
						// image={Nft5}
						price='0.91 ETH'
					/>
					</Card>
			</SimpleGrid>
		</Box>
	);
}

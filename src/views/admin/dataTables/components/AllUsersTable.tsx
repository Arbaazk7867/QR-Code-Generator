import { AddIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { error } from 'console';
import * as React from 'react';
import { useState } from 'react';
// Assets
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import axios, { AxiosError } from 'axios'
import moment from 'moment';

type RowObj = {
	_id : string
	name: string;
	approval_status: string;
	created_date: string;
	email: string;
	more: string;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function AllUsers(props: { tableData: any }) {
	const [input, setInput] = useState({
		name: '',
		email: '',
		mobileNo: '',
		address: ''
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const toast = useToast();

	const handleInputChange = (e: any) => {
		const name = e.target.name;
		const value = e.target.value;
		setInput((prevState: any) => ({
			...prevState,
			[name]: value
		}));
	}

	const { name, email, mobileNo, address } = input;
	const isNameError = isSubmitted && name === '';
	const isEmailError = isSubmitted && email === '';
	const isMobileNoError = isSubmitted && mobileNo === '';
	const isAddressError = isSubmitted && address === '';

	const handleSubmit = async (e:any) => {
		e.preventDefault();
		setIsSubmitted(true);
		if (name !== '' && email !== '' && mobileNo !== '' && address !== '') {
			const response = await axios.post('http://localhost:8000/adduser',{name,email,mobileNo,address})
			try {
				
				const qrCode = response.data.qrCode
				console.log('Generated QR Code:',qrCode)
				toast({
					title: "QR code generated",
					status: "success",
					isClosable: true,
					position: "top"
				})
				onClose()
				fetchUsers()
			} catch (error) {
				if(axios.isAxiosError(error)){
				console.error('Failed to generate QR Codes:', error.response)
				}else{
				console.error('Failed to generate QR Codes',error)
				}
				// const errorMessage = error.response?.data?.message || 'An error occured';
				toast({
					title: "Failed to generate QR codes",
					// description:errorMessage,
					status: "error",
					isClosable: true,
					position: "top"
				})
				
			}
		} else {
			toast({
				title: "Please fill in all fields",
				status: "error",
				isClosable: true,
				position: "top"
			});
		}
	}
	const fetchUsers = async ()=>{
		try {
			const response  = await axios.get('http://localhost:8000/users')
			const users = response.data
			const usersWithCreatedDate = users.map((user:RowObj)=>({
				...user,
				created_date : moment(user.created_date).format('DD-MM-YYYY')
			
			}))
			setData(usersWithCreatedDate);
		} catch (error) {
			console.error('Failed to fetch users:',error)	
		}
	}

	 
	React.useEffect(()=>{
		fetchUsers()
	}, [])
	const { tableData } = props;
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const history = useHistory()
	const handleAddUserClick = () => {
		history.push('/userregister')
	}
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					NAME
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('created_date', {
			id: 'created_date',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					CREATED DATE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('email', {
			id: 'email',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					EMAIL
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{info.getValue()}
				</Text>
			),
		}),
		columnHelper.accessor('approval_status', {
			id: 'approval_status',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					STATUS
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Icon
						w='24px'
						h='24px'
						me='5px'
						color={
							info.getValue() === 'Approved' ? (
								'green.500'
							) : info.getValue() === 'Disable' ? (
								'grey.500'
							) : info.getValue() === 'Error' ? (
								'orange.500'
							) : info.getValue() === 'Rejected' ? (
								'red.500'
							) : null
						}
						as={
							info.getValue() === 'Approved' ? (
								MdCheckCircle
							) : info.getValue() === 'Disable' ? (
								NotAllowedIcon
							) : info.getValue() === 'Error' ? (
								MdOutlineError
							) : info.getValue() === 'Rejected' ? (
								MdCancel
							) : null
						}
					/>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('more', {
			id: 'more',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					More
				</Text>
			),
			cell: (info) => (
				<Menu user={info.row.original._id} />
			),
		}),
	];
	const { isOpen, onOpen, onClose } = useDisclosure()
	const initialRef = React.useRef(null)
	const finalRef = React.useRef(null)

	// const [data, setData] = React.useState(() => [...defaultData]);
	const [data, setData] = React.useState<RowObj[]>([]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					All Users
				</Text>
				<Button leftIcon={<AddIcon />} float='right' colorScheme='facebook' variant='action' onClick={onOpen}>
					Add New User
				</Button>
				<Modal
					initialFocusRef={initialRef}
					finalFocusRef={finalRef}
					isOpen={isOpen}
					onClose={onClose}
				>
					<form onSubmit={handleSubmit}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Add a New User</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb={6}>
								<FormControl isInvalid={isNameError}>
									<FormLabel>Name</FormLabel>
									<Input type='text' name="name" placeholder='Full name' value={name} onChange={handleInputChange} />
									{isNameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
								</FormControl>
								<FormControl isInvalid={isEmailError} mt={4}>
									<FormLabel>Email</FormLabel>
									<Input type='email' name="email" placeholder='Email' value={email} onChange={handleInputChange} />
									{isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
								</FormControl>
								<FormControl isInvalid={isMobileNoError} mt={4}>
									<FormLabel>Mobile No.</FormLabel>
									<Input type='number' name="mobileNo" placeholder='Mobile No.' value={mobileNo} onChange={handleInputChange} />
									{isMobileNoError && <FormErrorMessage>Mobile No. is required.</FormErrorMessage>}
								</FormControl>
								<FormControl isInvalid={isAddressError} mt={4}>
									<FormLabel>Address</FormLabel>
									<Input type='text' name="address" placeholder='Address' value={address} onChange={handleInputChange} />
									{isAddressError && <FormErrorMessage>Address is required.</FormErrorMessage>}
								</FormControl>

								<ModalFooter>
									<Button
										variant='action'
										mr={3}
										// float='right' 
										type="submit"
									// marginTop='20px'
									>
										Generate QR
									</Button>
									<Button onClick={onClose}>Cancel</Button>
								</ModalFooter>
							</ModalBody>
							{/* </Card>
      </SimpleGrid>
    </Box> */}
						</ModalContent>
					</form>
				</Modal>
			</Flex>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.slice(0, 11).map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												borderColor='transparent'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
}
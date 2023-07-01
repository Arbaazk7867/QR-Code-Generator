import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure, useToast, Wrap, WrapItem } from "@chakra-ui/react"
// import Card from "components/card/Card"
// import React from "react";
// import { useState } from "react"

// function ToastStatusExample() {
//   const toast = useToast();
//   const statuses = ['success', 'error', 'warning', 'info'];

//   return (
//     <Wrap>
//       {statuses.map((status, i) => (
//         <WrapItem key={i}>
//           <Button
//             onClick={() =>
//               toast({
//                 title: `${status} toast`,
//                 status: status as any,
//                 isClosable: true,
//               })
//             }
//           >
//             Show {status} toast
//           </Button>
//         </WrapItem>
//       ))}
//     </Wrap>
//   );
// }

// function Register() {
//   const [input, setInput] = useState({
//     name: '',
//     email: '',
//     mobileNo: '',
//     address: ''
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const toast = useToast();

//   const handleInputChange = (e: any) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setInput((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));
//   }

//   const { name, email, mobileNo, address } = input;
//   const isNameError = isSubmitted && name === '';
//   const isEmailError = isSubmitted && email === '';
//   const isMobileNoError = isSubmitted && mobileNo === '';
//   const isAddressError = isSubmitted && address === '';

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     if (name !== '' && email !== '' && mobileNo !== '' && address !== '') {
//       toast({
//         title: "QR code generated",
//         status: "success",
//         isClosable: true,
//         position: "top"
//       });
//     } else {
//       toast({
//         title: "Please fill in all fields",
//         status: "error",
//         isClosable: true,
//         position: "top"
//       });
//     }
//   }
//   function InitialFocus() {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const initialRef = React.useRef(null)
//     const finalRef = React.useRef(null)

//     return (
//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         {/* <Box pt={{ base: '130px', md: '50px', xl: '80px' }}>
//       <SimpleGrid display='flex' mb='20px' columns={{ sm: 1, md: 2 }} spacing={{ base: '20px', xl: '20px' }}>
//         <Card p='50px'> */}
//         <form onSubmit={handleSubmit}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Add a New User</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody pb={6}>
//               <FormControl isInvalid={isNameError}>
//                 <FormLabel>Name</FormLabel>
//                 <Input type='text' name="name" placeholder='Full name' value={name} onChange={handleInputChange} />
//                 {isNameError && <FormErrorMessage>Name is required.</FormErrorMessage>}
//               </FormControl>
//               <FormControl isInvalid={isEmailError} mt={4}>
//                 <FormLabel>Email</FormLabel>
//                 <Input type='email' name="email" placeholder='Email' value={email} onChange={handleInputChange} />
//                 {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
//               </FormControl>
//               <FormControl isInvalid={isMobileNoError} mt={4}>
//                 <FormLabel>Mobile No.</FormLabel>
//                 <Input type='number' name="mobileNo" placeholder='Mobile No.' value={mobileNo} onChange={handleInputChange} />
//                 {isMobileNoError && <FormErrorMessage>Mobile No. is required.</FormErrorMessage>}
//               </FormControl>
//               <FormControl isInvalid={isAddressError} mt={4}>
//                 <FormLabel>Address</FormLabel>
//                 <Input type='text' name="address" placeholder='Address' value={address} onChange={handleInputChange} />
//                 {isAddressError && <FormErrorMessage>Address is required.</FormErrorMessage>}
//               </FormControl>

//               <ModalFooter>
//               <Button 
//               variant='action' 
//               mr={3} 
//               // float='right' 
//               type="submit" 
//               // marginTop='20px'
//               >
//                 Generate QR
//                 </Button>
//                 <Button onClick={onClose}>Cancel</Button>
//                 </ModalFooter>
//               </ModalBody>
//             {/* </Card>
//       </SimpleGrid>
//     </Box> */}
//         </ModalContent>
//         </form>
//       </Modal>
//     )
//   }
// }
// export default Register;

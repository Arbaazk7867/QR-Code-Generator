import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import  useNavigate  from 'react-router-dom'

// Chakra imports
import {
  Icon,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  Img,
  ModalFooter,
  Button,
  toast,
  useToast,
  Select,
  FormLabel,
} from "@chakra-ui/react";
// Assets
import {
  MdOutlineMoreHoriz,
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings,
} from "react-icons/md";
import { CloseIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import moment from "moment";

type RowObj = {
  name: string;
  approval_status: string;
  created_date: string;
  mobileNo: string;
  email: string;
  address: string;
  qrcode: string;
};

export default function Banner(props: { [x: string]: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, ...rest } = props;
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = React.useState<RowObj | null>(null);
  // const [data, setData] = React.useState<RowObj[]>([]);
  const [tableData, setTableData] = useState([]);
//   const navigate = useNavigate;
  // const [updatedUserData, setUpdatedUserData] = useState<RowObj | null>({
  const [viewUserData, setViewUserData] = useState<RowObj | null>(null);
  const [editUserData, setEditUserData] = useState<RowObj | null>({
    name: "",
    approval_status: "",
    created_date: "",
    mobileNo: "",
    email: "",
    address: "",
    qrcode: "",
  });

  const isEnableVisible = editUserData?.approval_status === "Disable";
  const isDisableVisible = editUserData?.approval_status === "Approved";
  
  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const iconColor = useColorModeValue("brand.500", "white");
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const fetchTableData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      const data = response.data;
      console.log("========qwe",data)
      setTableData(data);
	  console.log(data);
	  
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchUsersById = async () => {
    console.log("===================================");
    console.log("user", user);

    try {
      const response = await axios.get(`http://localhost:8000/users/${user}`);
      console.log(response);
      const userData = response.data;
      // setUserData(userData)
      // setUpdatedUserData(userData);
      setViewUserData(userData);
      setEditUserData(userData);
      setLoading(false);
      console.log(userData);
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };
  const updateUsersById = async () => {
    console.log("===================================");
    console.log("user", user);
    const updatedData = {
      ...editUserData,
      approval_status: editUserData.approval_status || "Pending",
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/users/${user}`,
        updatedData
      );
      console.log(response);
      const updatedUser = response.data;
      toast({
        title: "Record Updated Successfully",
        status: "success",
        isClosable: true,
        position: "top",
      });

      setUserData(updatedUser);
      console.log(updatedUser);
	  await fetchTableData();
    //   setTableData((prevTableData) =>
    //     prevTableData.map((entry) =>
    //       entry.id === updatedUser.id ? updatedUser : entry
    //     )
    //   );
    // navigate;
      onClose2();
      setLoading(false);

    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };
  const disableUsersById = async () => {
   
    console.log("user", user);
    const disableData = {
      ...editUserData,
      approval_status: "Disable",
    };
    try {
      const response = await axios.put(
        `http://localhost:8000/users/${user}`,
        disableData
      );

     
      const disableUser = response.data;
      toast({
        title: "User Disabled Successfully",
        status: "success",
        isClosable: true,
        position: "top",
      });
    //   setViewUserData(disableUser);
    //   setEditUserData(disableUser);
	  await fetchTableData();
     
      onClose2();
      setLoading(false);

   
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };

  const enableUsersById = async ()=> {
	try {
		const response = await axios.put(`http://localhost:8000/users/${user}`,
		{...editUserData,approval_status:"Approved"}
		)
		const enabledUser = response.data
		toast({
			title:"User Enabled Successfully",
			status:"success",
			isClosable : true,
			position : "top"
		})
		await fetchTableData()
	} catch (error) {
		console.log("Failed to enable user",error)
	}
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  // useEffect(() => {
  //   if (isOpen2 && user && true) {
  //     fetchUsersById();
	//   fetchTableData()
  //   }
  // }, [isOpen2, user]);

  React.useEffect(() => {
    if (true || isOpen2 && user) {
      fetchUsersById();
	  fetchTableData()
    }
  }, [isOpen2, user]);

  useEffect(() => {
    if (!loading && !isOpen2) {
      fetchTableData();
    }
  }, [loading, isOpen2]);
  return (
    <Menu isOpen={isOpen1} onClose={onClose1} placement="start">
      <MenuButton
        alignItems="center"
        justifyContent="center"
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w="37px"
        h="37px"
        lineHeight="100%"
        onClick={onOpen1}
        borderRadius="10px"
        {...rest}
      >
        <Icon as={MdOutlineMoreHoriz} color={iconColor} w="24px" h="24px" />
      </MenuButton>
      <MenuList
        w="150px"
        minW="set"
        maxW="150px !important"
        border="transparent"
        backdropFilter="blur(63px)"
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius="20px"
        p="15px"
      >
        <React.Fragment>
          <MenuItem
            transition="0.2s linear"
            color={textColor}
            _hover={textHover}
            p="0px"
            borderRadius="8px"
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={() => {
              onOpen();
              fetchUsersById();
            }}
          >
            <Flex align="center">
              <Icon as={ViewIcon} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                View
              </Text>
            </Flex>
          </MenuItem>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>User Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={viewUserData?.name}
                    isReadOnly
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    value={viewUserData?.email}
                    isReadOnly
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Mobile No.</FormLabel>
                  <Input
                    type="text"
                    name="mobileNo"
                    value={viewUserData?.mobileNo}
                    isReadOnly
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={viewUserData?.address}
                    isReadOnly
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Status</FormLabel>
                  <Input
                    type="text"
                    name="approval_status"
                    value={viewUserData?.approval_status}
                    isReadOnly
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>QR Code</FormLabel>
                  {/* <QRCode value = {userData?.qrcode}/> */}
                  <Img
                    src={`http://localhost:8000/users/${viewUserData?.qrcode}`}
                    alt="QR Code"
                  />
                </FormControl>
              </ModalBody>
            </ModalContent>
          </Modal>
          <MenuItem
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            color={textColor}
            _hover={textHover}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
            onClick={() => {
              onOpen2();
              fetchUsersById();
            }}
          >
            <Flex align="center">
              <Icon as={EditIcon} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Edit
              </Text>
            </Flex>
            <Modal isOpen={isOpen2} onClose={onClose2}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>User Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={editUserData?.name}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          name: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="text"
                      name="email"
                      value={editUserData?.email}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          email: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Mobile No.</FormLabel>
                    <Input
                      type="text"
                      name="mobileNo"
                      value={editUserData?.mobileNo}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          mobileNo: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      name="address"
                      value={editUserData?.address}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          address: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Approval Status</FormLabel>
                    <Select
                      name="approval_status"
                      value={editUserData?.approval_status}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          approval_status: e.target.value,
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Disable">Disable</option>
                    </Select>
                  </FormControl>
                  <ModalFooter>
                    <Button
                      onClick={() => {
                        fetchUsersById();
                        updateUsersById();
                      }}
                      variant="action"
                      mr={3}
                      // float='right'
                      type="submit"
                      // marginTop='20px'
                    >
                      Update Record
                    </Button>
                    <Button onClick={onClose2}>Cancel</Button>
                  </ModalFooter>
                </ModalBody>
              </ModalContent>
            </Modal>
          </MenuItem>
		  {/* {isEnableVisible &&( */}
          <MenuItem
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            color={textColor}
            _hover={textHover}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
			// display = {isEnableVisible ? "block":"none"}
			// isDisabled = {editUserData?.approval_status === "Disable"}
			isDisabled = {isEnableVisible}
            onClick={() =>{
				disableUsersById();
				fetchTableData()
				console.log('hiii');
			}}
          >
            <Flex align="center">
              <Icon as={CloseIcon} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Disable
              </Text>
            </Flex>
          </MenuItem>
		  {/* )} */}
		  {/* {isDisableVisible && ( */}
          <MenuItem
            transition="0.2s linear"
            p="0px"
            borderRadius="8px"
            color={textColor}
            _hover={textHover}
            _active={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
            mb="10px"
			// display = {isDisableVisible ? "block":"none"}
			// isDisabled = {editUserData?.approval_status === "Approved"}
			isDisabled = {isDisableVisible}
            onClick={() =>{
				enableUsersById()
			}}
          >
            <Flex align="center">
              <Icon as={CloseIcon} h="16px" w="16px" me="8px" />
              <Text fontSize="sm" fontWeight="400">
                Enable
              </Text>
            </Flex>
          </MenuItem>
		  {/* )} */}
        </React.Fragment>
      </MenuList>
    </Menu>
  );
}

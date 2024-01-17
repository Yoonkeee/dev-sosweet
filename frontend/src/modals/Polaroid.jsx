import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

export const Polaroid = ({ isOpen, name, onClose, profileUrl }) => (
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent paddingTop="5vw" px="5vw" w="70%">
      <ModalBody alignContent="center" display="flex" justifyContent="center" m={0} p={0}>
        {profileUrl ? (
          <Box border="5px solid lightgray">
            <Image src={profileUrl} />
          </Box>
        ) : (
          <Text fontSize="9xl">🐶</Text>
        )}
      </ModalBody>
      <ModalFooter py="2vh">
        <Text fontFamily="GmarketSans" fontSize="2xl" fontWeight="bold">
          {name}❤️
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

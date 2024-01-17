import { Box, Flex, Image, Spinner, useDisclosure } from '@chakra-ui/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import { Polaroid } from '../../modals/Polaroid';
import { getProfile } from '../../api';
import { DogFace } from '../CustomIcons/DogFace';

export const ProfileImage = ({ name, w }) => (
  <Suspense fallback={<ProfileImageSpinner />}>
    <Element name={name} w={w} />
  </Suspense>
);

const ProfileImageSpinner = () => (
  <Box aspectRatio={1} h="90%" maxH="100px" minH="60px" ml="2%">
    <Spinner color="#1a2a52" emptyColor="gray.200" h="100%" size="xl" speed="1s" thickness="4px" />
  </Box>
);

const Element = ({ name, w }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    queryKey: ['profile', name],
    queryFn: ({ signal }) => getProfile(['profile', name, signal]),
  });
  useEffect(
    () => () => {
      queryClient.cancelQueries({ queryKey: ['profile', name] });
    },
    [],
  );
  return (
    <Flex
      aligncontent="center"
      aspectRatio={1}
      h="90%"
      justifyContent="center"
      maxH="100px"
      minH="60px"
      ml="2%"
      w={w}
    >
      {data ? (
        <Image
          alignContent="center"
          aspectRatio={1}
          bgColor="transparent"
          border="3px lightgray solid"
          cursor="pointer"
          display="flex"
          h="100%"
          m={0}
          maxH="100px"
          minH="60px"
          onClick={e => {
            e.stopPropagation();
            onOpen();
          }}
          rounded="full"
          src={data}
          w="100%"
        />
      ) : (
        <DogFace boxSize={16} h="90%" maxH="100px" minH="60px" />
      )}
      {isOpen ? <Polaroid isOpen={isOpen} name={name} onClose={onClose} profileUrl={data} /> : null}
    </Flex>
  );
};

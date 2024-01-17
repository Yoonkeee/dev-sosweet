import { HStack, VStack } from '@chakra-ui/react';
import { Name } from './Name';
import { ProfileImage } from './ProfileImage';
import { Allergy } from '../Allergy';

export const Container = ({ color, name, showAllergy = true }) => (
  <HStack w="100%">
    <ProfileImage name={name} w="auto" />
    <VStack gap={0} h="100%" justifyContent="center" p={0} w="70%">
      <Name color={color} name={name} />
      {showAllergy && <Allergy name={name} />}
    </VStack>
  </HStack>
);

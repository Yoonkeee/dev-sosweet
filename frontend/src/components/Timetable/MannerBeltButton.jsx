import {
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';
import { Add } from '../CustomIcons/Add';
import { Minus } from '../CustomIcons/Minus';

export const MannerBeltButton = ({ belts, setBelts }) => {
  const beltBadgeColor = belts > 0 ? 'orange.300' : 'green.500';
  const content = belts || '벨트';
  const fontSize = belts ? '2xl' : 'lg';
  const fontWeight = belts ? 900 : 600;
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          _hover={{
            textDecoration: 'none',
            transform: 'scale(1.2)',
          }}
          bgColor={beltBadgeColor}
          color="white"
          h="3.5vh"
          size="sm"
          w="100%"
        >
          <Text fontSize={fontSize} fontWeight={fontWeight}>
            {content}
          </Text>
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent w="100%">
          <PopoverArrow />
          <PopoverBody>
            <HStack justifyContent="center">
              <Minus
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  bg: '#ea6767',
                  transform: 'scale(1.2)',
                }}
                bgColor="#E53E3E"
                borderRadius="0.5rem"
                boxSize={10}
                color="white"
                onClick={() => {
                  if (belts > 0) setBelts(prev => prev - 1);
                }}
                p={2.5}
                transitionDuration="0.2s"
              />
              <Add
                _hover={{
                  textDecoration: 'none',
                  color: 'white',
                  bg: '#526491',
                  transform: 'scale(1.2)',
                }}
                bgColor="#1a2a52"
                borderRadius="0.5rem"
                boxSize={10}
                color="white"
                onClick={() => {
                  setBelts(prev => prev + 1);
                }}
                p={2.5}
                transitionDuration="0.2s"
              />
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

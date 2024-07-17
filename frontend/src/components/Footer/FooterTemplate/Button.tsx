import { Button, Image, Text, VStack } from '@chakra-ui/react';

type FooterButtonProps = {
  onClick: VoidFunction;
  svg: string;
  text: string;
};

export const FooterButton = ({ onClick, svg, text }: FooterButtonProps) => (
  <Button aspectRatio={1} bgColor="transparent" h="100%" onClick={onClick} paddingTop="10px">
    <VStack gap="0.3rem" h="100%" m={0} p={0} w="100%">
      <Image boxSize={8} minInlineSize={8} src={svg} />
      <Text fontSize="sm" marginY={0} p={0}>
        {text}
      </Text>
    </VStack>
  </Button>
);

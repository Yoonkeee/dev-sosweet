import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllUnchecked } from '../../api';
import AlbumListRow from '../Rows/AlbumListRow';
import { ListContainer } from '../List';
import { Button } from '@chakra-ui/react';

export const AlbumLilstContainer = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['getAllUnchecked'],
    queryFn: getAllUnchecked,
  });

  return (
    <ListContainer>
      {data &&
        Object.entries(data)
          .sort((a, b) => Math.min(...a[1].ids.map(Number)) - Math.min(...b[1].ids.map(Number)))
          .map(([dogName]) => (
            <AlbumListRow name={dogName} key={dogName}>
              <Button colorScheme="green" rounded="xl" size="lg" align="center" width="130px">
                버튼
              </Button>
            </AlbumListRow>
          ))}
    </ListContainer>
  );
};

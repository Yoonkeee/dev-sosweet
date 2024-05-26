import { Button, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  dogsList,
  getAllAlbums,
  insertAlbumUrl,
  makeAlbumAtGooglePhotos,
  verifyGoogleToken,
} from '../../api';
import { googleLoginAtom } from '../../store/google';
import { ListContainer } from '../List';
import { AlbumListRow } from '../Rows/AlbumListRow';

type DogType = {
  name: string;
  breed: string;
  note: string;
  gender: string;
  phone: string;
  weight: string;
  official_name: string;
  valid: string;
  profile_id: string;
  hasAllergy: number;
  allergy: string;
  remaining_minutes: number;
  album_url: string | null;
};

type DogAlbumType = {
  [key: string]: string;
};
export const AlbumListContainer = () => {
  const { data: dogs } = useSuspenseQuery<DogType[]>({
    queryKey: ['dogsList'],
    queryFn: dogsList,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();
  const toast = useToast();

  const { token: accessToken } = useRecoilValue(googleLoginAtom);
  const { mutate: makeAlbumMutation, isPending } = useMutation({
    mutationFn: ({ name }: { name: string }) => makeAlbumAtGooglePhotos({ name, accessToken }),
    onSuccess: res => {
      console.log(res);
      insertAlbumUrl({ name: res.name, url: res.url, shared_url: res.shared_url }).then(res => {
        queryClient.invalidateQueries({ queryKey: ['dogsList'] });
        toast({
          title: '앨범 생성이 완료되었습니다.',
          status: 'success',
          duration: 1000,
          isClosable: true,
          position: 'top',
        });
        console.log(res);
      });
    },
    onError: error => {
      toast({
        title: '앨범 생성에 실패하였습니다.',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top',
      });
      console.log(error);
    },
  });

  const onCreateAlbum = (name: string) => {
    makeAlbumMutation({ name });
  };

  return (
    <ListContainer>
      {dogs &&
        dogs.map(({ name, album_url: albumUrl }) => (
          <AlbumListRow key={name} name={name}>
            {albumUrl ? (
              <OpenAlbumInGooglePhoto url={albumUrl} />
            ) : (
              <MakeNewAlbumButton isLoading={isPending} name={name} onClick={onCreateAlbum} />
            )}
          </AlbumListRow>
        ))}
    </ListContainer>
  );
};

export const OpenAlbumInGooglePhoto = ({ url }: { url: string }) => (
  <Button
    _hover={{
      textDecoration: 'none',
      color: 'white',
      bg: '#526491',
      transform: 'scale(1.2)',
    }}
    bg="#1a2a52"
    color="white"
    fontSize="md"
    onClick={() => window.open(url, '_blank')}
    position="inherit"
    h="60%"
    rounded="xl"
    size="lg"
    transitionDuration="0.2s"
    w="auto"
  >
    <Text color="white" fontSize="1.1rem" fontWeight={900} whiteSpace="nowrap">
      앨범보기
    </Text>
  </Button>
);
export const MakeNewAlbumButton = ({
  isLoading,
  name,
  onClick,
}: {
  isLoading: boolean;
  name: string;
  onClick: (name: string) => void;
}) => (
  // const onClick = e => {
  //   e.preventDefault();
  // };
  <Button
    _hover={{
      textDecoration: 'none',
      color: 'white',
      bg: '#2fe664',
      rounded: 'xl',
      transform: 'scale(1.2)',
    }}
    isLoading={isLoading}
    bg="#19d050"
    h="60%"
    onClick={() => onClick(name)}
    rounded="xl"
    size="lg"
    transitionDuration="0.2s"
    w="auto"
  >
    <Text color="white" fontSize="1.1rem" fontWeight={900} whiteSpace="nowrap">
      신규생성
    </Text>
  </Button>
);

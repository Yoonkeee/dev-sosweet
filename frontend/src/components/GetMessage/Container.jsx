import { useDisclosure } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MakeMessage from '../../modals/MakeMessage';
import GetMessageRow from '../Rows/GetMessageRow';
import { getAllUnchecked, makeMessage } from '../../api';
import { ListContainer } from '../List';

export const Container = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['getAllUnchecked'],
    queryFn: getAllUnchecked,
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState([]);

  const onClick = clickedName => {
    setName(clickedName);
  };

  useEffect(() => {
    if (name) {
      setChecked(data[name].ids);
      makeMessage(data[name].ids).then(res => {
        setMessage(res);
      });
    }
  }, [name]);

  useEffect(() => {
    if (message) onOpen();
  }, [message]);

  const onCloseFn = () => {
    queryClient.refetchQueries({ queryKey: ['getAllUnchecked'] }).then(() => {
      onClose();
      setName('');
      setMessage('');
    });
  };

  return (
    <ListContainer>
      {data &&
        Object.entries(data)
          .sort((a, b) => Math.min(...a[1].ids.map(Number)) - Math.min(...b[1].ids.map(Number)))
          .map(([dogName, { counts, remainingMinutes }]) => (
            <ListContainer.Element onClick={() => onClick(dogName)}>
              <GetMessageRow
                key={dogName}
                count={counts}
                name={dogName}
                remainingMinutes={remainingMinutes}
              />
            </ListContainer.Element>
          ))}
      {isOpen ? (
        <MakeMessage checked={checked} isOpen={isOpen} name={name} onClose={onCloseFn} text={message} />
      ) : null}
    </ListContainer>
  );
};

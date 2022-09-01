import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Button, Drawer, Message, useToaster } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';

function EditRoomBtnDrawer() {
  const { isOpen, open, close } = useModalState();

  const { chatId } = useParams();

  const isMobile = useMediaQuery('(max-width: 992px)');

  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);

  const toaster = useToaster();

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        const message = (
          <Message showIcon type="success">
            Successfully updated
          </Message>
        );
        toaster.push(message);
      })
      .catch(err => {
        const message = (
          <Message showIcon type="error">
            {err.message}
          </Message>
        );
        toaster.push(message);
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };

  const onDescriptionSave = newDesc => {
    updateData('description', newDesc);
  };

  return (
    <div>
      <Button
        className="br-circle"
        size="sm"
        color="red"
        appearance="primary"
        onClick={open}
      >
        A
      </Button>
      <Drawer
        size={isMobile ? 'full' : 'sm'}
        open={isOpen}
        onClose={close}
        placement="right"
      >
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            startingvalue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name can not be empty"
          />
          <EditableInput
            as="textarea"
            rows={5}
            startingvalue={description}
            onSave={onDescriptionSave}
            emptyMsg="Description can not be empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>
        <Drawer.Actions>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Actions>
      </Drawer>
    </div>
  );
}

export default memo(EditRoomBtnDrawer);

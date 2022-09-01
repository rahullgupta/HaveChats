import React, { useCallback, useState, useRef } from 'react';
import {
  Button,
  Form,
  Modal,
  Input,
  Schema,
  useToaster,
  Message,
} from 'rsuite';
import CreativeIcon from '@rsuite/icons/Creative';
import firebase from 'firebase/app';
import { useModalState } from '../misc/custom-hooks';
import { auth, database } from '../misc/firebase';

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const INITIAL_FORM = {
  name: '',
  description: '',
};

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description is required'),
});

function CreateRoomBtnModal() {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const toaster = useToaster();

  const onSubmit = async () => {
    if (formRef.current.check()) return;
    setIsLoading(true);
    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };
    try {
      await database.ref('rooms').push(newRoomData);
      const message = (
        <Message showIcon type="info">
          {formValue.name} has been created
        </Message>
      );
      toaster.push(message);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (error) {
      setIsLoading(false);
      const message = (
        <Message showIcon type="error">
          {error.message}
        </Message>
      );
      toaster.push(message);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" appearance="primary" onClick={open}>
        <CreativeIcon /> Create new chat room
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <Form.Group controlId="name">
              <Form.ControlLabel>Room name</Form.ControlLabel>
              <Form.Control name="name" placeholder="Enter chat room name..." />
            </Form.Group>
            <Form.Group controlId="textarea">
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control rows={5} name="textarea" accepter={Textarea} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateRoomBtnModal;

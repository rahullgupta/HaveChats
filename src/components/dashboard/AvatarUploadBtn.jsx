import React, { useState } from 'react';
import { Modal, useToaster, Message, Button } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/custom-hooks';

const fileInputTypes = '.png, .jpeg, .jpg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const isValidFile = file => acceptedFileTypes.includes(file.type);

function AvatarUploadBtn() {
  const { isOpen, open, close } = useModalState();

  const toaster = useToaster();

  const [img, setImg] = useState(null);

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        const message = (
          <Message showIcon type="warning">
            Wrong file type {file.type}
          </Message>
        );
        toaster.push(message);
      }
    }
  };

  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            type="file"
            className="d-none"
            id="avatar-upload"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal open={isOpen} onClose={close}>
          <Modal.Header>Adjust and Upload new Avatar</Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AvatarUploadBtn;

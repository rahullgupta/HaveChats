import React, { useState, useCallback } from 'react';
import { Input, InputGroup, IconButton, useToaster, Message } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';
import EditIcon from '@rsuite/icons/Edit';
import CheckIcon from '@rsuite/icons/Check';

function EditableInput({
  startingvalue = '',
  onSave = false,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Input is empty',
  wrapperClassName = '',
  ...inputProps
}) {
  const [input, setInput] = useState(startingvalue);

  const [isEditable, setIsEditable] = useState(false);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(startingvalue);
  }, [startingvalue]);

  const toaster = useToaster();

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      const message = (
        <Message showIcon type="info">
          {emptyMsg}
        </Message>
      );
      toaster.push(message);
    }
    if (trimmed !== startingvalue) {
      await onSave(trimmed);
    }
    setIsEditable(false);
  };

  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <IconButton
          icon={isEditable ? <CloseIcon /> : <EditIcon />}
          onClick={onEditClick}
        />
        {isEditable && (
          <IconButton icon={<CheckIcon />} onClick={onSaveClick} />
        )}
      </InputGroup>
    </div>
  );
}

export default EditableInput;

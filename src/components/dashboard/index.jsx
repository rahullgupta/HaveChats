import React from 'react';
import { Drawer, Button, Divider, useToaster, Message } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import AvatarUploadBtn from './AvatarUploadBtn';
import ProviderBlock from './ProviderBlock';
import { getUserUpdates } from '../../misc/helpers';

function Dashboard({ onSignOut }) {
  const { profile } = useProfile();

  const toaster = useToaster();

  const onSave = async newData => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        'name',
        newData,
        database
      );

      await database.ref().update(updates);

      const message = (
        <Message showIcon type="success">
          Nickname has been updated
        </Message>
      );
      toaster.push(message);
    } catch (err) {
      const message = (
        <Message showIcon type="error">
          {err.message}
        </Message>
      );
      toaster.push(message);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
        <Drawer.Actions>
          <Button block color="red" appearance="primary" onClick={onSignOut}>
            Sign Out
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          startingvalue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>
    </>
  );
}

export default Dashboard;

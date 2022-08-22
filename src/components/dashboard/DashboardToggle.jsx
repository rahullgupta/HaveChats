import React, { useCallback } from 'react';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { Button, Drawer, useToaster, Message } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';
import { auth } from '../../misc/firebase';

function DashboardToggle() {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery('(max-width: 992px');

  const toaster = useToaster();

  const onSignOut = useCallback(() => {
    auth.signOut();

    const message = (
      <Message showIcon type="info">
        Signed Out
      </Message>
    );
    toaster.push(message);

    close();
  }, [close, toaster]);

  return (
    <>
      <Button block color="blue" appearance="primary" onClick={open}>
        <DashboardIcon /> Dashboard
      </Button>
      <Drawer
        size={isMobile ? 'full' : 'sm'}
        open={isOpen}
        onClose={close}
        placement="left"
      >
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
}

export default DashboardToggle;

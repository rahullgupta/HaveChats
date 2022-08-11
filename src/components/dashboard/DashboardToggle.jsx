import React from 'react';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';

function DashboardToggle() {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery('(max-width: 992px');
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
        <Dashboard />
      </Drawer>
    </>
  );
}

export default DashboardToggle;

import React, { useState } from 'react';
import { Button, Tag, useToaster, Message } from 'rsuite';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import firebase from 'firebase';
import { auth } from '../../misc/firebase';

function ProviderBlock() {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const toaster = useToaster();

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId, false);
      const message = (
        <Message showIcon type="info">
          Disconnected from {providerId}
        </Message>
      );
      toaster.push(message);
    } catch (error) {
      const message = (
        <Message showIcon type="error">
          {error.message}
        </Message>
      );
      toaster.push(message);
    }
  };

  const unlinkFacebook = () => {
    unlink('facebook.com');
  };

  const unlinkGoogle = () => {
    unlink('google.com');
  };

  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);
      updateIsConnected(provider.providerId, true);
      const message = (
        <Message showIcon type="info">
          Linked to {provider.providerId}
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

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };

  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag closable color="green" onClose={unlinkGoogle}>
          <GoogleIcon /> Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag closable color="blue" onClose={unlinkFacebook}>
          <FacebookOfficialIcon /> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" appearance="primary" onClick={linkGoogle}>
            <GoogleIcon /> Link to Google
          </Button>
        )}

        {!isConnected['facebook.com'] && (
          <Button
            block
            color="blue"
            appearance="primary"
            onClick={linkFacebook}
          >
            <FacebookOfficialIcon /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProviderBlock;

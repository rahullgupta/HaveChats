import React from 'react';
import {
  Container,
  Grid,
  Row,
  Col,
  Panel,
  Button,
  Message,
  useToaster,
} from 'rsuite';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

function SignIn() {
  const toaster = useToaster();
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      const message = (
        <Message showIcon type="success">
          Signed In
        </Message>
      );
      toaster.push(message);
    } catch (err) {
      const message = (
        <Message showIcon type="info">
          {err.message}
        </Message>
      );
      toaster.push(message);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive chat platform for neophytes</p>
              </div>
              <div className="mt-3">
                <Button
                  block
                  color="blue"
                  appearance="primary"
                  onClick={onFacebookSignIn}
                >
                  <FacebookOfficialIcon /> Continue with Facebook
                </Button>
                <Button
                  block
                  color="green"
                  appearance="primary"
                  onClick={onGoogleSignIn}
                >
                  <GoogleIcon /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
}

export default SignIn;

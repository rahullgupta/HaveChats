import React, { useCallback, useState } from 'react';
import { InputGroup, Message, useToaster } from 'rsuite';
import { Icon } from '@rsuite/icons';
import * as faMicrophone from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import { storage } from '../../../misc/firebase';

function FaSvgIcon({ faIcon, ...rest }) {
  const { width, height, svgPathData } = faIcon;

  return (
    <svg
      {...rest}
      viewBox={`0 0 ${width} ${height}`}
      width="1.05em"
      height="1.05em"
      fill="currentColor"
    >
      <path d={svgPathData} />
    </svg>
  );
}

function AudioMsgBtn({ afterUpload }) {
  const chatId = useParams();

  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onClick = useCallback(() => {
    setIsRecording(p => !p);
  }, []);

  const toaster = useToaster();

  const onUpload = useCallback(
    async data => {
      setIsUploading(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
        setIsUploading(false);
        afterUpload(file);
      } catch (err) {
        setIsUploading(false);
        const message = (
          <Message showIcon type="error">
            {err.message}
          </Message>
        );
        toaster.push(message);
      }
    },
    [afterUpload, chatId, toaster]
  );

  return (
    <InputGroup.Button
      onClick={onClick}
      disabled={isUploading}
      className={isRecording ? 'animate-blink' : ''}
    >
      <Icon as={FaSvgIcon} faIcon={faMicrophone} />
      <ReactMic
        record={isRecording}
        className="d-none"
        onStop={onUpload}
        mimeType="audio/mp3"
      />
    </InputGroup.Button>
  );
}

export default AudioMsgBtn;

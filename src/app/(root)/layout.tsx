import React, { ReactNode } from 'react';
import {StreamVideoProvider} from '../../../providers/StreamClientProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;

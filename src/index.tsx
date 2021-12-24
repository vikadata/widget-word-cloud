import React from 'react';
import { initializeWidget } from '@vikadata/widget-sdk';
import Main from './components/main';

export const HelloWorld: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <Main />
    </div>
  );
};

initializeWidget(HelloWorld, process.env.WIDGET_PACKAGE_ID);

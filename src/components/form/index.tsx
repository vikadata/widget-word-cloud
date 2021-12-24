import { useRecord } from "@vikadata/widget-sdk";
import React, { useEffect, useState } from "react";
import { Switch, Button } from "@vikadata/components";

export default (props)=>{
  const {updateConfig} = props

  const configHandler = () => {
    // todo get config
    let config = {name: 'laox'};
    updateConfig(config);
  }
  let [autoRender, setAutoRender] = useState(false);

  return (
    <div style={{padding: 8}}>
      <p>打开自动render:
        <Switch checked={autoRender}
                onClick={(s)=>{
                  setAutoRender(s);
                  alert(`状态改为${s ? '开启' : '关闭'}`);
                }}
        />
      </p>
      <Button color="primary" variant="fill" size="small" onClick={configHandler}>
        生成
      </Button>
    </div>
  );
}
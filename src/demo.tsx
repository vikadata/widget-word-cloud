import React, {useRef, useState} from 'react';
import { useField, FieldPicker, useActiveViewId, useCloudStorage, useActiveCell, useRecord} from '@vikadata/widget-sdk';
import { Segment, useDefault } from 'segmentit';
import Axios from 'axios';
import 

export const Demo: React.FC = () => {
    
    
    const Test = () => {
       // Process 3 strings and get corpus of all the texts.
        WordFreq(options)
        .process(text).process(text2).process(text3)
        .getList(function (list) {
        console.log(list);
        });
    }

    return (
        <div>
            <p>选择附件字段</p>
            <FieldPicker viewId={viewId} fieldId={fieldId} onChange={option => {setFieldId(option.value)}} />        
            <p>---------</p>
            <button onClick={GetWordCloud}>Click</button>
            <p>---------</p>
            <img ref={myCanvas}></img>
        </div>
    );
};
function WordFreq(options: any) {
    throw new Error('Function not implemented.');
}


import $ from 'jquery'; 
import React, {useRef, useState} from 'react';
import { useField, FieldPicker, useActiveViewId, useCloudStorage, useActiveCell, useRecord} from '@vikadata/widget-sdk';
import { Segment, useDefault } from 'segmentit';
import { WordCloud } from 'wordcloud2';
import Axios from 'axios';


export const DanmuArr: React.FC = () => {
    
    const viewId = useActiveViewId();
    const [fieldId, setFieldId] = useCloudStorage<string>('selectFieldId');
    const [txtData, setTxtData] = useState<null | any>() // 存放弹幕数组

    const myCanvas = useRef(null);

    const currentField = useField(fieldId)
    const activeCell = useActiveCell(); // 获取当前光标激活的单元格坐标
    const activeRecord = useRecord(activeCell?.recordId) // 获取一个指定记录的信息
    const word_cloud_txt = activeRecord?.getCellValue(fieldId) // 获取 Record 中的的词云文本附件


    React.useEffect(() => {
        console.log("此时的字段（fieldId）:",fieldId)
        GetList()
  
    },[activeCell])

    React.useEffect(() => {
        console.log("此时的txt文本:",txtData)       
    },[txtData])

    const GetList = () => {
        console.log('------')
        console.log("类型是:", currentField?.type)
        if(currentField?.type !== 'Attachment'){
            console.log('所选单元格非附件类型')
        }else{
            console.log("内容是: ", word_cloud_txt)
            console.log("文件名是: ", word_cloud_txt ? word_cloud_txt[0]['name'] : null)
            
            console.log("文件地址: ", word_cloud_txt ? word_cloud_txt[0]['url'] : null)
            // 放送axios网络请求，解析附件数据
            if (word_cloud_txt){
                Axios.get(word_cloud_txt[0]['url'])
                .then((response)=>{
                    setTxtData(response.data.split('\n '))
                })
            }else{
                console.log('未找到附件url')
            }
            
        }
    }


    

    const GetWordCloud = () => {
        var new_arr = []
        const segmentit = useDefault(new Segment());
        txtData?.forEach(item => {
            const result = segmentit.doSegment(item, {
                simple: true,
                stripPunctuation: true});
           
            new_arr = [...new_arr, ...result]
        })
        // const new_text = txtData?.toString()
        // const result = segmentit.doSegment(new_text, {
        //             stripPunctuation: true});
        
        console.log(new_arr);
        // $.WordCloud(myCanvas, { list: new_arr} );
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

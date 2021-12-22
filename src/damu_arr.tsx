import React, {useRef, useState} from 'react';
import { useField, FieldPicker, useActiveViewId, useCloudStorage, useActiveCell, useRecord, useRecords, useDatasheet, Datasheet } from '@vikadata/widget-sdk';
import ReactWordcloud from 'react-wordcloud';


export const DanmuArr: React.FC = () => {
    
    const viewId = useActiveViewId();
    const [fieldId, setFieldId] = useCloudStorage<string>('selectFieldId');
    const [txtData, setTxtData] = useState<null | any>() // 存放弹幕数组
    const [info, setInfo] = useState<any>() // 存放需要渲染的词云字典

    // const myCanvas = useRef(null);

    const currentField = useField(fieldId)
    const activeCell = useActiveCell(); // 获取当前光标激活的单元格坐标
    const activeRecord = useRecord(activeCell?.recordId) // 获取一个指定记录的信息
    const word_cloud_txt = activeRecord?.getCellValueString(fieldId) // 获取 Record 中的的词云文本附件
    

    const datasheet = useDatasheet('dstdELmEu5S8WZEbxt') as Datasheet;
    const records = useRecords(datasheet, 'viw07BCWwNLka');
    

    React.useEffect(() => {
        console.log("此时的字段（fieldId）:",fieldId)
        GetList()
  
    },[activeCell])

    React.useEffect(() => {
        console.log("此时的txt文本:",txtData)       
    },[txtData])

    React.useEffect(() => {
        console.log("此时的info:",info)       
    },[info])

    const GetList = () => {
        console.log('------')
        console.log("列名是:", currentField?.name)
        //如果选择了附件列，就解析里面的txt文件，如果是其他类型的列，就提示‘所选单元格非附件类型’
        if(currentField?.name !== 'BV号'){
            console.log('所选单元格所在列非「BV号」')
        }else{
            console.log("内容是: ", word_cloud_txt)

            // 获取分词表中对应BV号的数据
            if (word_cloud_txt){
                var obj = {}
                var arr = []
                // var fenciBvid = records[0].getCellValueString('fldce06mQ57K6')

                records.forEach(record => {
                    const fenciBvid = record.getCellValueString('fldce06mQ57K6')
                    const fenciFreq = record.getCellValueString('fldqmpvgg1c6o')
                    if (fenciBvid === word_cloud_txt){
                        arr = [...arr, {
                            text: record.title,
                            value: fenciFreq
                        }]
                    }
                })

                // const arr = records.map(record => {
                    
                //     const fenciBvid = record.getCellValueString('fldce06mQ57K6')
                //     const fenciFreq = record.getCellValueString('fldqmpvgg1c6o')
                //     if (fenciBvid === word_cloud_txt){
                //         obj['text'] = record.title
                //         obj['value'] = fenciFreq
                //     }

                //     return obj
                // })
                setInfo(arr)
                console.log("arr:", arr)
            }else{
                console.log('未找到BV号')
            }
            
        }
    }



    return (
        <div>
            <p>选择「BV号」字段</p>
            <FieldPicker viewId={viewId} fieldId={fieldId} onChange={option => {setFieldId(option.value)}} />        
            <p>---------</p>
            <ReactWordcloud words={info} />
            
        </div>
    );
};

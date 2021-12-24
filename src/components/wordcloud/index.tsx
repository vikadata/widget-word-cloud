import { Datasheet, useActiveCell, useDatasheet, useRecord, useRecords } from "@vikadata/widget-sdk";
import genFontImage from './fontShape';
import _ from 'lodash';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import 'echarts-wordcloud';
import React, { useEffect, useState } from 'react';

const img = new Image();
// let mask = genFontImage({text: '快'});
// console.log(mask);
img.crossOrigin = "Anonymous";
img.src = 'https://s1.vika.cn/space/2021/12/23/299cbe2236fc4b748cf721f20e371b0e?attname=img.png';

interface IObj {
  name: string,
  value: number
}

interface DictObj {
  [key: string]: number
}

interface IConfig {
series: [{ data: Array<IObj>, [key: string]: any;}],
[key: string]: any
}

function translate(origin: DictObj): Array<IObj>{
  let res:Array<IObj> = [];
  for(let word in origin){
    res.push({name: word, value: origin[word]})
  }
  return res
}

function frequencyAna(all_words): DictObj {
  let word_frequency: DictObj = {}
  for (const word of all_words) {
    if (word_frequency[word]) {
      word_frequency[word] += 1
    } else {
      word_frequency[word] = 1
    }
  }
  return word_frequency;
}


export default () => {
  /*
    todo: 生成能使用的maskImage
    let img = new Image();
    let imgData = genFontImage({text: '你好'});
    console.log(imgData);
    img.src = imgData;
  */
  let initData: Array<IObj> = [];
  const [txtData, setTxtData] = useState(initData) // 存放弹幕数组
  // let danmus: Array<string> = [];
  let defaultConfig: IConfig = {
    tooltip: {},
    series: [{
      type: 'wordCloud',
      width: '100%',
      height: '100%',
      left: 'center',
      top: 'center',
      autoSize: {
        enabled: true,
        minSize: 4
      },
      // drawOutOfBound: false,
      // maskImage: img,
      // shrinkToFit: false,
      // maskColor: '#282020',
      textStyle: {
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      data: []
    }]
  };
  let [config, setConfig] = useState(defaultConfig)

  const datasheet = useDatasheet('dstdELmEu5S8WZEbxt') as Datasheet;
  const records = useRecords(datasheet, 'viw07BCWwNLka'); // 分词表的所有记录

  const activeCell = useActiveCell();
  const activeRecord = useRecord(activeCell?.recordId);
  // const word_cloud_txt = activeRecord?.getCellValue('fldyFSIBHgzeL');
  const bv_id = activeRecord?.getCellValue('fldHJ56W85SP4');
  // const GetWordCloud = (danmus) => {
  //   let word_frequency: DictObj = frequencyAna(danmus);
  //   return translate(word_frequency);
  // }

  useEffect(() => {
    if (!activeCell) return;
    let text: Array<IObj> = [];
    let words = records.filter(r => {
      return r.getCellValueString('fldce06mQ57K6') === bv_id;
    })
    words.forEach((r) => {
      let freq = r.getCellValueString('fldqmpvgg1c6o');

      text.push({
        name: r.title as string,
        value: Number(freq)
      });
    })
    setTxtData(text);
    // if (word_cloud_txt) {
    //   Axios.get(word_cloud_txt[0]['url'])
    //     .then((response) => {
    //       danmus = response.data.split('\n ');
    //       setTxtData(GetWordCloud(danmus));
    //     })
    // } else {
    //   console.log('未找到附件url')
    // }
  }, [activeCell]);

  useEffect(() => {
  }, [activeRecord]);

  useEffect(() => {
    let deep = _.cloneDeep(defaultConfig);
    deep.series[0].data = txtData;
    // console.log(deep);
    setConfig(deep);
  }, [txtData])

  return (
    <div style={{width: '100%'}}>
      <ReactECharts option={config}/>
    </div>
  )
};
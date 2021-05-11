import React, { useState, useRef, useEffect } from 'react';
import {
  CaretRightOutlined,
  PauseOutlined,
  BackwardOutlined,
  ForwardOutlined,
} from '@ant-design/icons';
import { message, Slider } from 'antd';
import { getVideoTime } from '../utils/getMatch';

import './index.less';

interface Voice {
  /** 音频地址 */
  voiceSrc: string;
}
const INIT_VOICE = {
  playTime: '00:00',
  totalTime: '00:00',
  total: 100,
};
export default function Voice(props: Voice) {
  const initRef: any = null;
  const voiceEl: any = useRef();
  const step = useRef(0);
  const intervalRef = useRef(initRef);
  const { voiceSrc } = props;
  const [startFlag, setStartFlag] = useState(false);
  const [voiceInfo, setVoiceInfo] = useState(INIT_VOICE);
  // 切换音频时更新数据
  useEffect(() => {
    if (!voiceSrc) {
      step.current = 0;
      setStartFlag(false);
      setVoiceInfo(INIT_VOICE);
    }
  }, [voiceSrc]);
  // type: timeOut 设置的定时任务； 无  拖动进度条
  const onChange = (value: number, type?: string) => {
    step.current = value;
    const playTime = getVideoTime(value);
    if (startFlag && type !== 'timeOut') {
      voiceEl.current.currentTime = value;
    }
    setVoiceInfo({
      ...voiceInfo,
      playTime,
    });
  };
  // onLoad 音频初始数据加载完成
  const onLoad = () => {
    if (voiceEl.current) {
      const total = Math.ceil(voiceEl.current.duration || 0);
      const totalTime = getVideoTime(total);
      step.current = 0;
      setVoiceInfo({
        ...voiceInfo,
        playTime: '00:00',
        totalTime,
        total,
      });
    }
  };
  // onEnd 音频播放完成
  const onEnd = () => {
    clearTimeout(intervalRef.current);
    step.current = voiceInfo.total;
    setStartFlag(false);
    setVoiceInfo({
      ...voiceInfo,
      playTime: voiceInfo.totalTime,
    });
  };
  // 定时器更新进度
  const updateCurrent = () => {
    onChange(step.current + 1, 'timeOut');
    intervalRef.current = setTimeout(updateCurrent, 1000);
  };
  // startFlag 点击按钮回调
  useEffect(() => {
    if (voiceEl && voiceEl.current) {
      if (startFlag) {
        // 播放结束再点击播放，从头开始
        step.current = step.current >= voiceInfo.total ? 0 : step.current;
        voiceEl.current.currentTime = step.current;
        voiceEl.current.play();
        intervalRef.current = setTimeout(updateCurrent, 1000);
      } else {
        voiceEl.current.pause();
        clearTimeout(intervalRef.current);
      }
    }
    return () => {
      clearTimeout(intervalRef.current);
    };
  }, [startFlag]);
  const quickStep = (type: string) => {
    const add = type === 'add' ? 5 : -5;
    const newValue = step.current + add;
    let result = newValue;
    if (result > voiceInfo.total) {
      result = voiceInfo.total;
    } else if (result < 0) {
      result = 0;
    }
    onChange(result);
  };
  return (
    <div className="ii-business-voice-container">
      {voiceSrc && (
        <audio
          onEnded={onEnd}
          onLoadedData={onLoad}
          // onDurationChange={onLoad}
          controls
          ref={voiceEl}
          style={{ width: '0', height: '0' }}
        >
          <source src={voiceSrc} />
        </audio>
      )}
      <div className="ii-business-voice-control">
        <div
          className="ii-business-voice-play-btn"
          onClick={() => {
            if (!voiceSrc) {
              return message.error('暂无音频');
            } else if (voiceInfo.totalTime === '00:00') {
              return message.error('音频加载中');
            }
            setStartFlag(!startFlag);
          }}
        >
          {!startFlag ? <CaretRightOutlined /> : <PauseOutlined />}
        </div>
        <div className="ii-business-voice-time-container">
          {voiceInfo.playTime} <span>/</span> {voiceInfo.totalTime}
        </div>
        <Slider
          className="ii-business-voice-slider"
          value={step.current}
          tooltipVisible={false}
          min={0}
          max={voiceInfo.total}
          onChange={onChange}
        ></Slider>
        <div className="ii-business-voice-play-quick-btn">
          <BackwardOutlined
            className="ii-business-voice-quickbtn"
            onClick={quickStep.bind(null, 'minus')}
          />
          <ForwardOutlined
            className="ii-business-voice-quickbtn"
            onClick={quickStep.bind(null, 'add')}
          />
        </div>
      </div>
    </div>
  );
}

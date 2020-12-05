import React, { useState, useRef, useEffect, CSSProperties } from 'react';

import './index.less';

type MarkInfo = {
  /** 服务端计算位置时pdf 的宽度 */
  width: number;
  /** 服务端计算位置时pdf 的高度 */
  height: number;
  /** 要标记的位置信息 */
  locations: number[];
  /** 第几页pdf */
  page: number;
};

type CanvasItem = { id: number; style: CSSProperties };

interface ScrollPdf {
  /** 背景色 */
  bgColor?: string;
  /** markinfo style */
  markStyle?: CSSProperties;
  /** 一次展示页数 */
  showItem?: number;
  /** pdf 地址或者base64字符串 */
  pdfFile: string;
  /** 标记信息 */
  markInfoOrigin?: MarkInfo;
  /** 当pdf滚动展示页数发生变化时回调 */
  onScroll?: (params: any) => void;
  /** 获取canvas scaleInfo信息 */
  getScaleInfo?: (params: any) => void;
  /** 当pdf滚动展示页数发生变化时回调 */
  onChangePages?: (pages: number, curret?: number) => void;
}

export default function ScrollPdf(props: ScrollPdf) {
  const {
    markStyle,
    bgColor = '#eee',
    showItem = 4,
    pdfFile,
    markInfoOrigin,
    onChangePages,
    getScaleInfo,
    onScroll,
  } = props;
  const initRef: any = null;
  const initObj: any = {};
  const initArr: any = [];
  const canvasParent = useRef(initRef);
  const canvasContainer = useRef(initRef);
  const intervalId = useRef(initRef);

  const [scrollArray, setScrollArray] = useState(initArr);
  const [scaleInfo, setScaleInfo] = useState(initObj);
  const [pdfObj, setPdfObj] = useState(initObj);

  const [pdfPagesNum, setPdfPagesNum] = useState(0);
  const [pdfStartEnd, setPdfStartEnd] = useState({ start: 0, end: 0 });
  const [current, setCurrent] = useState(1);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [markinfo, setMarkInfo] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    zindex: -1,
    opacity: 0,
  });
  /** 更新canvas-total height */
  useEffect(() => {
    const canvasHeight = (scaleInfo.height + 10) * pdfPagesNum;
    setCanvasHeight(canvasHeight);
  }, [scaleInfo, pdfPagesNum]);

  /** scrollArray 变化时更新canvas */
  useEffect(() => {
    if (scrollArray.length) {
      updateCanvas();
    }
  }, [scrollArray]);

  /** pdfFile 变化时initData */
  useEffect(() => {
    if (pdfFile) {
      intervalId.current = setInterval(() => {
        if (pdfjsLib) {
          clearInterval(intervalId.current);
          initData(pdfFile);
        }
      }, 100);
    }
    /** 清楚定时器 */
    return () => {
      clearInterval(intervalId.current);
    };
  }, [pdfFile]);

  /** markInfoOrigin 变化时更新markInfo */
  useEffect(() => {
    if (markInfoOrigin) {
      markText(markInfoOrigin);
    }
  }, [markInfoOrigin]);

  const markText = (marnInfo: MarkInfo) => {
    const {
      locations = [],
      width: originWidth,
      height: originHeight,
      page = 0,
    } = marnInfo;

    const { width, height } = scaleInfo;
    let heightM = 0;
    let top = 0;
    if (locations.length > 0 && width) {
      const unitW = width / originWidth;
      const unitH = height / originHeight;
      top = locations[1] * unitH;
      heightM = (locations[5] - locations[1]) * unitH;
      const markInfo = {
        left: locations[0] * unitW,
        top: top + page * (height + 10),
        width: (locations[2] - locations[0]) * unitW,
        height: heightM,
        zindex: 1,
        opacity: 1,
      };
      setMarkInfo(markInfo);
    }
    if (height) {
      const newPage = page;
      if (newPage !== current) {
        setCurrent(current);
        getScrollArray(newPage, height, true);
      }
      // markinfo 垂直居中
      const alignHeight = top + heightM / 2 - height / 2;
      const resultHeight = alignHeight > 0 ? alignHeight : 0;
      const scrollTop = page * (height + 10) + resultHeight;
      canvasContainer.current.scrollTop = scrollTop;
    }
  };

  const initData = function(pdfFile: string) {
    /** 区分base64字符串与网络地址 */
    const base64Flag = pdfFile.startsWith('data:');
    let documentObj: any = pdfFile;
    if (base64Flag) {
      const atobStr = pdfFile.substring(pdfFile.indexOf(',') + 1);
      documentObj = { data: atob(atobStr) };
    }
    pdfjsLib.getDocument(documentObj).promise.then(function(pdf: any) {
      //PDF转换为canvas
      if (pdf) {
        setPdfObj(pdf);
        const pageNum = pdf.numPages;
        setPdfPagesNum(pageNum);
        getScale(pdf).then((res: any) => {
          const { height } = res;
          getScrollArray(current, height, false, pageNum);
        });
        if (onChangePages) {
          onChangePages(pageNum);
        }
      }
    });
  };

  const getScrollArray = function(
    pageNum: number,
    pageHeight: number,
    refresh?: boolean,
    totalNums?: number,
  ) {
    const maxNum = totalNums || pdfPagesNum;
    const height = pageHeight || scaleInfo.height;
    const gap = Math.ceil((showItem - 1) / 2);
    const start = Math.max(1, pageNum - gap);
    const end = Math.min(maxNum, pageNum + gap);
    const result: CanvasItem[] = [];
    for (let index = start; index <= end; index++) {
      result.push({
        id: index,
        style: {
          height: `${height}px`,
          top: `${(index - 1) * (height + 10)}px`,
        },
      });
    }
    setPdfStartEnd({ start, end });
    if (refresh) {
      setScrollArray([]);
      setTimeout(() => {
        setScrollArray(result);
      }, 100);
    } else {
      setScrollArray(result);
    }
  };
  const getScale = function(pdfObj: any) {
    return pdfObj.getPage(1).then(function(page: any) {
      const { width, height } = page.getViewport({ scale: 1 });
      const { offsetWidth } = canvasParent.current;
      const scale = offsetWidth / width;
      const resultHeight = scale * height;
      const scaleInfo = {
        scale,
        width: parseInt(offsetWidth),
        height: resultHeight,
      };
      setScaleInfo(scaleInfo);
      getScaleInfo && getScaleInfo(scaleInfo);
      return scaleInfo;
    });
  };
  const drawCanvas = (
    pdfObj: any,
    pageNumber: number,
    canvas: any,
    scale = 1,
    rotateFlag?: boolean,
  ) => {
    // var scale = 2;
    pdfObj.getPage(pageNumber).then(function(page: any) {
      var viewport = page.getViewport({ scale });
      const { width, height } = viewport;
      var context = canvas.getContext('2d');
      canvas.width = rotateFlag ? height : width;
      canvas.height = rotateFlag ? width : height;

      var renderContext = {
        canvasContext: context,
        viewport,
      };
      page.render(renderContext);
    });
  };
  const handleScroll = (e: any) => {
    const { scrollTop } = e.currentTarget;
    const { height } = scaleInfo;
    onScroll && onScroll(e);
    if (height) {
      const newPage = Math.ceil(scrollTop / height) + 1;
      if (newPage !== current) {
        setCurrent(newPage);
        getScrollArray(newPage, height);
        if (onChangePages) {
          onChangePages(pdfPagesNum, newPage - 1);
        }
      }
    }
  };
  const updateCanvas = () => {
    const { start, end } = pdfStartEnd;
    for (let index = start; index <= end; index++) {
      const canvasDom = document.getElementById(`canvas${index}`);
      if (canvasDom) {
        drawCanvas(pdfObj, index, canvasDom, scaleInfo.scale);
      }
    }
  };

  return (
    <div
      className="ii-business-scrollpdf-parent"
      onScroll={handleScroll}
      ref={canvasContainer}
      style={{
        height: `${scaleInfo.height}px`,
        background: scaleInfo.height ? bgColor : '#fff',
        // scrollMarginTop: `${scrollTop}px`,
      }}
    >
      <div
        className="ii-business-scrollpdf-total"
        ref={canvasParent}
        style={{
          height: `${canvasHeight}px`,
        }}
      >
        <div
          className="ii-business-scrollpdf-result"
          style={{
            left: markinfo.left + 'px',
            top: markinfo.top + 'px',
            width: markinfo.width + 'px',
            height: markinfo.height + 'px',
            zIndex: markinfo.zindex,
            opacity: markinfo.opacity,
            ...markStyle,
          }}
        ></div>

        {scrollArray.map((item: any, index: number) => {
          return (
            <canvas
              className="canvas"
              style={item.style}
              key={item.id}
              id={`canvas${item.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}

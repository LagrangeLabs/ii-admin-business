import React, { useState, useRef, useEffect, CSSProperties } from 'react';

import './index.less';

type MarkInfo = {
  /** 服务端计算位置时pdf 的宽度 */
  width: number;
  /** 服务端计算位置时pdf 的高度 */
  height: number;
  /** 要标记的位置信息 */
  locations: number[][];
  /** 第几页pdf */
  page: number;
  /** 标记更新时是否自动滚动页面到中部，默认值为true */
  scrollToMiddle: boolean;
};

type CanvasItem = { id: number; style: CSSProperties };

interface ScrollPdf {
  /** 背景色 */
  bgColor?: string;
  /** markinfo style */
  markStyle?: CSSProperties;
  /** 页面大小发生变化 */
  resize?: boolean;
  /** 一次展示页数, 默认值5 */
  showItem?: number;
  /** canvas item 间距，默认值10 */
  itemGap?: number;
  /** pdf 地址或者base64字符串 */
  pdfFile: string;
  /** 标记信息 */
  markInfoOrigin?: MarkInfo;
  /** canvas id 前缀，默认值canvas */
  canvasIdPrefix?: string;
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
    showItem = 5,
    itemGap = 10,
    resize,
    pdfFile,
    markInfoOrigin,
    canvasIdPrefix = 'canvas',
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
  const [pdfPreStartEnd, setPdfPreStartEnd] = useState({ start: 0, end: 0 });
  const [current, setCurrent] = useState(1);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [markinfoList, setMarkInfoList] = useState([
    {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      zindex: -1,
      opacity: 0,
    },
  ]);
  /** 更新canvas-total height */
  useEffect(() => {
    const canvasHeight = (scaleInfo.height + itemGap) * pdfPagesNum;
    setCanvasHeight(canvasHeight);
  }, [scaleInfo, pdfPagesNum]);

  /** 页面大小发生变化 */
  useEffect(() => {
    if (resize) {
      const topPre = canvasContainer.current.scrollTop;
      const { height: preHeight } = scaleInfo;
      const scale = topPre / preHeight;
      getScale(pdfObj).then((res: any) => {
        const { height } = res;
        getScrollArray(current, height);
        canvasContainer.current.scrollTop = scale * height;
      });
    }
  }, [resize]);

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

  const getMarkList = (
    locations: number[][],
    unitH: number,
    unitW: number,
    height: number,
    pageNum: number,
  ) => {
    const list = [];
    for (let index = 0, len = locations.length; index < len; index++) {
      const element = locations[index];
      const page = element[6] || pageNum;
      const top = element[1] * unitH;
      const heightM = (element[5] - element[1]) * unitH;
      const markInfo = {
        left: element[0] * unitW,
        top: top + (page - 1) * (height + itemGap),
        width: (element[2] - element[0]) * unitW,
        height: heightM,
        zindex: 1,
        opacity: 1,
      };
      list.push(markInfo);
    }
    return list;
  };

  const markText = (marnInfo: MarkInfo) => {
    const {
      locations = [],
      width: originWidth,
      height: originHeight,
      page = 1,
      scrollToMiddle = true,
    } = marnInfo;

    const { width, height } = scaleInfo;
    const unitW = width / originWidth;
    const unitH = height / originHeight;
    let heightM = 0;
    let top = 0;
    if (locations.length > 0 && width) {
      const firstLocation = locations[0];
      top = firstLocation[1] * unitH;
      heightM = (firstLocation[5] - firstLocation[1]) * unitH;
      const resultList = getMarkList(locations, unitH, unitW, height, page);
      setMarkInfoList(resultList);
    }
    if (height) {
      const newPage = page;
      if (newPage !== current) {
        setCurrent(current);
        getScrollArray(newPage, height);
      }
      if (scrollToMiddle) {
        // markinfoList 垂直居中
        const heightContainer = canvasContainer.current.offsetHeight;
        const alignHeight = top + heightM / 2 - (heightContainer || height) / 2;
        // const resultHeight = alignHeight > 0 ? alignHeight : 0;
        const scrollTop = (page - 1) * (height + itemGap) + alignHeight;
        const max = pdfPagesNum * (height + itemGap) - heightContainer;
        const resultTop = scrollTop < 0 ? 0 : scrollTop > max ? max : scrollTop;
        canvasContainer.current.scrollTop = resultTop;
        ``;
      }
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
          getScrollArray(current, height, pageNum);
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
    totalNums?: number,
  ) {
    const maxNum = totalNums || pdfPagesNum;
    const height = pageHeight || scaleInfo.height;
    const gap = Math.ceil((showItem - 1) / 2);
    const start = Math.max(1, pageNum - gap);
    const end = Math.min(maxNum, start + showItem - 1);
    const result: (CanvasItem | null)[] = [];
    for (let index = 0; index <= maxNum; index++) {
      if (index >= start && index <= end) {
        result.push({
          id: index,
          style: {
            height: `${height}px`,
            top: `${(index - 1) * (height + itemGap)}px`,
          },
        });
      } else {
        result.push(null);
      }
    }

    setPdfStartEnd({ start, end });
    setScrollArray(result);
  };
  const getScale = function(pdfObj: any) {
    return (
      pdfObj &&
      pdfObj.getPage(1).then(function(page: any) {
        const { width, height } = page.getViewport({ scale: 1 });
        const { offsetWidth } = canvasParent.current;
        const scale = offsetWidth / width;
        const resultHeight = scale * height;
        const scaleInfo = {
          scale,
          width: parseInt(offsetWidth),
          height: resultHeight,
          ref: canvasContainer.current,
        };
        setScaleInfo(scaleInfo);
        getScaleInfo && getScaleInfo(scaleInfo);
        return scaleInfo;
      })
    );
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
    const { start: preStart, end: preEnd } = pdfPreStartEnd;
    for (let index = start; index <= end; index++) {
      const canvasDom = document.getElementById(`${canvasIdPrefix}${index}`);
      /** 已经绘制的canvas不再进行重复绘制 */
      const exist = index >= preStart && index <= preEnd;
      if (canvasDom && !exist) {
        drawCanvas(pdfObj, index, canvasDom, scaleInfo.scale);
      }
    }
    setPdfPreStartEnd({ start, end });
  };

  return (
    <div
      className="ii-business-scrollpdf-parent"
      onScroll={handleScroll}
      ref={canvasContainer}
      style={{
        height: '100%',
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
        {markinfoList.map((item, index: number) => {
          return (
            <div
              key={`index${index}`}
              className="ii-business-scrollpdf-result"
              style={{
                left: item.left + 'px',
                top: item.top + 'px',
                width: item.width + 'px',
                height: item.height + 'px',
                zIndex: item.zindex,
                opacity: item.opacity,
                ...markStyle,
              }}
            ></div>
          );
        })}
        {Array(pdfPagesNum)
          .fill(1)
          .map((_, index: number) => {
            const page = index + 1;
            const item = scrollArray[page];

            return (
              <div key={`page${page}`} id={`page${page}`}>
                {item ? (
                  <canvas
                    className="canvas"
                    style={item.style}
                    key={item.id}
                    id={`${canvasIdPrefix}${item.id}`}
                  />
                ) : null}
              </div>
            );
          })}
      </div>
    </div>
  );
}

/* eslint-disable func-names */
import React from 'react';
import { Editor } from './tinymce-react';
// import { uploadImage } from '@/services/global';

interface RichText {
  /** tinymce js文件地址 默认值为https://cdn-static-resources.ai-indeed.com/ii-fed-lib/ii-components-richtext/tinymce.min.js */
  tinymceSrc?: string;
  /** richtext值 */
  value?: string;
  /** formData上传文件时key值，默认值为file */
  fileKey?: string;
  /** 上传文件时自定义的值 */
  customData?: Record<string, unknown>;
  /** 富文本高度 默认值为500 */
  height?: number;
  /** 富文本内容改变回调  */
  onChange?: (params: string) => void;
  /** 图片上传成功回调函数，用于解析返回结果中的图片地址，默认值为(res) => res.data.file_url */
  callBack?: (params: any) => void;
  /** 图片上传方法 */
  uploadImage?: (params: FormData) => Promise<any>;
}

const callBackDefault = (res: any) => {
  const { data } = res;
  return data.file_url;
};

const RichText = (props: RichText) => {
  const {
    value,
    height = 500,
    fileKey = 'file',
    tinymceSrc = 'https://cdn-static-resources.ai-indeed.com/ii-fed-lib/ii-components-richtext/tinymce.min.js',
    onChange,
    uploadImage,
    customData = {},
    callBack = callBackDefault,
  } = props;

  const handleEditorChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Editor
      tinymceScriptSrc={tinymceSrc}
      value={value}
      init={{
        height,
        language: 'zh_CN',
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          // eslint-disable-next-line no-multi-str
          'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify \
             bullist numlist outdent indent | removeformat | help',
        images_upload_handler(
          blobInfo: { blob: () => any },
          sucCallback: (arg0: any) => void,
          failCallback: (arg0: string) => void,
        ) {
          const file = blobInfo.blob();
          const formData = new FormData();
          for (let customKey in customData) {
            formData.append(customKey, customData[customKey] as string);
          }
          formData.append(fileKey, file, file.name);
          if (uploadImage) {
            uploadImage(formData)
              .then(res => {
                const callBackParams = callBack(res);
                sucCallback(callBackParams);
              })
              .catch(() => {
                failCallback('图片上传失败');
              });
          }
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichText;

# ii-admin-business

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Build library via `father-build`,

```bash
$ npm run build
```

#### 组件单元测试

采用[jest](https://jestjs.io/docs/en/api) + [enzyme](https://enzymejs.github.io/enzyme/)方案

**注：**

- 第三方依赖若不需要重复安装，可以选择安装在 devDependencies，还需放到 peerDependencies 中，否则对于 cmj 输出的包，module 编译会报错

#### todo list

pdf 无限滚动
外呼时间选择
修改密码
图片、excel、pdf 等预览
文件下载
机器人对话列表

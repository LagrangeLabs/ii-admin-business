import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Button, message } from 'antd';
import { ITable } from 'ii-admin-ui';
import { SearchTree } from 'ii-admin-base';

import { TablePaginationConfig } from 'antd/lib/table';
// import { SorterResult } from 'antd/lib/table/interface';

import { IPageTableProps } from './interface';
import FilterOptions from '../filter-options';
import IPageHeader from '../i-page-header';

import './index.less';

const SORT_CONFIG = {
  ascend: '',
  descend: '-',
};
const getSortFilterParamsDefault = (
  key: string | number,
  sort: 'ascend' | 'ascend',
) => {
  const ordering = `${SORT_CONFIG[sort]}${key}`;
  return { ordering };
};

const PageTable: React.ForwardRefRenderFunction<any, IPageTableProps> = (
  props,
  ref,
) => {
  const {
    pageSize: defaultPageSize = 10,
    total,
    tableList,
    uniqueKey = 'id',
    getTableList,
    children,
    pageTitle,
    columns,
    filters = [],
    showCreate,
    leftCreate,
    showSearchTree,
    searchTreeKey,
    showSearch = true,
    createTitle = '新增',
    deleteTitle = '批量删除',
    defaultCondtions = {},

    treeData = [],
    treeExtra = {},
    titleField = 'name',
    keyField = 'id',
    childrenField = 'children',
    iconTag,
    gap = 12,
    treeNoCancel = false,
    orderingKey = 'ordering',
    onTreeSelect,
    createCallback,
    selectCallback,
    exportCallback,
    deleteCallback,
    selectTreeCallback,
    getSortFilterParams = getSortFilterParamsDefault,
    needExport,
    needPatchDelete,
    createIcon,
    downIcon,
    needSelect,
    needRefresh,
    scroll,
    resetFresh = false, // 是否回到第一页
    rowSelection = {},
    ...restOptions
  } = props;

  useImperativeHandle(ref, () => ({
    changeCondition: (data: any) => {
      setPageNum(1);
      setPageSize(defaultPageSize);
      setSearchConditions(data);
    },
  }));

  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [searchConditons, setSearchConditions] = useState(defaultCondtions);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    refreshTableList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, pageSize, searchConditons]);

  useEffect(() => {
    if (needRefresh) {
      refreshTableList();
    }
  }, [needRefresh]);

  useEffect(() => {
    if (resetFresh) {
      if (pageNum === 1) {
        refreshTableList();
      } else {
        setPageNum(1);
      }
    }
  }, [resetFresh]);

  const refreshTableList = () => {
    getTableList({
      pageNum,
      pageSize,
      ...searchConditons,
    });
    setSelectedRowKeys([]);
  };

  const changePageNumAndSize = ({ num = pageNum, size = pageSize }) => {
    setPageNum(num);
    setPageSize(size);
    // 清空选中项
    onSelectChange([]);
  };
  /** 处理过滤、排序问题 */
  const onChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any,
  ) => {
    const { current, pageSize: size } = pagination;
    const { field, order } = sorter;
    /** 非分页引起的change */
    if (pageSize === size && pageNum === current) {
      const newCondition = { ...searchConditons };
      if (field && order) {
        const orderObj = getSortFilterParams(field, order);
        setSearchConditions({ ...newCondition, ...orderObj });
      } else {
        delete newCondition[orderingKey];
        setSearchConditions(newCondition);
      }
    }
  };

  const nColumns: any = columns.map(item => ({
    dataIndex: item.key,
    ...item,
  }));
  if (nColumns.length && nColumns[0].dataIndex === 'serialNumber') {
    nColumns[0].render = (_: any, _item: any, index: number) => {
      return (pageNum - 1) * pageSize + index + 1;
    };
  }

  const handleSearchConditions = (data: any) => {
    setPageNum(1);
    setPageSize(defaultPageSize);
    setSearchConditions({ ...searchConditons, ...data });
  };

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child: any) => {
      return React.cloneElement(child, {
        refreshList: refreshTableList,
      });
    });

    return childrenComponent;
  };

  const onSelectChange = (selectRowKeys: Array<never>) => {
    setSelectedRowKeys(selectRowKeys);
    if (selectCallback) {
      selectCallback(selectRowKeys);
    }
  };

  const rowSelectionR: any = needSelect
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
        ...rowSelection,
      }
    : undefined;

  const handleExport = () => {
    if (selectedRowKeys.length === 0) {
      message.error('请先选择要导出的数据');
      return;
    } else {
      exportCallback && exportCallback(selectedRowKeys);
    }
  };
  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.error('请先选择要删除的数据');
      return;
    } else {
      deleteCallback && deleteCallback(selectedRowKeys);
    }
  };

  const handleCreate = () => {
    if (createCallback) {
      createCallback(searchConditons);
    }
  };
  const onSelect = (value: any, item: any) => {
    const keyValue = {
      key: value.length ? item.node.key : '',
      value,
    };
    if (searchTreeKey && ((treeNoCancel && keyValue.key) || !treeNoCancel)) {
      handleSearchConditions({ [searchTreeKey]: keyValue.key });
    }
    if (onTreeSelect) {
      onTreeSelect(keyValue);
    }
  };

  return (
    <div
      className={`ii-ui-business-pageTable-container ${
        showSearchTree ? 'has-search-tree' : ''
      }`}
    >
      {showSearchTree && (
        <div className="ii-ui-business-pageTable-search-tree">
          <SearchTree
            treeData={treeData}
            titleField={titleField}
            keyField={keyField}
            childrenField={childrenField}
            iconTag={iconTag}
            showIcon={!!iconTag}
            showSearch={showSearch}
            gap={gap}
            onSelect={onSelect}
            {...treeExtra}
          />
        </div>
      )}
      <div className="ii-ui-business-pageTable">
        {pageTitle && <IPageHeader title={pageTitle} buoySpace={28} />}
        <div className="page-table-filter">
          {showCreate && leftCreate ? (
            <Button
              icon={createIcon}
              style={{ marginRight: '16px' }}
              type="primary"
              className="page-table-plus"
              onClick={handleCreate}
            >
              {createTitle}
            </Button>
          ) : null}
          <div className="page-table-options">
            <FilterOptions
              searchConditons={searchConditons}
              defaultCondtions={defaultCondtions}
              filters={filters}
              setFilterOpts={handleSearchConditions}
            />
          </div>

          {needExport ? (
            <Button
              icon={downIcon}
              className="page-table-plus"
              onClick={handleExport}
              style={{ marginRight: '10px' }}
            >
              导出
            </Button>
          ) : null}

          {showCreate && !leftCreate ? (
            <Button
              icon={createIcon}
              type="primary"
              className="page-table-plus"
              onClick={handleCreate}
            >
              {createTitle}
            </Button>
          ) : null}
        </div>

        <ITable
          bordered
          rowKey={record => record[`${uniqueKey}`]}
          columns={nColumns}
          dataSource={tableList}
          rowSelection={rowSelectionR}
          scroll={scroll ? scroll : { x: 1132 }}
          onChange={onChange}
          pagination={{
            total,
            showSizeChanger: false,
            pageSize: pageSize,
            current: pageNum,
            onChange: (page, pageSize) =>
              changePageNumAndSize({ num: page, size: pageSize }),
          }}
          {...restOptions}
        />
        {needPatchDelete && total ? (
          <div className="delete-container">
            已选中{' '}
            <span style={{ color: '#2F9AFF' }}>{selectedRowKeys.length}</span>{' '}
            条
            <Button style={{ marginLeft: '16px' }} onClick={handleDelete}>
              {deleteTitle}
            </Button>
          </div>
        ) : null}
        {renderChildren()}
      </div>
    </div>
  );
};

export default forwardRef(PageTable);

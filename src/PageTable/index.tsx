import React, { useState, useEffect, FC } from 'react';
import { Button, message } from 'antd';
import { ITable } from 'ii-admin-ui';
import { SearchTree } from 'ii-admin-base';

import { TablePaginationConfig } from 'antd/lib/table';
// import { SorterResult } from 'antd/lib/table/interface';

import FilterOptions from '../FilterOptions';
import { IPageTableProps } from './interface';

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

const PageTable: FC<IPageTableProps> = props => {
  const {
    total,
    tableList,
    uniqueKey,
    getTableList,
    children,
    pageTitle,
    columns,
    filters = [],
    showCreate,
    leftCreate,
    showSearchTree,
    showSearch = true,
    createTitle,
    defaultCondtions = {},

    treeData = [],
    titleField = 'name',
    keyField = 'id',
    childrenField = 'children',
    iconTag,
    gap,
    onTreeSelect,
    createCallback,
    selectCallback,
    exportCallback,
    selectTreeCallback,
    getSortFilterParams = getSortFilterParamsDefault,
    needExport,
    createIcon,
    downIcon,
    needSelect,
    needRefresh,
    scroll,
    resetFresh = false, // 是否回到第一页
    ...restOptions
  } = props;

  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
  };

  const changePageNumAndSize = ({ num = pageNum, size = pageSize }) => {
    setPageNum(num);
    setPageSize(size);
  };
  /** 处理过滤、排序问题 */
  const onChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any,
  ) => {
    const { current, pageSize: size } = pagination;
    const { columnKey, order } = sorter;
    /** 非分页引起的change */
    if (pageSize === size && pageNum === current) {
      const newCondition = { ...searchConditons };
      if (columnKey && order) {
        const orderObj = getSortFilterParams(columnKey, order);
        setSearchConditions({ ...newCondition, ...orderObj });
      } else {
        delete newCondition.ordering;
      }
      setSearchConditions(newCondition);
    }
  };

  const nColumns = columns.map(item => ({
    dataIndex: item.key,
    ...item,
  }));

  const handleSearchConditions = (data: any) => {
    setPageNum(1);
    setPageSize(10);
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

  const rowSelection: any = needSelect
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    : undefined;

  const handleExport = () => {
    if (needSelect) {
      if (selectedRowKeys.length === 0) {
        message.error('请先选择要导出的数据');
        return;
      } else {
        exportCallback && exportCallback(selectedRowKeys);
      }
    } else {
      exportCallback && exportCallback(searchConditons);
    }
  };

  const handleCreate = () => {
    if (createCallback) {
      createCallback(searchConditons);
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
            showSearch={showSearch}
            gap={gap}
            onSelect={onTreeSelect}
          />
        </div>
      )}
      <div className="ii-ui-business-pageTable">
        {pageTitle && <h3 className="page-table-title">{pageTitle}</h3>}
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
          rowSelection={rowSelection}
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
        {renderChildren()}
      </div>
    </div>
  );
};

PageTable.defaultProps = {
  filters: [],
  showCreate: false,
  leftCreate: false,
  needRefresh: false,
  needExport: false,
  needSelect: false,
  uniqueKey: 'id',
};

export default PageTable;

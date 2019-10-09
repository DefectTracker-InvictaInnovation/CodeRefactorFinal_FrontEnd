import { Transfer, Tag, Modal, Table, TreeSelect } from 'antd';
import React from 'react';
import difference from 'lodash/difference';
import axios from 'axios';

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false} >
      {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
      }) => {
          const columns = direction === 'left' ? leftColumns : rightColumns;

          const rowSelection = {
              getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
              onSelectAll(selected, selectedRows) {
                  const treeSelectedKeys = selectedRows
                      .filter(item => !item.disabled)
                      .map(({ key }) => key);
                  const diffKeys = selected
                      ? difference(treeSelectedKeys, listSelectedKeys)
                      : difference(listSelectedKeys, treeSelectedKeys);
                  onItemSelectAll(diffKeys, selected);
              },
              onSelect({ key }, selected) {
                  onItemSelect(key, selected);
              },
              selectedRowKeys: listSelectedKeys,
          };

          return (
              <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={filteredItems}
                  size="small"
                  style={{ pointerEvents: listDisabled ? 'none' : null }}
                  onRow={({ key, disabled: itemDisabled }) => ({
                      onClick: () => {
                          if (itemDisabled || listDisabled) return;
                          onItemSelect(key, !listSelectedKeys.includes(key));
                      },
                  })}
              />
          );
      }}
  </Transfer>
);

const mockData = [];

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
export default class DeAllocateMember extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
    visible: false,
    role:[],
    roleAllcation:[],
  };

  componentDidMount(){
    this.fetchRoleallocation();
  }

  onChange = (nextTargetKeys, value) => {
    this.setState({ targetKeys: nextTargetKeys });
    console.log(value);
    this.setState({
      value
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  fetchRoleallocation() {
    var _this = this;
    axios.get('http://localhost:8081/defectservices/getAllRole')
        .then(function (response) {
            // handle success
            console.log(response.data);
            let role = response.data
            _this.setState({ role: role });
            console.log(_this.state.roleAllcation);
            const list = []

            console.log("Get Role Allocation" + role)
            response.data.map((post, index) => {
                list.push({
                    key: index,
                    projectroleId: post.projectroleId,
                    resourceId: post.resourceId,
                    employeeid: post.employeeid,
                    name: post.name,
                    firstname: post.firstname,
                    email:post.email,
                    roleName:post.roleName,

                });
                _this.setState({
                    list: list
                })
            })
        });
}


  render() {
    const { targetKeys } = this.state;
    const leftTableColumns = [
      {
        title: "EmpyoleeId",
        dataIndex: "employeeid",
        key: "employeeid",
      },

      {
        title: "FirstName",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "LastName",
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: "Role",
        dataIndex: "roleName",
        key: "roleName",
      },
    ];
    const rightTableColumns = [
      {
        title: "EmployeeId",
        dataIndex: "employeeid",
        key: "employeeid",
      },

      {
        title: "FirstName",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "LastName",
        dataIndex: "firstname",
        key: "firstname",
      },
      {
        title: "Designation",
        dataIndex: "designationname",
        key: "designationname",
      }
    ];
    return (
      <div>
         <TableTransfer
          dataSource={this.state.list}
          targetKeys={targetKeys}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
      </div>
    );
  }
}
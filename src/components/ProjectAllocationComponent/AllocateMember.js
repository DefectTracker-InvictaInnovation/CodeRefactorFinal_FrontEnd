import { Transfer, Button, Modal, Table, Select } from 'antd';
import React from 'react';
import difference from 'lodash/difference';
import axios from 'axios';
import App from './index';

const { Option, OptGroup } = Select;

function onSearch(val) {
  console.log('search:', val);
}

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
export default class AllocateMember extends React.Component {
  state = {
    targetKeys: originTargetKeys,
    disabled: false,
    showSearch: false,
    modal3Visible: false,
    visible: false,
    role: [],
    project: [],
    roleAllcation: [],
    value: '',
    value1: ''
  };

  componentDidMount() {
    this.fetchRoleallocation();
    this.fetchProjects();
  }

  handleChange = (value) => {
    this.setState({
      value1: value
    })
    var _this = this;
    console.log(value);
    console.log(this.state.list);

    const list1 = []
    this.state.list.map((post, index) => {

      if (post.projectId == value) {
        list1.push({
          key: index,
          employeeid: post.employeeid,
          name: post.name,
          firstname: post.firstname,
          roleName: post.roleName
        });

        console.log(list1)
        _this.setState({
          list1: list1
        })
      }
    });

  }

  fetchProjects() {
    var _this = this;
    axios.get('http://localhost:8081/defectservices/GetAllproject')
        .then(function (response) {
            // handle success
            console.log(response.data);
            _this.setState({ project: response.data });
            console.log(_this.state.project);

        });
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

  setModal3Visible(modal3Visible) {
    this.setState({ modal3Visible });
}


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

        console.log("Get Project Role Allocation" + role)
        response.data.map((post, index) => {
          list.push({
            key: index,
            employeeid: post.employeeid,
            name: post.name,
            firstname: post.firstname,
            roleName: post.roleName,
            projectId: post.projectId

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
        title: "Role",
        dataIndex: "roleName",
        key: "roleName",
      }
    ];
    return (
      <div>
        <Button type="primary" onClick={() => this.setModal3Visible(true)}>
          Module Allocation
        </Button>

        <Modal
          title="Project Allocation"
          width="80%"
          style={{
            top: 20
          }}
          visible={this.state.modal3Visible}
          onOk={() => this.setModal3Visible(false)}
          onCancel={() => this.setModal3Visible(false)}>
          <Select
            showSearch
            style={{ width: 200, marignBottom: '20px' }}
            placeholder="Select a Project"
            optionFilterProp="children"
            onChange={this.handleChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <OptGroup label="Projects">
              {this.state.project.map((item, index) => {
                return <Option key={index} value={item.projectId}> {item.projectName}</Option>
              })}
            </OptGroup>

          </Select>
          <br /><br />
         

          <TableTransfer
            dataSource={this.state.list1}
            targetKeys={this.state.targetKeys}
            showSearch={true}
            onChange={this.onChange}
            filterOption={(inputValue, item) =>
              item.employeeid.indexOf(inputValue) !== -1 ||
              item.name.indexOf(inputValue) !== -1 ||
              item.firstname.indexOf(inputValue) !== -1 ||
              item.roleName.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          // selectedKeys={this.saveRole(targetKeys)}
          />
        </Modal>
      </div>
    );
  }
}
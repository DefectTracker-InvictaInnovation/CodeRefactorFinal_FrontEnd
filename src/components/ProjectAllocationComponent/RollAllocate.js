// import React from 'react';
// import { Transfer, Switch, Table, Tag, Icon, Modal, Input, Row, Col, Select } from 'antd';
// import difference from 'lodash/difference';
// import axios from 'axios';

// const { Option } = Select;

// // Customize Table Transfer
// const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
//   <Transfer {...restProps} showSelectAll={false} >
//     {({
//       direction,
//       filteredItems,
//       onItemSelectAll,
//       onItemSelect,
//       selectedKeys: listSelectedKeys,
//       disabled: listDisabled,
//     }) => {
//       const columns = direction === 'left' ? leftColumns : rightColumns;

//       const rowSelection = {
//         getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
//         onSelectAll(selected, selectedRows) {
//           const treeSelectedKeys = selectedRows
//             .filter(item => !item.disabled)
//             .map(({ key }) => key);
//           const diffKeys = selected
//             ? difference(treeSelectedKeys, listSelectedKeys)
//             : difference(listSelectedKeys, treeSelectedKeys);
//           onItemSelectAll(diffKeys, selected);
//         },
//         onSelect({ key }, selected) {
//           onItemSelect(key, selected);
//         },
//         selectedRowKeys: listSelectedKeys,
//       };

//       return (
//         <Table
//           rowSelection={rowSelection}
//           columns={columns}
//           dataSource={filteredItems}
//           size="small"
//           style={{ pointerEvents: listDisabled ? 'none' : null }}
//           onRow={({ key, disabled: itemDisabled }) => ({
//             onClick: () => {
//               if (itemDisabled || listDisabled) return;
//               onItemSelect(key, !listSelectedKeys.includes(key));
//             },
//           })}
//         />
//       );
//     }}
//   </Transfer>
// );

// const resourceAllcation = [];
// const originTargetKeys = resourceAllcation.filter(item => +item.key % 3 > 1).map(item => item.key);


// export default class RollAllocate extends React.Component {
//   state = {
//     targetKeys: originTargetKeys,
//     disabled: false,
//     showSearch: false,
//     visible: false,
//   };

//   componentDidMount(){
//     this.fetchResourceallocation();
//     console.log(this.props.value)
//   }

//   onChange = nextTargetKeys => {
//     this.setState({ targetKeys: nextTargetKeys });
//   };
  
//   fetchResourceallocation() {
//     var _this = this;
//     axios.get('http://localhost:8081/defectservices/getallresource')
//       .then(function (response) {
//         // handle success
//         console.log(response.data);
//         let resource = response.data
//         _this.setState({ resource: resource });
//         console.log(_this.state.resourceAllcation);
//         const list = []
//         console.log("Get Project Allocation" + resource)
//         response.data.map((post, index) => {
//           list.push({
//             key: index,
//             employeeid: post.employeeid,
//             name: post.name,
//             firstname: post.firstname,
//             designationname: post.designationname,

//           });
//           _this.setState({
//             list: list
//           })
//         })
//       });
//   }

//     showModal = () => {
//       this.setState({
//         visible: true,
//       });
//     };

//     handleOk = e => {
//       console.log(e);
//       this.setState({
//         visible: false,
//       });
//     };

//     handleCancel = e => {
//       console.log(e);
//       this.setState({
//         visible: false,
//       });
//     };

//     handleChange = (value) => {
//       this.setState({
//         value1: value
//       })
//       console.log(`selected ${value}`);
//     }

//   render() {
//     const leftTableColumns = [
//       {
//         title: "EmpId",
//         dataIndex: "employeeid",
//         key: "employeeid",
//       },
    
//       {
//         title: "EmpName",
//         dataIndex: "name",
//         key: "name",
//       },
//       {
//         title: "EmpFirstName",
//         dataIndex: "firstname",
//         key: "firstname",
//       },
//       {
//         title: "Designation",
//         dataIndex: "designationname",
//         key: "designationname",
//       },
// ];
// const rightTableColumns = [
//   {
//     title: "EmpId",
//     dataIndex: "employeeid",
//     key: "employeeid",
//   },

//   {
//     title: "EmpName",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "EmpFirstName",
//     dataIndex: "firstname",
//     key: "firstname",
//   },
//   {
//     title: "Designation",
//     dataIndex: "designationname",
//     key: "designationname",
//   },{
//     dataIndex: 'role',
//     title: 'Role',
//     render: role => <Tag>{role}</Tag>,
//   },{
//     dataIndex: 'actions',
//     title: 'Actions',
//     render: actions => <a onClick={this.showModal}><Icon type="edit" style={{fontSize:'14px', color:'blue'}} /></a>,
//   },
// ];
//     return (
     
//       <div>
//         <br></br>
//     <br></br>
//         <TableTransfer
//           dataSource={this.state.list}
//           targetKeys={this.state.targetKeys}
//           showSearch={true}
//           onChange={this.onChange}
//           filterOption={(inputValue, item) =>
//             item.employeeid.indexOf(inputValue) !== -1 ||
//             item.name.indexOf(inputValue) !== -1 ||
//             item.firstname.indexOf(inputValue) !== -1 ||
//             item.designationname.indexOf(inputValue) !== -1
//           }
//           leftColumns={leftTableColumns}
//           rightColumns={rightTableColumns}
//         />
//          <Modal
//           title="Edit Role"
//           visible={this.state.visible}
//           onOk={this.handleOk}
//           onCancel={this.handleCancel}
//         >
//           <Row>
//             <Col span={12}>
//                 <p><b>Emp ID: </b></p>
//                 <p><b>Name: </b></p>
//                 <p><b>Designation: </b></p>
//                 <p><b>Select Role: </b></p>

//             </Col>
               
//             <Col span={12}>
//                <p>EMP001</p>
//                 <p>John Doe</p>
//                 <p>Software Engineer</p>
//                 <p>
//                   <Select defaultValue="Select Role" style={{ width: 200 }} onChange={this.handleChange}>
//                       <Option value="Tech Lead">Tech Lead</Option>
//                       <Option value="QA Lead">QA Lead</Option>
//                       <Option value="Software Engineer">Software Engineer</Option>
//                       <Option value="Senior Software Engineer">Senior Software Engineer</Option>
//                       <Option value="Junior Software Engineer">Senior Software Engineer</Option>
//                     </Select>
//                 </p>
//             </Col>
//           </Row>
          
//         </Modal>
//       </div>
//     );
//   }
// }